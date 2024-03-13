import { RecipeFromAI } from "@/models/recipe";
import { NextRequest, NextResponse } from "next/server";

import { OpenAIService } from "@/service/openAI";
import { createRecipe } from "@/service/recipe";

import { getRecipeSample } from "@/app/api/recipes/ai/sample";

export const runtime = "edge";

interface Request {
  script: string;
  url: string;
  userId: string;
}

/** TODO: 현재 next-auth의 getServerSession을 엣지에서 사용할 수 없어서 userId를 클라이언트에서 받아오는 방식으로 사용중
 * => v5으로 마이그레이션 하면 수정 필요 (https://github.com/nextauthjs/next-auth/pull/7443)
 */
export async function POST(req: NextRequest) {
  const { script, url, userId }: Request = await req.json();

  try {
    const openai = OpenAIService.getInstance();
    const response = await openai.getChatResponse(script);
    const content = response.choices[0].message.content;
    if (content === '{"error":"not recipe"}' || !content) {
      return NextResponse.json({ error: "No recipe found" }, { status: 404 });
    }

    const recipeFromAI: RecipeFromAI = JSON.parse(content);

    // const recipeFromAI: RecipeFromAI = await getRecipeSample();

    const createdRecipe = await createRecipe(recipeFromAI, url, userId);

    return NextResponse.json(createdRecipe);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
