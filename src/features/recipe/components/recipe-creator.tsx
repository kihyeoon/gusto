"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useToast } from "@/components/ui/use-toast";

import RecipeSkeleton from "@/features/recipe/components/detail/RecipeSkeleton";
import RecipeSuggestions from "@/features/recipe/components/recipe-suggestions";
import { useRecipeCreation } from "@/features/recipe/hooks/use-recipe-creation";
import useImgSrc from "@/features/recipe/hooks/useImgSrc";
import { Recipe } from "@/features/recipe/models/recipe";

interface RecipeCreaterProps {
  initialRecipe?: Recipe;
}

const RecipeCreator = ({ initialRecipe }: RecipeCreaterProps) => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const {
    recipe,
    createRecipe,
    isGenerating,
    isScriptLoading,
    error,
    stop,
    showInputSection,
    showResult,
    getThumbnailUrl,
  } = useRecipeCreation({ initialRecipe });

  useEffect(() => {
    if (error) {
      toast({
        title: "레시피 생성 오류",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const initialUrl = initialRecipe?.url;

  const { imgSrc, handleImageError } = useImgSrc({
    url: !!recipe && initialUrl ? getThumbnailUrl(initialUrl) : "",
    fallbackImg: "/images/placeholder.png",
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isGenerating && url) {
      createRecipe(url);
    }
  };

  const handleSelectVideo = (videoUrl: string) => {
    setUrl(videoUrl);
    createRecipe(videoUrl);
  };

  return (
    <div className="mx-auto h-full w-full max-w-4xl bg-background p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col space-y-8">
        {isGenerating && (
          <TextShimmer className="text-xs" spread={5}>
            {isScriptLoading ? "스크립트 가져오는 중..." : "레시피 생성 중..."}
          </TextShimmer>
        )}
        {isGenerating && !showResult && <RecipeSkeleton />}

        {showResult && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {recipe?.title || "레시피"}
              </h2>
              {isGenerating && (
                <Button variant="destructive" size="sm" onClick={() => stop()}>
                  중지하기
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {recipe?.description && (
                <BlurFade>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-4 block"
                    >
                      <Image
                        priority
                        src={getThumbnailUrl(url)}
                        alt={recipe.title || "레시피 썸네일"}
                        width={500}
                        height={300}
                        className="w-full rounded-lg"
                      />
                    </a>
                  ) : (
                    initialUrl && (
                      <a
                        href={initialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-4 block"
                      >
                        <Image
                          priority
                          src={imgSrc}
                          alt={recipe.title || "레시피 썸네일"}
                          width={500}
                          height={300}
                          className="w-full rounded-lg"
                          onError={handleImageError}
                        />
                      </a>
                    )
                  )}
                  <p className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {recipe.description}
                  </p>
                </BlurFade>
              )}

              <div className="space-y-4">
                <BlurFade>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    재료
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {recipe?.ingredients?.map(
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
                    {recipe?.steps?.map((step: any, index: number) => (
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

              {recipe?.tips && recipe.tips.length > 0 && (
                <div className="space-y-4">
                  <BlurFade>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      요리 팁
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {recipe.tips.map((tip: any, index: number) => (
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
              어떤 레시피를 알고 싶으세요?
            </h2>
            <div className="relative rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center py-2">
                <Input
                  className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="YouTube URL을 입력하세요"
                  disabled={isGenerating}
                />
                <Button
                  onClick={() => createRecipe(url)}
                  disabled={!url || isGenerating}
                  className="mr-1 rounded-full p-2"
                  variant="ghost"
                >
                  <svg
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            <RecipeSuggestions
              onSelectVideo={handleSelectVideo}
              isLoading={isGenerating}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCreator;
