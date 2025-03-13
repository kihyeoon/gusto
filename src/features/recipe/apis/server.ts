"use server";

import { auth } from "@/features/auth/services/auth";
import { getRecipesOf } from "@/features/recipe/services/recipe";
import { RecipePreview } from "@/features/recipe/models/recipe";

export const getRecipesServer = async (): Promise<RecipePreview[]> => {
  const session = await auth();
  const user = session?.user;
  
  if (!user || !user.email) {
    return [];
  }
  
  try {
    const recipes = await getRecipesOf(user.email);
    return recipes;
  } catch (error) {
    throw new Error("레시피를 가져오는데 실패했습니다.");
  }
};
