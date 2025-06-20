"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";

import RecipeList from "@/features/recipe/components/list/recipe-list";
import RecipeListSkeleton from "@/features/recipe/components/list/recipe-list-skeleton";
import SearchBar from "@/features/recipe/components/list/search-bar";
import useRecipes from "@/features/recipe/hooks/use-recipes";
import { RecipePreview } from "@/features/recipe/models/recipe";

export default function RecipeListContainer() {
  const { recipes, isLoading, deleteRecipe } = useRecipes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!recipes || !searchTerm.trim()) return recipes;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return recipes.filter((recipe: RecipePreview) => 
      recipe.title.toLowerCase().includes(lowerSearchTerm) ||
      recipe.description?.toLowerCase().includes(lowerSearchTerm) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }, [recipes, searchTerm]);

  const isListReady = !isLoading && recipes;
  const totalRecipeCount = recipes?.length || 0;
  const filteredRecipeCount = filteredRecipes?.length || 0;
  const isSearching = searchTerm.trim().length > 0;

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
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isSearching
                ? `검색 결과: ${filteredRecipeCount}개 (전체 ${totalRecipeCount}개 중)`
                : totalRecipeCount > 0
                ? `총 ${totalRecipeCount}개의 레시피가 있습니다.`
                : "저장된 레시피가 없습니다. 새 레시피를 만들어보세요!"}
            </p>
          </div>
          {totalRecipeCount > 0 && (
            <SearchBar
              onSearch={setSearchTerm}
              className="w-full max-w-md"
            />
          )}
        </div>
      </div>

      {isListReady ? (
        filteredRecipes && filteredRecipes.length > 0 ? (
          <RecipeList recipes={filteredRecipes} deleteRecipe={deleteRecipe} searchTerm={searchTerm} />
        ) : isSearching ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-gray-600">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-400 mt-1">다른 키워드로 다시 시도해보세요</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-gray-600">저장된 레시피가 없습니다</p>
            <p className="text-sm text-gray-400 mt-1">새 레시피를 만들어보세요!</p>
          </div>
        )
      ) : (
        <RecipeListSkeleton />
      )}
    </div>
  );
}
