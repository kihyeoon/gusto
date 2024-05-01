import { ListItemMotion } from "@/components/recipes/ListItemMotion";
import { RecipeListItem } from "@/components/recipes/RecipeListItem";

import { RecipePreview } from "@/models/recipe";

interface Props {
  recipes: RecipePreview[];
  deleteRecipe: (id: string) => void;
}

export default function RecipeList({ recipes, deleteRecipe }: Props) {
  return (
    <ul className="flex flex-col gap-4 overflow-hidden pb-5">
      {recipes.map((recipe, index) => (
        <ListItemMotion key={recipe.id}>
          <RecipeListItem
            recipe={recipe}
            index={index}
            deleteRecipe={deleteRecipe}
          />
        </ListItemMotion>
      ))}
    </ul>
  );
}
