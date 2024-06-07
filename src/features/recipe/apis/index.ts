import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipePreview, Script } from "@/features/recipe/models/recipe";

import { get, post } from "@/libs/api";

export const getRecipes = async (): Promise<RecipePreview[]> => {
  const response = await fetch("/api/recipes");
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
};

export const createRecipe = async (
  url: string,
  userId: string | undefined,
): Promise<Recipe> => {
  // TODO: 쿼리스트링을 사용하는 대신 path parameter를 사용하도록 수정
  const script = await get<Script[]>(
    `/api/recipes/script?videoId=${getVideoId(url)}`,
  );

  const recipe = await post<Recipe>("/api/recipes/ai", {
    script: script.map((s) => s.text).join("\n"),
    url,
    userId,
  });

  return recipe;
};

export const deleteRecipe = async (id: string) => {
  const response = await fetch(`/api/recipes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
  return id;
};
