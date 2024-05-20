import { NextRequest, NextResponse } from "next/server";

import { withSessionUser } from "@/features/auth/services/session";
import { getRecipesOf, updateRecipe } from "@/features/recipe/services/recipe";

export async function GET() {
  return withSessionUser(async (user) => {
    const recipes = await getRecipesOf(user.email);

    return NextResponse.json(recipes);
  });
}

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const recipe = await req.json();
    const updatedRecipe = await updateRecipe(recipe);
    return NextResponse.json(updatedRecipe);
  });
}
