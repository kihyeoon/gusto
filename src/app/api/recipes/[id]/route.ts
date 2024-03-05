import { NextRequest, NextResponse } from "next/server";

import { getRecipeById } from "@/service/recipe";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  const recipe = await getRecipeById(context.params.id);
  return NextResponse.json(recipe);
}
