import { redirect } from "next/navigation";

import { auth } from "@/features/auth/services/auth";
import RecipeCreater from "@/features/recipe/components/recipe-creater";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signIn");
  }

  return <RecipeCreater />;
}
