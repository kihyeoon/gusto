import { RecipeFromAI } from "@/models/recipe";

const recipeFromAIExample: RecipeFromAI = {
  title: "간단한 토마토 파스타",
  description: "토마토 소스와 파스타를 활용한 간단한 레시피입니다.",
  ingredients: [
    {
      name: "토마토",
      amount: "2개",
    },
    {
      name: "양파",
      amount: "1/2개",
    },
    {
      name: "파스타",
      amount: "100g",
    },
    {
      name: "올리브 오일",
      amount: "2큰술",
    },
    {
      name: "소금",
      amount: "적당량",
    },
    {
      name: "후추",
      amount: "적당량",
    },
  ],
  steps: [
    {
      description: "토마토는 끓는 물에 살짝 데쳐 껍질을 벗기고 잘게 다집니다.",
    },
    {
      description: "양파는 잘게 다져 올리브 오일에 볶습니다.",
    },
    {
      description: "토마토, 소금, 후추를 넣고 끓입니다.",
    },
    {
      description: "파스타를 삶아 토마토 소스와 함께 버무립니다.",
    },
  ],
  tips: [
    "파스타 삶는 시간은 제품 설명을 참고하세요.",
    "취향에 따라 치즈를 추가해도 좋습니다.",
  ],
};

export async function getRecipeSample(): Promise<RecipeFromAI> {
  // 3초 지연
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return recipeFromAIExample;
}
