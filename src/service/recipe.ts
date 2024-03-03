import { Recipe } from "@/models/recipe";

import { client, urlFor } from "@/service/sanity";

const recipeProjection = `
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

export async function getAllRecipes(): Promise<Recipe[]> {
  return client.fetch(
    `
      *[_type == "recipe"] 
      | order(_createdAt desc) {${recipeProjection}}
      `,
  );
}
