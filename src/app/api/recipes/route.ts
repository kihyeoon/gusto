import { openai } from "@ai-sdk/openai";
import { generateObject, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

import { uploadImageToS3 } from "@/services/s3-service";

import { auth } from "@/features/auth/services/auth";
import { withSessionUser } from "@/features/auth/services/session";
import { recipePrompt } from "@/features/recipe/libs/ai/prompt";
import {
  isRecipeSchema,
  recipeSchema,
} from "@/features/recipe/libs/ai/schemas";
import { errorMessages } from "@/features/recipe/libs/constants";
import { RecipeFromAI, RecipeInput } from "@/features/recipe/models/recipe";
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
    
    // 기존 레시피 조회 및 작성자 확인
    const { getRecipeById } = await import("@/features/recipe/services/recipe");
    const existingRecipe = await getRecipeById(recipe.id);
    
    if (!existingRecipe) {
      return NextResponse.json(
        { message: "레시피를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    
    if (existingRecipe.author !== user.email) {
      return NextResponse.json(
        { message: "레시피를 수정할 권한이 없습니다." },
        { status: 403 }
      );
    }
    
    const updatedRecipe = await updateRecipe(recipe);
    return NextResponse.json(updatedRecipe);
  });
}

export async function POST(req: NextRequest) {
  const { script, url, id, thumbnailUrl }: RecipeInput = await req.json();

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json<ApiErrorSchema>(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    let s3ThumbnailUrl: string | undefined;

    if (thumbnailUrl) {
      try {
        s3ThumbnailUrl = await uploadImageToS3(thumbnailUrl, id);
      } catch (error) {
        console.error("썸네일 업로드 실패:", error);
      }
    }

    const { object: recipeCheck } = await generateObject({
      model: openai("gpt-4.1-nano"),
      schema: isRecipeSchema,
      prompt: `다음 스크립트가 요리 레시피에 관한 내용인지 판단해주세요: ${script}`,
      temperature: 0,
    });

    if (!recipeCheck.isRecipe) {
      return NextResponse.json<ApiErrorSchema>(
        {
          message: errorMessages.NOT_A_RECIPE.message,
          description: errorMessages.NOT_A_RECIPE.description,
        },
        { status: 422 }, // Unprocessable Content
      );
    }

    const result = streamObject({
      model: openai("gpt-4.1"),
      schema: recipeSchema,
      system: recipePrompt,
      prompt: script,
      onFinish: async (completion) => {
        try {
          if (completion.object) {
            const recipeFromAI: RecipeFromAI = {
              title: completion.object.title,
              description: completion.object.description,
              ingredients: completion.object.ingredients,
              steps: completion.object.steps,
              tips: completion.object.tips,
              thumbnailUrl: s3ThumbnailUrl || thumbnailUrl,
            };
            await createRecipe(recipeFromAI, url, userId, id);
          }
        } catch (error) {
          console.error("레시피 저장 중 오류 발생:", error);
        }
      },
    });

    return result.toTextStreamResponse();
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
