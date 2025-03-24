import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/features/auth/services/auth";
import { withSessionUser } from "@/features/auth/services/session";
import { recipePrompt } from "@/features/recipe/libs/ai/prompt";
import { recipeSchema } from "@/features/recipe/libs/ai/schemas";
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

interface PostRequest {
  script: string;
  url: string;
  id: string;
}

export async function POST(req: NextRequest) {
  const { script, url, id }: PostRequest = await req.json();

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json<ApiErrorSchema>(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const result = streamObject({
      model: openai("gpt-4o"),
      schema: recipeSchema,
      system: recipePrompt,
      prompt: script,
      onFinish: async (completion) => {
        try {
          // 완전한 레시피 객체로 DB에 저장
          if (completion.object) {
            const recipeFromAI: RecipeFromAI = {
              title: completion.object.title,
              description: completion.object.description,
              ingredients: completion.object.ingredients,
              steps: completion.object.steps,
              tips: completion.object.tips,
            };
            await createRecipe(recipeFromAI, url, userId, id);
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
