"use client";

import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import RecipeEdit from "@/features/recipe/components/detail/recipe-edit";
import RecipeView from "@/features/recipe/components/detail/recipe-view";
import { type Recipe } from "@/features/recipe/models/recipe";

export default function RecipeDetailContainer({ recipe }: { recipe: Recipe }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [recipeState, setRecipe] = useState<Recipe>(recipe);

  const session = useSession();
  const isOwner = session?.data?.user?.email === recipeState.author;

  const updateRecipe = async () => {
    const res = await fetch("/api/recipes", {
      method: "PUT",
      body: JSON.stringify(recipeState),
    }).then((res) => res.json());
    console.log(res);
    setIsEditMode(false);
  };

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-2">
        {isEditMode ? (
          <>
            <Cross1Icon
              className="size-6 cursor-pointer"
              onClick={() => {
                setIsEditMode(false);
                setRecipe(recipe);
              }}
            />
            <Button
              className="w-20"
              onClick={() => {
                updateRecipe();
              }}
            >
              저장
            </Button>
          </>
        ) : (
          <>
            <Link href="/">
              <ArrowLeftIcon className="size-6 cursor-pointer" />
            </Link>
            {isOwner && (
              <Button
                className="w-20"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </Button>
            )}
          </>
        )}
      </header>
      {isEditMode ? (
        <RecipeEdit recipe={recipeState} setRecipe={setRecipe} />
      ) : (
        <RecipeView recipe={recipeState} />
      )}
    </div>
  );
}
