import { notFound } from "next/navigation";
import { cache } from "react";

import Recipe from "@/components/recipe/Recipe";

import { getRecipeById } from "@/service/recipe";

interface Props {
  params: {
    id: string;
  };
}

const getUser = cache(async (id: string) => getRecipeById(id));

export default async function RecipePage({ params: { id } }: Props) {
  const recipe = await getUser(id);

  if (!recipe) notFound();

  return (
    <>
      <Recipe recipe={recipe} />
    </>
  );
}
