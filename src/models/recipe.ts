export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[] | null;
  tags: string[];
  createdAt: Date;
}

export type RecipePreview = Pick<
  Recipe,
  "id" | "title" | "description" | "tags"
>;

export interface Ingredient {
  name: string;
  amount: string | null;
}

export interface Step {
  description: string;
}
