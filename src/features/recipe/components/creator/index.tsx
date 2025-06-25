"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import RecipeEdit from "@/features/recipe/components/detail/recipe-edit";
import RecipeResult from "@/features/recipe/components/result";
import useImgSrc from "@/features/recipe/hooks/use-img-src";
import { useRecipeCreation } from "@/features/recipe/hooks/use-recipe-creation";
import type { Recipe } from "@/features/recipe/models/recipe";

import { generateUUID } from "@/libs/utils";

import RecipeInputSection from "./recipe-input-section";
import RecipeLoadingState from "./recipe-loading-state";

interface RecipeCreatorProps {
  initialRecipe?: Recipe;
}

export default function RecipeCreator({ initialRecipe }: RecipeCreatorProps) {
  const [url, setUrl] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>(
    initialRecipe,
  );
  const { data: session } = useSession();
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

  // PartialObject<Recipe>를 완전한 Recipe로 변환하는 헬퍼 함수
  const createCompleteRecipe = useCallback(
    (partialRecipe: any, userEmail: string, recipeUrl?: string): Recipe => {
      const recipeId = generateUUID();
      return {
        _id: recipeId,
        id: recipeId,
        title: partialRecipe.title || "제목 없음",
        description: partialRecipe.description || null,
        url: recipeUrl || null,
        ingredients: partialRecipe.ingredients || [],
        steps: partialRecipe.steps || [],
        tips: partialRecipe.tips || [],
        tags: partialRecipe.tags || [],
        createdAt: new Date(),
        author: userEmail,
        thumbnailUrl: partialRecipe.thumbnailUrl,
      };
    },
    [],
  );

  // currentRecipe 상태 동기화 로직
  useEffect(() => {
    if (initialRecipe) {
      // 기존 레시피인 경우
      setCurrentRecipe(initialRecipe);
    } else if (recipe && !isGenerating && session?.user?.email) {
      // 새로 생성된 레시피인 경우 (스트리밍 완료 시)
      const completeRecipe = createCompleteRecipe(
        recipe,
        session.user.email,
        url,
      );
      setCurrentRecipe(completeRecipe);
    }
  }, [
    initialRecipe,
    recipe,
    isGenerating,
    session?.user?.email,
    url,
    createCompleteRecipe,
  ]);

  useEffect(() => {
    if (error) {
      toast({
        title: error.message || "레시피 생성 오류",
        description: error.description,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const initialUrl = initialRecipe?.url || "";

  const thumbnailUrl =
    initialRecipe?.thumbnailUrl ||
    (!!recipe && initialUrl ? getThumbnailUrl(initialUrl) : "");

  const { imgSrc, handleImageError } = useImgSrc({
    url: thumbnailUrl,
    fallbackImg: "/images/placeholder.png",
  });

  const handleSelectVideo = useCallback(
    (videoUrl: string) => {
      setUrl(videoUrl);
      createRecipe(videoUrl);
    },
    [createRecipe, setUrl],
  );

  const handleEditClick = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditMode(false);
  }, []);

  const handleEditSuccess = useCallback((updatedRecipe?: Recipe) => {
    if (updatedRecipe) {
      setCurrentRecipe(updatedRecipe);
    }
    setIsEditMode(false);
  }, []);

  // 현재 사용자가 레시피를 수정할 수 있는지 확인
  const canEdit = useCallback(() => {
    if (!session?.user?.email || isGenerating) return false;

    // 기존 레시피인 경우 (initialRecipe가 있는 경우)
    if (initialRecipe) {
      return currentRecipe?.author === session.user.email;
    }

    // 새로 생성된 레시피인 경우 (initialRecipe가 없고 recipe가 있는 경우)
    if (recipe && !initialRecipe) {
      return true; // 현재 사용자가 방금 생성한 레시피
    }

    return false;
  }, [
    session?.user?.email,
    currentRecipe,
    recipe,
    initialRecipe,
    isGenerating,
  ]);

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

        {/* 편집 모드일 때 RecipeEdit 컴포넌트 표시 */}
        {isEditMode && currentRecipe && (
          <RecipeEdit
            recipe={currentRecipe}
            onSaveSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        )}

        {/* 편집 모드가 아닐 때만 RecipeResult 표시 */}
        {!isEditMode && showResult && (
          <RecipeResult
            recipe={currentRecipe || recipe}
            url={url}
            initialUrl={initialUrl}
            isGenerating={isGenerating}
            stop={stop}
            getThumbnailUrl={getThumbnailUrl}
            imgSrc={imgSrc}
            handleImageError={handleImageError}
            onEditClick={canEdit() ? handleEditClick : undefined}
          />
        )}
      </div>
    </div>
  );
}
