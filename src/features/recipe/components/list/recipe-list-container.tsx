"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import RecipeList from "@/features/recipe/components/list/recipe-list";
import RecipeListSkeleton from "@/features/recipe/components/list/recipe-list-skeleton";
import useRecipes from "@/features/recipe/hooks/use-recipes";

export default function RecipeListContainer() {
  const { recipes, isLoading, deleteRecipe } = useRecipes();

  const isListReady = !isLoading && recipes;
  const recipeCount = recipes?.length || 0;

  return (
    <div className="flex w-full flex-1 flex-col gap-5 bg-background p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">나의 레시피 목록</h1>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1">
              <PlusCircledIcon className="h-4 w-4" />새 레시피 만들기
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {recipeCount > 0
              ? `총 ${recipeCount}개의 레시피가 있습니다.`
              : "저장된 레시피가 없습니다. 새 레시피를 만들어보세요!"}
          </p>
          {/* 나중에 검색창이 들어갈 자리 */}
        </div>
      </div>

      {isListReady ? (
        <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} />
      ) : (
        <RecipeListSkeleton />
      )}
    </div>
  );
}
