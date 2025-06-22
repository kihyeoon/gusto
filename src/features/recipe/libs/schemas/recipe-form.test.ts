import { describe, expect, it } from "vitest";

import { recipeFormSchema } from "./recipe-form";

describe("recipeFormSchema", () => {
  it("should validate a valid recipe form data", () => {
    const validData = {
      title: "테스트 레시피",
      url: "https://www.youtube.com/watch?v=test",
      description: "맛있는 레시피입니다",
      ingredients: [
        { name: "양파", amount: "1개" },
        { name: "당근", amount: "2개" },
      ],
      steps: [
        { description: "양파를 썰어주세요" },
        { description: "당근을 볶아주세요" },
      ],
      tips: ["팁1", "팁2"],
      tags: ["한식", "간단"],
    };

    const result = recipeFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation when title is empty", () => {
    const invalidData = {
      title: "",
      url: "",
      description: "",
      ingredients: [{ name: "양파", amount: "1개" }],
      steps: [{ description: "양파를 썰어주세요" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("제목을 입력해주세요");
    }
  });

  it("should fail validation when ingredients array is empty", () => {
    const invalidData = {
      title: "테스트 레시피",
      url: "",
      description: "",
      ingredients: [],
      steps: [{ description: "양파를 썰어주세요" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("최소 1개 이상의 재료를 입력해주세요");
    }
  });

  it("should fail validation when steps array is empty", () => {
    const invalidData = {
      title: "테스트 레시피",
      url: "",
      description: "",
      ingredients: [{ name: "양파", amount: "1개" }],
      steps: [],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("최소 1개 이상의 조리 순서를 입력해주세요");
    }
  });

  it("should fail validation with invalid URL", () => {
    const invalidData = {
      title: "테스트 레시피",
      url: "not-a-valid-url",
      description: "",
      ingredients: [{ name: "양파", amount: "1개" }],
      steps: [{ description: "양파를 썰어주세요" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("올바른 URL을 입력해주세요");
    }
  });

  it("should pass validation with empty URL", () => {
    const validData = {
      title: "테스트 레시피",
      url: "",
      description: "",
      ingredients: [{ name: "양파", amount: "1개" }],
      steps: [{ description: "양파를 썰어주세요" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation when ingredient name is empty", () => {
    const invalidData = {
      title: "테스트 레시피",
      url: "",
      description: "",
      ingredients: [{ name: "", amount: "1개" }],
      steps: [{ description: "양파를 썰어주세요" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("재료명을 입력해주세요");
    }
  });

  it("should fail validation when step description is empty", () => {
    const invalidData = {
      title: "테스트 레시피",
      url: "",
      description: "",
      ingredients: [{ name: "양파", amount: "1개" }],
      steps: [{ description: "" }],
      tips: [],
      tags: [],
    };

    const result = recipeFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("조리 순서를 입력해주세요");
    }
  });
});