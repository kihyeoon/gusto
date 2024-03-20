"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";

import { Recipe } from "@/models/recipe";
import RecipeEdit from "@/components/recipe/RecipeEdit";

export default function Recipe({recipe}: {recipe: Recipe}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [recipeState, setRecipe] = useState<Recipe>(recipe);

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex items-center justify-between sticky top-0 bg-background z-10">
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
        {isEditMode ? (
          <RecipeEdit recipe={recipeState} setRecipe={setRecipe} /> 
        ) : (
          <RecipeView recipe={recipeState} />
        )}
    </div>
  );
}
