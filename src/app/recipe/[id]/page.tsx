import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { getRecipeById } from "@/features/recipe/services/recipe";

const RecipeCreator = dynamic(
  () => import("@/features/recipe/components/creator"),
  {
    loading: () => (
      <div className="mx-auto h-full w-full max-w-4xl bg-background p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </div>
    ),
  },
);

interface Props {
  params: Promise<{
    id: string;
  }>;
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

export default async function RecipePage(props: Props) {
  const params = await props.params;

  const { id } = params;

  const recipe = await getRecipeById(id);

  if (!recipe) notFound();

  return <RecipeCreator initialRecipe={recipe} />;
}
