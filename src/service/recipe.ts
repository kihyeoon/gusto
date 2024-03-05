import { Recipe } from "@/models/recipe";
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
