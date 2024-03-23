"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import RecipeSkeleton from "@/components/recipe/RecipeSkeleton";
import RecipeView from "@/components/recipe/RecipeView";
import RecipeList from "@/components/recipes/RecipeList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useRecipes from "@/hooks/useRecipes";

export default function Recipes() {
  const [url, setUrl] = useState("");
  const { recipes, listLoading, recipe, loading, createRecipe } = useRecipes();

  const isRecipeReady = !loading && recipe;
  const isListReady = !listLoading && recipes;
  const showList = !(recipe || loading);

  return (
    <div className="flex w-full flex-1 flex-col gap-5 bg-background px-4 py-2">
      <div className="flex w-full items-center justify-center gap-3">
        <Input
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube URL을 입력하세요"
        />
        <Button onClick={() => createRecipe(url)} disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              생성 중입니다
            </>
          ) : (
            "AI로 레시피 만들기"
          )}
        </Button>
      </div>
      {showList ? (
        isListReady ? (
          <RecipeList recipes={recipes} />
        ) : (
          <RecipeSkeleton />
        )
      ) : (
        <>
          {loading && <RecipeSkeleton />}
          {isRecipeReady && <RecipeView recipe={recipe} />}
        </>
      )}
    </div>
  );
}
