"use client";

import { useCallback, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import RecipeResult from "@/features/recipe/components/result";
import useImgSrc from "@/features/recipe/hooks/use-img-src";
import { useRecipeCreation } from "@/features/recipe/hooks/use-recipe-creation";
import type { Recipe } from "@/features/recipe/models/recipe";

import RecipeInputSection from "./recipe-input-section";
import RecipeLoadingState from "./recipe-loading-state";

interface RecipeCreatorProps {
  initialRecipe?: Recipe;
}

export default function RecipeCreator({ initialRecipe }: RecipeCreatorProps) {
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

  const initialUrl = initialRecipe?.url || "";

  const { imgSrc, handleImageError } = useImgSrc({
    url: !!recipe && initialUrl ? getThumbnailUrl(initialUrl) : "",
    fallbackImg: "/images/placeholder.png",
  });

  const handleSelectVideo = useCallback(
    (videoUrl: string) => {
      setUrl(videoUrl);
      createRecipe(videoUrl);
    },
    [createRecipe, setUrl],
  );

  return (
    <div className="mx-auto h-full w-full max-w-4xl bg-background p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col space-y-8">
        <RecipeLoadingState
          isGenerating={isGenerating}
          isScriptLoading={isScriptLoading}
          showResult={showResult}
        />

        {showInputSection && (
          <RecipeInputSection
            url={url}
            setUrl={setUrl}
            createRecipe={createRecipe}
            isGenerating={isGenerating}
            handleSelectVideo={handleSelectVideo}
          />
        )}

        {showResult && (
          <RecipeResult
            recipe={recipe}
            url={url}
            initialUrl={initialUrl}
            isGenerating={isGenerating}
            stop={stop}
            getThumbnailUrl={getThumbnailUrl}
            imgSrc={imgSrc}
            handleImageError={handleImageError}
          />
        )}
      </div>
    </div>
  );
}
