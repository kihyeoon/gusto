"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";

import { ListItemMotion } from "@/features/recipe/components/list/list-item-motion";
import { RecipeListItem } from "@/features/recipe/components/list/recipe-list-item";
import { RecipePreview } from "@/features/recipe/models/recipe";

interface Props {
  recipes: RecipePreview[];
  deleteRecipe: (id: string) => void;
  searchTerm?: string;
}

export default function RecipeList({
  recipes,
  deleteRecipe,
  searchTerm = "",
}: Props) {
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // window 객체 접근을 useEffect 내부로 이동
  useEffect(() => {
    setIsTouchDevice(!!window?.ontouchstart || navigator.maxTouchPoints > 0);
  }, []);

  const navigateToRecipe = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <ul className="flex flex-col gap-4 overflow-hidden pb-5">
      {recipes.map((recipe, index) => (
        <BlurFade key={recipe.id} direction="up" inView>
          <ListItemMotion>
            <RecipeListItem
              recipe={recipe}
              index={index}
              isTouchDevice={isTouchDevice}
              deleteRecipe={deleteRecipe}
              navigateToRecipe={navigateToRecipe}
              searchTerm={searchTerm}
            />
          </ListItemMotion>
        </BlurFade>
      ))}
    </ul>
  );
}
