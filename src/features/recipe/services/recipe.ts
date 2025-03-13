import type { Sort } from "@/types/common";
import { groq } from "next-sanity";

import { client, urlFor } from "@/services/sanity";

import { Recipe, RecipeFromAI, RecipePreview } from "@/features/recipe/models/recipe";

const recipeProjection = groq`
  ...,
  "id": _id,
  "createdAt": _createdAt,
  "title": title,
  "description": description,
  ingredients[] {
    "name": name->title,
    amount
  },
  steps[] {
    "description": stepDescription,
  },
  "tags": tags[]->title,
  "tips": tips[],
  "author": author->email,
`;

const recipePreviewProjection = groq`
  "id": _id,
  "title": title,
  "description": description,
  "tags": tags[]->title,
  "url": url,
`;

export async function getAllRecipes() {
  return client.fetch<Recipe[]>(
    groq`
      *[_type == "recipe"] 
      | order(_createdAt desc) {${recipePreviewProjection}}
      `,
    {},
    { cache: "no-store" },
  );
}

export async function getRecipesOf(email: string, sort: Sort = "desc") {
  return client.fetch<RecipePreview[]>(
    groq`
      *[_type == "recipe" && author->email == "${email}"] 
      | order(_createdAt ${sort}) {${recipePreviewProjection}}
    `,
    { email },
    { cache: "no-store" },
  );
}

export async function getRecipeById(id: string) {
  return client.fetch<Recipe>(
    groq`
      *[_type == "recipe" && _id == "${id}"][0] {${recipeProjection}}
    `,
    { id },
    { cache: "no-store" },
  );
}

export async function createRecipe(
  recipe: RecipeFromAI,
  url: string,
  userId: string,
) {
  const { ingredients, steps } = recipe;

  // 1. 재료 데이터 생성 (중복 체크)
  const createdIngredients = await Promise.all(
    ingredients.map(async (ingredient) => {
      const existing = await client.fetch(
        `*[_type == "ingredient" && title == "${ingredient.name}"]`,
      );
      if (existing.length > 0) {
        return existing[0]._id;
      }

      const newIngredient = await client.create({
        _type: "ingredient",
        title: ingredient.name,
      });
      return newIngredient._id;
    }),
  );

  // 2. 레시피 데이터 생성
  const newRecipe = {
    ...recipe,
    _type: "recipe",
    ingredients: createdIngredients.map((id, index) => ({
      name: {
        _type: "reference",
        _ref: id,
      },
      amount: ingredients[index].amount,
    })),
    steps: steps.map((step) => ({
      stepDescription: step.description,
    })),
    tags: [],
    url,
    author: {
      _type: "reference",
      _ref: userId,
    },
  };

  // 3. Sanity에 레시피 정보 저장
  return await client.create(newRecipe, { autoGenerateArrayKeys: true });
}

async function findOrCreateDocument(
  name: string,
  type: string,
): Promise<string> {
  const query = groq`*[_type == "${type}" && title == "${name}"][0]`;
  const params = { name, type };
  const existingDoc = await client.fetch(query, params);

  if (existingDoc) {
    return existingDoc._id;
  } else {
    const newDoc = {
      _type: type,
      title: name,
    };
    const createdDoc = await client.create(newDoc);
    return createdDoc._id;
  }
}

export async function updateRecipe(recipeData: Recipe) {
  const { id, title, description, url, ingredients, steps, tips, tags } =
    recipeData;

  // 재료와 태그를 처리
  const newIngredients = await Promise.all(
    ingredients.map(async (ingredient) => {
      const ingredientId = await findOrCreateDocument(
        ingredient.name,
        "ingredient",
      );
      return {
        name: { _type: "reference", _ref: ingredientId },
        amount: ingredient.amount,
      };
    }),
  );

  const newTags = await Promise.all(
    tags.map(async (tagName) => {
      const tagId = await findOrCreateDocument(tagName, "tag");
      return {
        _type: "reference",
        _ref: tagId,
      };
    }),
  );

  try {
    const updatedRecipe = await client
      .patch(id)
      .set({
        title,
        description,
        url,
        ingredients: newIngredients,
        steps: steps.map((step) => ({
          stepDescription: step.description,
        })),
        tips,
        tags: newTags,
      })
      .commit({ autoGenerateArrayKeys: true });

    return updatedRecipe;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
}

export async function deleteRecipe(id: string) {
  await client
    .delete(id)
    .then(() => {
      console.log(`Recipe ${id} deleted successfully`);
    })
    .catch((error) => {
      console.error("Error deleting recipe:", error);
      throw error;
    });
}
