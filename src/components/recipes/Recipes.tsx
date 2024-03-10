"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const isRecipeReady = !loading && recipe;
  const isListReady = !listLoading && recipes;
  const showList = !(recipe || loading);

  return (
    <div className="flex w-full flex-col gap-7">
      {session ? (
        <Button onClick={() => signOut()}>로그아웃</Button>
      ) : (
        <Button onClick={() => signIn()}>로그인</Button>
      )}
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
