import { useRouter } from "next/navigation";
import { useRef } from "react";

import { ListItemMotion } from "@/features/recipe/components/list/ListItemMotion";
import { RecipeListItem } from "@/features/recipe/components/list/RecipeListItem";
import { RecipePreview } from "@/features/recipe/models/recipe";

interface Props {
  recipes: RecipePreview[];
  deleteRecipe: (id: string) => void;
}

export default function RecipeList({ recipes, deleteRecipe }: Props) {
  const router = useRouter();
  const { current: isTouchDevice } = useRef(
    !!window?.ontouchstart || navigator.maxTouchPoints > 0,
  );

  const navigateToRecipe = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <ul className="flex flex-col gap-4 overflow-hidden pb-5">
      {recipes.map((recipe, index) => (
        <ListItemMotion key={recipe.id}>
          <RecipeListItem
            recipe={recipe}
            index={index}
            isTouchDevice={isTouchDevice}
            deleteRecipe={deleteRecipe}
            navigateToRecipe={navigateToRecipe}
          />
        </ListItemMotion>
      ))}
    </ul>
  );
}
