import { NextResponse } from "next/server";

import { getAllRecipes } from "@/service/recipe";

export async function GET() {
  const recipes = await getAllRecipes();
  console.log("recipes->", recipes);
  return NextResponse.json(recipes);
}
