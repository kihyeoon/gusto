import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import Recipes from "@/components/recipes/Recipes";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signIn");
  }

  return (
    <>
      <Recipes />
    </>
  );
}
