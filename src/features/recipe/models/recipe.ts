export interface Recipe {
  _id: string;
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
  tags: string[];
  createdAt: Date;
  author: string;
}

export interface RecipeFromAI {
  title: string;
  description: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[] | null;
}

export interface RecipeInput {
  script: string;
  url: string;
  id: string;
}

export type RecipePreview = Pick<
  Recipe,
  "id" | "title" | "description" | "tags" | "url"
>;

export interface Ingredient {
  name: string;
  amount: string | null;
}

export interface Step {
  description: string;
}
