import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

import { withSessionUser } from "@/features/auth/services/session";
import { recipePrompt } from "@/features/recipe/libs/ai/prompt";
import { recipeFromAISchema } from "@/features/recipe/libs/ai/schemas";
import { errorMessages } from "@/features/recipe/libs/constants";
import { RecipeFromAI } from "@/features/recipe/models/recipe";
import { getRecipesOf, updateRecipe } from "@/features/recipe/services/recipe";
import { createRecipe } from "@/features/recipe/services/recipe";

import { ApiErrorSchema } from "@/libs/exceptions";

export const runtime = "edge";
export const maxDuration = 60;

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

interface StreamRequest {
  script: string;
  url: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  const { script, url, userId }: StreamRequest = await req.json();

  try {
    const result = streamObject({
      model: openai("gpt-4o"),
      schema: recipeFromAISchema,
      system: recipePrompt,
      prompt: script,
      onFinish: async (completion) => {
        try {
          // 완전한 레시피 객체로 DB에 저장
          // completion.object에 실제 스키마에 맞는 데이터가 있음
          if (completion.object) {
            const recipeFromAI: RecipeFromAI = {
              title: completion.object.title,
              description: completion.object.description,
              ingredients: completion.object.ingredients,
              steps: completion.object.steps,
              tips: completion.object.tips,
            };
            await createRecipe(recipeFromAI, url, userId);
            console.log("레시피가 성공적으로 저장되었습니다.");
          }
        } catch (error) {
          console.error("레시피 저장 중 오류 발생:", error);
        }
      },
    });

    // 클라이언트에 스트리밍 텍스트 응답 반환
    return result.toTextStreamResponse();
  } catch (error) {
    return NextResponse.json<ApiErrorSchema>(
      {
        message: errorMessages.CANNOT_CREAT_RECIPE.message,
        description: errorMessages.CANNOT_CREAT_RECIPE.description,
      },
      { status: 500 },
    );
  }
}
