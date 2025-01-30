beforeEach(() => {
  cy.login();
});

describe("RecipeList", () => {
  it("레시피 목록 페이지에 접속한다.", () => {
    cy.assertUrl("/");
  });

  it("입력 필드에 텍스트를 입력하면 해당 텍스트가 표시된다.", () => {
    cy.findByRole("textbox").type("test");
    cy.findByRole("textbox").should("have.value", "test");
  });

  it("레시피를 클릭하면 해당 레시피의 상세 페이지로 이동한다.", () => {
    cy.findAllByRole("listitem").first().click();
    cy.url().should("include", "/recipe/");
  });

  it("레시피를 삭제하면 레시피 목록에서 삭제된다.", () => {
    cy.findAllByRole("listitem").then(($items) => {
      // 삭제 전 리스트 아이템 개수 저장
      const beforeCount = $items.length;

      // 삭제 요청 인터셉트
      cy.intercept("DELETE", "/api/recipes/*", {
        statusCode: 200,
        body: "Deleted successfully",
      }).as("deleteRecipe");

      cy.findAllByRole("button", { name: "지우기" }).first().click();
      cy.findByRole("button", { name: "네, 삭제할래요." }).click();

      cy.findAllByRole("listitem").should("have.length", beforeCount - 1);
    });
  });

  // 레시피 생성 테스트
  it("레시피를 생성하면 생성된 레시피 상세 페이지로 이동한다.", () => {
    cy.intercept("POST", "/api/recipes/script", {
      statusCode: 200,
      body: [
        "저의 가게 이모님 된장찌개가 한때",
        "인기가 많았는데요 남편이 술 먹고",
        "들어올 때 이거 꾸려 주면 맛있게",
        "먹더라고요 첫 번째 비법은 된장을",
        "...",
      ],
    });

    cy.intercept("POST", "/api/recipes/ai", {
      statusCode: 200,
      body: {
        _createdAt: "2025-01-30T11:55:16Z",
        _id: "Bd3mEndv7RL1hAxiasvV8R",
        _rev: "Bd3mEndv7RL1hAxiasvV3E",
        _type: "recipe",
        _updatedAt: "2025-01-30T11:55:16Z",
        author: {
          _ref: "test-id",
          _type: "reference",
        },
        description: "볶아서 진한 맛을 내는 된장찌개 레시피입니다.",
        ingredients: [],
        steps: [],
        tags: [],
        tips: [],
        title: "된장찌개",
        url: "https://www.youtube.com/watch?v=8QlrdE4OXgM&list=PLCkJu0mLHv5aWDWlO-YOqEe256lXPoKqY&index=29",
      },
    });

    cy.findByRole("textbox").type(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    cy.findByRole("button", { name: "AI로 레시피 만들기" }).click();

    cy.url().should("include", "/recipe/");
  });
});
