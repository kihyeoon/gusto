import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "재료명은 필수입니다"),
  amount: z.string().nullable(),
});

export const stepSchema = z.object({
  description: z.string().min(1, "조리 단계 설명은 필수입니다"),
});

export const recipeSchema = z.object({
  title: z.string().min(1, "레시피 제목은 필수입니다"),
  description: z.string().nullable(),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "최소 하나의 재료가 필요합니다"),
  steps: z.array(stepSchema).min(1, "최소 하나의 조리 단계가 필요합니다"),
  tips: z.array(z.string()).nullable(),
});

export const isRecipeSchema = z.object({
  isRecipe: z.boolean().describe("입력된 스크립트가 요리 레시피에 관한 내용인지 여부"),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
