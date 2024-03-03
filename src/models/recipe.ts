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

export interface Ingredient {
  name: string;
  amount: string | null;
}

export interface Step {
  description: string;
}
