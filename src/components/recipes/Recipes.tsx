"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import RecipeSkeleton from "@/components/recipe/RecipeSkeleton";
import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useRecipe from "@/hooks/useRecipe";

export default function Recipes() {
  const [url, setUrl] = useState("");
  const { recipe, setRecipe, loading, createRecipe } = useRecipe();

  const isReady = !loading && recipe;

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex w-full items-center justify-center gap-3">
        <Input
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a YouTube video URL"
        />
        <Button onClick={() => createRecipe(url)} disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </>
          ) : (
            "Create Recipe"
          )}
        </Button>
      </div>
      {loading && <RecipeSkeleton />}
      {isReady && <RecipeView recipe={recipe} />}
    </div>
  );
}
