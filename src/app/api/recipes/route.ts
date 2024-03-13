import { NextResponse } from "next/server";

import { getRecipesOf } from "@/service/recipe";

import { withSessionUser } from "@/lib/session";

export async function GET() {
  return withSessionUser(async (user) => {
    const recipes = await getRecipesOf(user.email);

    return NextResponse.json(recipes);
  });
}
