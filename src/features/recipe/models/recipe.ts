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
  thumbnailUrl?: string;
}

export interface RecipeFromAI {
  title: string;
  description: string | null;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[] | null;
  thumbnailUrl?: string;
}

export interface RecipeInput {
  script: string;
  url: string;
  id: string;
  thumbnailUrl?: string;
}

export type RecipePreview = Pick<
  Recipe,
  "id" | "title" | "description" | "tags" | "url" | "thumbnailUrl"
>;

export interface Ingredient {
  name: string;
  amount: string | null;
}

export interface Step {
  description: string;
}
