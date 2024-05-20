import { notFound } from "next/navigation";

import RecipeDetailContainer from "@/features/recipe/components/detail/RecipeDetailContainer";
import { getRecipeById } from "@/features/recipe/services/recipe";

interface Props {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params: { id } }: Props) {
  const recipe = await getRecipeById(id);

  if (!recipe) notFound();

  return (
    <>
      <RecipeDetailContainer recipe={recipe} />
    </>
  );
}
