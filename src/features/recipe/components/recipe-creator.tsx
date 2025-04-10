"use client";

import { useCallback, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import RecipeInputSection from "@/features/recipe/components/recipe-input-section";
import RecipeLoadingState from "@/features/recipe/components/recipe-loading-state";
import RecipeResult from "@/features/recipe/components/recipe-result";
import { useRecipeCreation } from "@/features/recipe/hooks/use-recipe-creation";
import useImgSrc from "@/features/recipe/hooks/useImgSrc";
import type { Recipe } from "@/features/recipe/models/recipe";

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
};

export default RecipeCreator;
