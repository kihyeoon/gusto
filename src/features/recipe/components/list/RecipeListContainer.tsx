"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import RecipeSkeleton from "@/features/recipe/components/detail/RecipeSkeleton";
import RecipeList from "@/features/recipe/components/list/RecipeList";
import RecipeListSkeleton from "@/features/recipe/components/list/RecipeListSkeleton";
import useRecipes from "@/features/recipe/hooks/useRecipes";

export default function RecipeListContainer() {
  const [url, setUrl] = useState("");
  const { recipes, isLoading, isCreatingRecipe, createRecipe, deleteRecipe } =
    useRecipes();

  const isListReady = !isLoading && recipes;

  return (
    <div className="flex w-full flex-1 flex-col gap-5 bg-background px-4 py-2">
      <div className="flex w-full items-center justify-center gap-3">
        <Input
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube URL을 입력하세요"
        />
        <Button
          onClick={() => createRecipe(url)}
          disabled={!url || isCreatingRecipe}
        >
          {isCreatingRecipe ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              생성 중입니다
            </>
          ) : (
            "AI로 레시피 만들기"
          )}
        </Button>
      </div>
      {isCreatingRecipe ? (
        <RecipeSkeleton />
      ) : isListReady ? (
        <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} />
      ) : (
        <RecipeListSkeleton />
      )}
    </div>
  );
}
