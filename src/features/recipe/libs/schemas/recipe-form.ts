import { z } from "zod";

// 개별 컴포넌트 스키마
const ingredientSchema = z.object({
  name: z.string().min(1, "재료명을 입력해주세요"),
  amount: z.string().nullable(),
});

const stepSchema = z.object({
  description: z.string().min(1, "조리 순서를 입력해주세요"),
});

// 레시피 수정 폼 스키마
export const recipeFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요").max(100, "제목은 100자 이내로 입력해주세요"),
  url: z.string().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "올바른 URL을 입력해주세요"
  }).nullable().or(z.literal("")),
  description: z.string().nullable().or(z.literal("")),
  ingredients: z.array(ingredientSchema).min(1, "최소 1개 이상의 재료를 입력해주세요"),
  steps: z.array(stepSchema).min(1, "최소 1개 이상의 조리 순서를 입력해주세요"),
  tips: z.array(z.string()),
  tags: z.array(z.string()),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;

// 기본값 정의
export const defaultRecipeFormValues: RecipeFormData = {
  title: "",
  url: "",
  description: "",
  ingredients: [{ name: "", amount: "" }],
  steps: [{ description: "" }],
  tips: [],
  tags: [],
};