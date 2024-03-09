import { Recipe, RecipeFromAI } from "@/models/recipe";
import { groq } from "next-sanity";

import { client, urlFor } from "@/service/sanity";

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
  "tips": tips[]
`;

const recipePreviewProjection = groq`
  "id": _id,
  "title": title,
  "description": description,
  "tags": tags[]->title,
`;

export async function getAllRecipes(): Promise<Recipe[]> {
  return client.fetch(
    groq`
      *[_type == "recipe"] 
      | order(_createdAt desc) {${recipePreviewProjection}}
      `,
  );
}

export async function getRecipeById(id: string): Promise<Recipe> {
  return client.fetch(
    groq`
      *[_type == "recipe" && _id == "${id}"][0] {${recipeProjection}}
    `,
    { id },
  );
}

export async function createRecipe(recipe: RecipeFromAI) {
  const ingredients = recipe.ingredients;

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
    steps: recipe.steps.map((step) => ({
      stepDescription: step.description,
    })),
    tags: [],
  };

  // 3. Sanity에 레시피 정보 저장
  return await client.create(newRecipe, { autoGenerateArrayKeys: true });
}
