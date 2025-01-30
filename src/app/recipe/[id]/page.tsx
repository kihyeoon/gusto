import { type Metadata } from "next";
import { notFound } from "next/navigation";

import RecipeDetailContainer from "@/features/recipe/components/detail/RecipeDetailContainer";
import { getRecipeById } from "@/features/recipe/services/recipe";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "레시피",
};

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const recipe = await getRecipeById(id);
//   return { title: recipe.title };
// }

export default async function RecipePage({ params: { id } }: Props) {
  const recipe = await getRecipeById(id);

  if (!recipe) notFound();

  return (
    <>
      <RecipeDetailContainer recipe={recipe} />
    </>
  );
}
