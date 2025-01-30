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
});
