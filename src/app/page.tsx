import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/features/auth/services/auth";
import RecipeListContainer from "@/features/recipe/components/list/RecipeListContainer";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
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
