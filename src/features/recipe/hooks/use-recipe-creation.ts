import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { getScript } from "@/features/recipe/apis/client";
import { useObjectStream } from "@/features/recipe/hooks/use-object-stream";
import { recipeSchema } from "@/features/recipe/libs/ai/schemas";
import {
  RECIPE_QUERY_KEY,
  errorMessages,
} from "@/features/recipe/libs/constants";
import {
  getThumbnailUrl,
  getThumbnailUrlByVideoId,
  getVideoId,
} from "@/features/recipe/libs/utils";
import { Recipe, RecipeInput } from "@/features/recipe/models/recipe";

import { fetchWithApiException } from "@/libs/api";
import {
  ApiErrorSchema,
  ApiException,
  CustomException,
} from "@/libs/exceptions";
import { generateUUID } from "@/libs/utils";

interface UseRecipeCreationOptions {
  initialRecipe?: Recipe;
}

export function useRecipeCreation({
  initialRecipe,
}: UseRecipeCreationOptions = {}) {
  const [isScriptLoading, setIsScriptLoading] = useState(false);
  const [error, setError] = useState<ApiErrorSchema | null>(null);
  const queryClient = useQueryClient();

  const {
    object: recipe,
    submit,
    isLoading,
    stop,
  } = useObjectStream({
    api: "/api/recipes",
    schema: recipeSchema,
    fetch: fetchWithApiException,
    onFinish: (_) => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
    initialValue: initialRecipe,
    onError: (err) => {
      setErrorByType(err);
    },
  });

  /**
   * 에러 타입에 따른 구조화된 에러 메시지 설정
   */
  const setErrorByType = (err: unknown) => {
    console.error("Handling error:", err);
    if (err instanceof ApiException) {
      setError({
        message: err.message,
        description: err.description,
      });
    } else if (err instanceof CustomException) {
      setError({ message: err.message });
    } else {
      setError({
        message: errorMessages.CANNOT_CREATE_RECIPE.message,
        description: errorMessages.CANNOT_CREATE_RECIPE.description,
      });
    }
  };

  const createRecipe = async (recipeUrl: string) => {
    if (!recipeUrl) return;

    setError(null);
    setIsScriptLoading(true);

    try {
      // 1. URL 검증
      const videoId = getVideoId(recipeUrl);
      if (!videoId) {
        setError({
          message: errorMessages.INVALID_URL.message,
          description: errorMessages.INVALID_URL.description,
        });
        return;
      }

      // 2. 스크립트 가져오기
      const script = await getScript(videoId);

      // 3. 레시피 ID 생성 및 URL 업데이트
      const newRecipeId = generateUUID();
      window.history.replaceState({}, "", `/recipe/${newRecipeId}`);

      // 4. 레시피 생성 요청 데이터 준비
      const requestData: RecipeInput = {
        script: script.join("\n"),
        url: recipeUrl,
        id: newRecipeId,
        thumbnailUrl: getThumbnailUrlByVideoId(videoId),
      };

      // 5. AI 레시피 생성 요청
      submit(requestData);
    } catch (err) {
      setErrorByType(err);
    } finally {
      setIsScriptLoading(false);
    }
  };

  const isGenerating = isScriptLoading || isLoading;
  const showInputSection = !isGenerating && !recipe;
  const showResult = recipe !== undefined;

  return {
    recipe,
    createRecipe,
    isGenerating,
    isScriptLoading,
    isLoading,
    error,
    stop,
    showInputSection,
    showResult,
    getThumbnailUrl,
  };
}
