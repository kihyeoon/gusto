"use client";

import { Recipe } from "@/components/VideoRecipe";

interface Props {
  recipe: Recipe;
}

export default function RecipeView({ recipe }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{recipe.title}</h2>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {recipe.body.map((step, i) => (
            <li key={i}>{`${i + 1}. ${step}`}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Tips</h3>
        <ul className="flex flex-col gap-2">
          {recipe.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}