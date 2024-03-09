import { RecipeFromAI } from "@/models/recipe";
import { NextRequest, NextResponse } from "next/server";

import { OpenAIService } from "@/service/openAI";
import { createRecipe } from "@/service/recipe";

import { getRecipeSample } from "@/app/api/recipes/ai/sample";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { script } = await req.json();
  console.log(script);

  try {
    const openai = OpenAIService.getInstance();
    const response = await openai.getChatResponse(script);
    const content = response.choices[0].message.content;
    if (content === '{"error":"not recipe"}' || !content) {
      return NextResponse.json({ error: "No recipe found" }, { status: 404 });
    }

    const recipeFromAI: RecipeFromAI = JSON.parse(content);

    // const recipeFromAI: RecipeFromAI = await getRecipeSample();

    const createdRecipe = await createRecipe(recipeFromAI);
    console.log(createdRecipe);

    return NextResponse.json(createdRecipe);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
