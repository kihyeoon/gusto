import { notFound } from "next/navigation";
import { cache } from "react";

import Recipe from "@/components/recipe/Recipe";

import { getRecipeById } from "@/service/recipe";

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
      <Recipe recipe={recipe} />
    </>
  );
}
