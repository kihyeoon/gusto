"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";

import { Recipe } from "@/models/recipe";

export default function Recipe({recipe}: {recipe: Recipe}) {
  const [isEditMode, setIsEditMode] = useState(false);

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
        {isEditMode ? (
          // <RecipeEdit recipe={recipe} setRecipe={setRecipe} /> 
          null
        ) : (
          <RecipeView recipe={recipe} />
        )}
    </div>
  );
}
