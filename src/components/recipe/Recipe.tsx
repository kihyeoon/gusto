"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import RecipeEdit from "@/components/recipe/RecipeEdit";
import RecipeSkeleton from "@/components/recipe/RecipeSkeleton";
import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";

import useRecipe from "@/hooks/useRecipe";

export default function Recipe() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { recipe, setRecipe, loading, createRecipe } = useRecipe();
  // TODO: 서버에서 레시피를 가져오는 로직을 추가합니다.

  const isReady = !loading && recipe;

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex items-center justify-between">
        <Link href="/">
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
        </Link>
        {isEditMode ? (
          <Button
            className="w-20"
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            View
          </Button>
        ) : (
          <Button
            className="w-20"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            Edit
          </Button>
        )}
      </div>
      {loading && <RecipeSkeleton />}
      {isReady &&
        (isEditMode ? (
          <RecipeEdit recipe={recipe} setRecipe={setRecipe} />
        ) : (
          <RecipeView recipe={recipe} />
        ))}
    </div>
  );
}
