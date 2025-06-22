import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Recipe } from "@/features/recipe/models/recipe";

import RecipeEdit from "./recipe-edit";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock next-auth
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        id: "user1",
        email: "test@example.com",
      },
    },
  }),
}));

// Mock toast
vi.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockRecipe: Recipe = {
  _id: "1",
  id: "1",
  title: "테스트 레시피",
  description: "맛있는 레시피입니다",
  url: "https://www.youtube.com/watch?v=test",
  ingredients: [
    { name: "양파", amount: "1개" },
    { name: "당근", amount: "2개" },
  ],
  steps: [
    { description: "양파를 썰어주세요" },
    { description: "당근을 볶아주세요" },
  ],
  tips: ["적당한 크기로 썰어주세요", "중불에서 볶아주세요"],
  tags: ["한식", "간단"],
  createdAt: new Date(),
  author: "test@example.com",
  thumbnailUrl: "https://example.com/thumbnail.jpg",
};

const renderRecipeEdit = (recipe: Recipe = mockRecipe) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RecipeEdit
        recipe={recipe}
        onSaveSuccess={vi.fn()}
        onCancel={vi.fn()}
      />
    </QueryClientProvider>
  );
};

describe("RecipeEdit", () => {
  it("should render form with recipe data", () => {
    renderRecipeEdit();

    // 제목 필드 확인
    expect(screen.getByDisplayValue("테스트 레시피")).toBeInTheDocument();
    
    // URL 필드 확인
    expect(screen.getByDisplayValue("https://www.youtube.com/watch?v=test")).toBeInTheDocument();
    
    // 설명 필드 확인
    expect(screen.getByDisplayValue("맛있는 레시피입니다")).toBeInTheDocument();
    
    // 재료 필드 확인
    expect(screen.getByDisplayValue("양파")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1개")).toBeInTheDocument();
    expect(screen.getByDisplayValue("당근")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2개")).toBeInTheDocument();
    
    // 조리 순서 필드 확인
    expect(screen.getByDisplayValue("양파를 썰어주세요")).toBeInTheDocument();
    expect(screen.getByDisplayValue("당근을 볶아주세요")).toBeInTheDocument();
    
    // Tips 필드 확인
    expect(screen.getByDisplayValue("적당한 크기로 썰어주세요")).toBeInTheDocument();
    expect(screen.getByDisplayValue("중불에서 볶아주세요")).toBeInTheDocument();
  });

  it("should render form sections with correct headings", () => {
    renderRecipeEdit();

    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("소개")).toBeInTheDocument();
    expect(screen.getByText("재료")).toBeInTheDocument();
    expect(screen.getByText("요리 순서")).toBeInTheDocument();
    expect(screen.getByText("Tips")).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    renderRecipeEdit();

    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
  });

  it("should render ingredient and step add buttons", () => {
    renderRecipeEdit();

    expect(screen.getByText("재료 추가")).toBeInTheDocument();
  });

  it("should handle recipe with minimal data", () => {
    const minimalRecipe: Recipe = {
      ...mockRecipe,
      description: null,
      url: null,
      ingredients: [{ name: "재료1", amount: null }],
      steps: [{ description: "단계1" }],
      tips: [],
      tags: [],
    };

    renderRecipeEdit(minimalRecipe);

    expect(screen.getByDisplayValue("테스트 레시피")).toBeInTheDocument();
    expect(screen.getByDisplayValue("재료1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("단계1")).toBeInTheDocument();
  });
});