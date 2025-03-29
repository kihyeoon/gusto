import { redirect } from "next/navigation";

import { auth } from "@/features/auth/services/auth";
import RecipeCreator from "@/features/recipe/components/recipe-creator";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signIn");
  }

  return <RecipeCreator />;
}
