"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import RecipeSkeleton from "@/features/recipe/components/detail/RecipeSkeleton";
import { useObjectStream } from "@/features/recipe/hooks/use-object-stream";
import { recipeSchema } from "@/features/recipe/libs/ai/schemas";
import { RECIPE_QUERY_KEY } from "@/features/recipe/libs/constants";
import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe, RecipeInput } from "@/features/recipe/models/recipe";

import { get } from "@/libs/api";
import { generateUUID } from "@/libs/utils";

interface RecipeCreaterProps {
  initialRecipe?: Recipe;
}

const RecipeCreater = ({ initialRecipe }: RecipeCreaterProps) => {
  const [url, setUrl] = useState("");
  const [isScriptLoading, setIsScriptLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { object, submit, isLoading, stop } = useObjectStream({
    api: "/api/recipes",
    schema: recipeSchema,
    onFinish: (_) => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
    initialValue: initialRecipe,
  });

  /**
   * URL에서 스크립트 가져오고 레시피 생성 요청
   */
  const handleCreateRecipe = async () => {
    if (!url) return;

    try {
      setError(null);
      setIsScriptLoading(true);

      const videoId = getVideoId(url);
      if (!videoId) {
        setError("올바른 YouTube URL을 입력해주세요.");
        setIsScriptLoading(false);
        return;
      }

      const script = await get<string[]>(
        `/api/recipes/script?videoId=${videoId}`,
      );

      if (!script || script.length === 0) {
        setError("스크립트를 가져올 수 없습니다. 다른 영상을 시도해주세요.");
        setIsScriptLoading(false);
        return;
      }

      const newRecipeId = generateUUID();

      window.history.replaceState({}, "", `/recipe/${newRecipeId}`);

      const requestData: RecipeInput = {
        script: script.join("\n"),
        url: url,
        id: newRecipeId,
      };

      submit(requestData);
    } catch (error) {
      console.error("레시피 생성 중 오류 발생:", error);
      setError("레시피를 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsScriptLoading(false);
    }
  };

  const isGenerating = isScriptLoading || isLoading;
  const showInputSection = !isGenerating && !object;
  const showResult = object !== undefined;

  return (
    <div className="mx-auto h-full w-full max-w-4xl rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col space-y-8">
        {isGenerating && !showResult && <RecipeSkeleton />}

        {showResult && (
          <div className="space-y-6">
            {isLoading && (
              <div className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={() => stop()}>
                  중지하기
                </Button>
              </div>
            )}

            <div className="flex">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {object.title || "레시피"}
              </h2>
            </div>

            <div className="space-y-6">
              {object.description && (
                <BlurFade>
                  <p className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {object.description}
                  </p>
                </BlurFade>
              )}

              <div className="space-y-4">
                <BlurFade>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    재료
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {object.ingredients?.map(
                      (ingredient: any, index: number) => (
                        <BlurFade
                          key={index}
                          delay={index * 0.05}
                          direction="up"
                        >
                          <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {ingredient?.name}
                            </span>
                            {ingredient?.amount && (
                              <span className="text-gray-500 dark:text-gray-400">
                                {ingredient.amount}
                              </span>
                            )}
                          </div>
                        </BlurFade>
                      ),
                    )}
                  </div>
                </BlurFade>
              </div>

              <div className="space-y-4">
                <BlurFade>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    조리 방법
                  </h3>
                  <ol className="mt-2 space-y-3">
                    {object.steps?.map((step: any, index: number) => (
                      <BlurFade key={index} delay={index * 0.1} direction="up">
                        <li className="flex gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 dark:text-gray-300">
                            {step?.description}
                          </p>
                        </li>
                      </BlurFade>
                    ))}
                  </ol>
                </BlurFade>
              </div>

              {object.tips && object.tips.length > 0 && (
                <div className="space-y-4">
                  <BlurFade>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      요리 팁
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {object.tips.map((tip: any, index: number) => (
                        <BlurFade
                          key={index}
                          delay={index * 0.05}
                          direction="up"
                        >
                          <li className="flex gap-2 rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                            <svg
                              className="h-5 w-5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{tip}</span>
                          </li>
                        </BlurFade>
                      ))}
                    </ul>
                  </BlurFade>
                </div>
              )}
            </div>
          </div>
        )}

        {showInputSection && (
          <div className="mt-auto">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
              AI 레시피 생성기
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              YouTube 동영상의 URL을 입력하면 AI가 레시피를 생성해 드립니다.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                className="flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="YouTube URL을 입력하세요"
                disabled={isGenerating}
              />
              <Button
                onClick={handleCreateRecipe}
                disabled={!url || isGenerating}
                className="whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    {isScriptLoading
                      ? "스크립트 가져오는 중..."
                      : "레시피 생성 중..."}
                  </>
                ) : (
                  "레시피 생성하기"
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}

            {isGenerating && (
              <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                레시피를 생성하는 중입니다. 잠시만 기다려주세요...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCreater;
