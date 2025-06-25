import { errorMessages } from "@/features/recipe/libs/constants";
import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipePreview } from "@/features/recipe/models/recipe";
import { YouTubeVideo } from "@/features/recipe/models/youtube";

import { del, get, post, put } from "@/libs/api";
import { ApiException } from "@/libs/exceptions";

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

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> => {
  return await put<Recipe>("/api/recipes", recipe);
};

export const deleteRecipe = async (id: string) => {
  await del(`/api/recipes/${id}`);
  return id;
};

export const getSuggestions = async (query: string, count: number) => {
  return await get<YouTubeVideo[]>(
    `/api/recipes/suggestions?query=${encodeURIComponent(query)}&count=${count}`,
  );
};

/**
 * 영상에서 스크립트 가져오기
 */
export const getScript = async (videoId: string): Promise<string[]> => {
  const response = await get<string[]>(
    `/api/recipes/script?videoId=${videoId}`,
  );

  if (!response || response.length === 0) {
    throw new ApiException(errorMessages.CANNOT_FIND_RECIPE, 404);
  }

  return response;
};
