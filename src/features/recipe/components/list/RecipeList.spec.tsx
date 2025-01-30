import { screen } from "@testing-library/react";

import render from "@/libs/test/render";

import RecipeList from "./RecipeList";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockRecipes = [
  {
    id: "recipe1",
    title: "맛있는 김치찌개",
    description: "한국의 전통 음식인 김치찌개 레시피입니다.",
    tags: ["한식", "찌개", "김치"],
    url: "https://www.youtube.com/watch?v=example1",
  },
  {
    id: "recipe2",
    title: "스팸 마요 덮밥",
    description: "간단하게 만드는 스팸 마요 덮밥입니다.",
    tags: ["간단요리", "덮밥", "스팸"],
    url: "https://www.youtube.com/watch?v=example2",
  },
];

describe("RecipeList", () => {
  const mockDeleteRecipe = vi.fn();

  it("레시피 목록이 올바르게 렌더링된다", async () => {
    await render(
      <RecipeList recipes={mockRecipes} deleteRecipe={mockDeleteRecipe} />,
    );

    const recipe1 = screen.getByText("맛있는 김치찌개");
    const recipe2 = screen.getByText("스팸 마요 덮밥");
    const tags = screen.getAllByText(/^#/);

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(tags).toHaveLength(6); // 각 레시피당 3개의 태그
  });

  it("레시피를 클릭하면 해당 레시피의 상세 페이지로 이동한다", async () => {
    const { user } = await render(
      <RecipeList recipes={mockRecipes} deleteRecipe={mockDeleteRecipe} />,
    );

    const recipeContainer = screen.getByText("맛있는 김치찌개").closest("div");
    await user.click(recipeContainer!);

    expect(mockPush).toHaveBeenCalledWith("/recipe/recipe1");
  });

  describe("레시피 삭제", () => {
    it("데스크톱에서 호버 시 호버 delete-button이 화면에 나타난다.", async () => {
      const { user } = await render(
        <RecipeList recipes={mockRecipes} deleteRecipe={mockDeleteRecipe} />,
      );

      const recipe = screen.getByText("맛있는 김치찌개").closest("li");
      await user.hover(recipe!);
      const deleteButton = await screen.findByTestId("delete-button");
      screen.debug();

      expect(deleteButton).toBeInTheDocument();
    });

    it("모바일에서 스와이프 시 지우기 버튼이 나타나고 클릭하면 deleteRecipe 함수가 호출된다", async () => {
      // 모바일 환경 시뮬레이션
      vi.stubGlobal("navigator", { ...navigator, maxTouchPoints: 1 });
      Object.defineProperty(window, "ontouchstart", { value: {} });

      const { user } = await render(
        <RecipeList recipes={mockRecipes} deleteRecipe={mockDeleteRecipe} />,
      );

      const deleteButton = screen.getAllByRole("button", { name: "지우기" })[0];
      await user.click(deleteButton);

      const confirmButton = await screen.findByRole("button", {
        name: "네, 삭제할래요.",
      });
      await user.click(confirmButton);

      expect(mockDeleteRecipe).toHaveBeenCalledWith("recipe1");
    });
  });

  it("태그가 올바르게 렌더링된다", async () => {
    await render(
      <RecipeList recipes={mockRecipes} deleteRecipe={mockDeleteRecipe} />,
    );

    const tags = screen.getAllByText(/^#/);
    expect(tags[0]).toHaveTextContent("#한식");
    expect(tags[1]).toHaveTextContent("#찌개");
    expect(tags[2]).toHaveTextContent("#김치");
  });
});
