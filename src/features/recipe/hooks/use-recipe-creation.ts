import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { getScript } from "@/features/recipe/apis/client";
import { useObjectStream } from "@/features/recipe/hooks/use-object-stream";
import { recipeSchema } from "@/features/recipe/libs/ai/schemas";
import {
  RECIPE_QUERY_KEY,
  errorMessages,
} from "@/features/recipe/libs/constants";
import { getThumbnailUrl, getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipeInput } from "@/features/recipe/models/recipe";

import { ApiException, CustomException } from "@/libs/exceptions";
import { generateUUID } from "@/libs/utils";

interface UseRecipeCreationOptions {
  initialRecipe?: Recipe;
}

export function useRecipeCreation({
  initialRecipe,
}: UseRecipeCreationOptions = {}) {
  const [isScriptLoading, setIsScriptLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    object: recipe,
    submit,
    isLoading,
    stop,
  } = useObjectStream({
    api: "/api/recipes",
    schema: recipeSchema,
    onFinish: (_) => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
    initialValue: initialRecipe,
    onError: (err) => {
      console.error("AI 레시피 생성 중 오류 발생:", err);
      setError(errorMessages.CANNOT_CREAT_RECIPE.message);
    },
  });

  // 에러 타입에 따른 에러 메시지 설정
  const setErrorByType = (err: unknown) => {
    if (err instanceof ApiException) {
      setError(err.message);
    } else if (err instanceof CustomException) {
      setError(err.message);
    } else {
      setError(errorMessages.CANNOT_CREAT_RECIPE.message);
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
        setError(errorMessages.INVALID_URL.message);
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
      };

      // 5. AI 레시피 생성 요청
      submit(requestData);
    } catch (err) {
      console.error("레시피 생성 중 오류 발생:", err);
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
