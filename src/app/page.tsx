import { redirect } from "next/navigation";

import { auth } from "@/features/auth/services/auth";
import RecipeListContainer from "@/features/recipe/components/list/RecipeListContainer";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signIn");
  }

  return (
    <>
      <RecipeListContainer />
    </>
  );
}
