"use server";

import { auth } from "@/features/auth/services/auth";
import {
  buildYouTubeApiUrl,
  transformApiResponse,
} from "@/features/recipe/libs/utils";
import { RecipePreview } from "@/features/recipe/models/recipe";
import { YouTubeVideo } from "@/features/recipe/models/youtube";
import { getRecipesOf } from "@/features/recipe/services/recipe";

import { getRandomItems, selectRandomOption } from "@/libs/utils";

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

export const getYouTubeVideos = async (
  query: string,
  apiKey: string,
  count: number,
): Promise<YouTubeVideo[]> => {
  const orderOptions = ["relevance", "rating", "viewCount"];
  const order = selectRandomOption(orderOptions);

  const maxResults = Math.min(Math.max(count * 2, 10), 50);
  const url = buildYouTubeApiUrl(query, apiKey, order, maxResults);

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("YouTube API 요청 실패");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return [];
  }

  const allVideos = transformApiResponse(data);
  return getRandomItems(allVideos, count);
};
