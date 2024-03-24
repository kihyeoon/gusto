export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
  tags: string[];
  createdAt: Date;
}

export interface RecipeFromAI {
  title: string;
  description: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[] | null;
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
