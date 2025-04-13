beforeEach(() => {
  cy.login();
});

describe("RecipeList", () => {
  beforeEach(() => {
    cy.visit("/recipe");
  });

  it("레시피 목록 페이지에 접속한다.", () => {
    cy.assertUrl("/recipe");
    cy.findByRole("heading", { name: "나의 레시피 목록" }).should("exist");
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
});

describe("RecipeCreation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("레시피 생성 페이지에 접속한다.", () => {
    cy.assertUrl("/");
    cy.findByRole("heading", { name: "어떤 레시피를 알고 싶으세요?" }).should(
      "exist",
    );
  });

  it("입력 필드에 텍스트를 입력하면 해당 텍스트가 표시된다.", () => {
    cy.findByRole("textbox").type("test");
    cy.findByRole("textbox").should("have.value", "test");
  });

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
    }).as("getScript");

    cy.intercept("POST", "/api/recipes", {
      statusCode: 200,
      body: {
        _id: "Bd3mEndv7RL1hAxiasvV8R",
        id: "Bd3mEndv7RL1hAxiasvV8R",
        title: "된장찌개",
        description: "볶아서 진한 맛을 내는 된장찌개 레시피입니다.",
        url: "https://www.youtube.com/watch?v=8QlrdE4OXgM",
        ingredients: [
          { name: "된장", amount: "3큰술" },
          { name: "양파", amount: "1/2개" },
          { name: "대파", amount: "1대" },
          { name: "물", amount: "500ml" },
          { name: "고추장", amount: "1큰술" },
          { name: "청양고추", amount: "2개" },
          { name: "두부", amount: "1/2모" },
        ],
        steps: [
          { description: "물을 넣고 끓인다." },
          { description: "된장을 넣고 끓인다." },
          { description: "양파를 넣고 끓인다." },
          { description: "대파를 넣고 끓인다." },
          { description: "고추장을 넣고 끓인다." },
          { description: "청양고추를 넣고 끓인다." },
          { description: "두부를 넣고 끓인다." },
        ],
        tags: ["된장", "찌개", "한식"],
        tips: [
          "된장을 볶으면 더 진한 맛이 납니다.",
          "고기를 넣어도 맛있습니다.",
        ],
        createdAt: new Date().toISOString(),
        author: "test-id",
      },
    }).as("createRecipe");

    cy.findByRole("textbox").type(
      "https://www.youtube.com/watch?v=8QlrdE4OXgM",
    );

    cy.findByRole("button", { name: "레시피 생성" }).click();

    cy.url().should("include", "/recipe/");
  });
});
