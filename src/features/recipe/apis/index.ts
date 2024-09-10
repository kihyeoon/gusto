import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipePreview, Script } from "@/features/recipe/models/recipe";

import { del, get, post } from "@/libs/api";

export const getRecipes = async () => {
  return await get<RecipePreview[]>("/api/recipes");
};

export const createRecipe = async (
  url: string,
  userId: string | undefined,
): Promise<Recipe> => {
  // TODO: 쿼리스트링을 사용하는 대신 path parameter를 사용하도록 수정
  const script: any = await get(
    `https://app.digicord.site/api/v1/youtube/transcript/${getVideoId(url)}`,
  );

  const recipe = await post<Recipe>("/api/recipes/ai", {
    script: script.data.content,
    url,
    userId,
  });

  return recipe;
};

export const deleteRecipe = async (id: string) => {
  await del(`/api/recipes/${id}`);
  return id;
};
