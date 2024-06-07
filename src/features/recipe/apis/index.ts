import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipePreview } from "@/features/recipe/models/recipe";

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
  const script = await fetch(`/api/recipes/script?videoId=${getVideoId(url)}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
    });

  const recipe = await fetch(`/api/recipes/ai`, {
    method: "POST",
    body: JSON.stringify({
      script: script.map((s: any) => s.text).join("\n"),
      url,
      userId,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
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
