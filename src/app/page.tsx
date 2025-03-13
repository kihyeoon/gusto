import { dehydrate } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { auth } from "@/features/auth/services/auth";
import { getRecipesServer } from "@/features/recipe/apis/server";
import RecipeListContainer from "@/features/recipe/components/list/RecipeListContainer";
import { RECIPE_QUERY_KEY } from "@/features/recipe/libs/constants";

import { HydrationBoundary } from "@/libs/HydrationBoundary";
import { getQueryClient } from "@/libs/getQueryClient";

export default async function HomePage() {
  const queryClient = getQueryClient();
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signIn");
  }

  await queryClient.prefetchQuery({
    queryKey: RECIPE_QUERY_KEY,
    queryFn: getRecipesServer,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <RecipeListContainer />
    </HydrationBoundary>
  );
}
