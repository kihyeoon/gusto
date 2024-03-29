"use client";

import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";

import { Recipe } from "@/models/recipe";
import RecipeEdit from "@/components/recipe/RecipeEdit";

export default function Recipe({recipe}: {recipe: Recipe}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [recipeState, setRecipe] = useState<Recipe>(recipe);
  const updateRecipe = async() => {
    const res = await fetch("/api/recipes", {
      method: "PUT",
      body: JSON.stringify(recipeState),
    }).then((res) => res.json());
    console.log(res);
    setIsEditMode(false);
  }

  return (
    <div className="flex w-full flex-col">
      <header className="flex items-center justify-between sticky top-0 px-4 py-2 z-10 bg-background">
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
            <Button
              className="w-20"
              onClick={() => {
                setIsEditMode(true);
              }}
              >
              수정
            </Button>
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
