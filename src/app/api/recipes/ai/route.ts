import { NextRequest, NextResponse } from "next/server";

import { errorMessages } from "@/features/recipe/libs/constants";
import { RecipeFromAI } from "@/features/recipe/models/recipe";
import { RecipeAIService } from "@/features/recipe/services/open-ai";
import { createRecipe } from "@/features/recipe/services/recipe";

import { getRecipeSample } from "@/app/api/recipes/ai/sample";

import { ApiErrorSchema } from "@/libs/exceptions";

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
    const openai = RecipeAIService.getInstance();
    const response = await openai.getChatResponse(script);
    const content = response.choices[0].message.content;
    if (content === '{"error":"not recipe"}' || !content) {
      return NextResponse.json<ApiErrorSchema>(
        {
          message: errorMessages.INVALID_URL.message,
          description: errorMessages.INVALID_URL.description,
        },
        { status: 404 },
      );
    }

    const recipeFromAI: RecipeFromAI = JSON.parse(content);

    // const recipeFromAI: RecipeFromAI = await getRecipeSample();

    const createdRecipe = await createRecipe(recipeFromAI, url, userId);

    return NextResponse.json(createdRecipe);
  } catch (error) {
    return NextResponse.json<ApiErrorSchema>(
      {
        message: errorMessages.CANNOT_CREATE_RECIPE.message,
        description: errorMessages.CANNOT_CREATE_RECIPE.description,
      },
      { status: 500 },
    );
  }
}
