import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipePreview } from "@/features/recipe/models/recipe";
import { YouTubeVideo } from "@/features/recipe/models/youtube";

import { del, get, post } from "@/libs/api";

export const getRecipes = async () => {
  return await get<RecipePreview[]>("/api/recipes");
};

export const createRecipe = async (
  url: string,
  userId: string | undefined,
): Promise<Recipe> => {
  // TODO: 쿼리스트링을 사용하는 대신 path parameter를 사용하도록 수정
  const script = await get<string[]>(
    `/api/recipes/script?videoId=${getVideoId(url)}`,
  );

  const recipe = await post<Recipe>("/api/recipes/ai", {
    script: script.join("\n"),
    url,
    userId,
  });

  return recipe;
};

export const deleteRecipe = async (id: string) => {
  await del(`/api/recipes/${id}`);
  return id;
};

export const getSuggestions = async (query: string = "레시피") => {
  return await get<YouTubeVideo[]>(
    `/api/recipes/suggestions?query=${encodeURIComponent(query)}`,
  );
};
