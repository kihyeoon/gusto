import { NextResponse } from "next/server";

import { getAllRecipes } from "@/service/recipe";

export async function GET() {
  const recipes = await getAllRecipes();
  return NextResponse.json(recipes);
}
