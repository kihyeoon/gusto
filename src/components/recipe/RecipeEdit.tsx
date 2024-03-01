import { Input } from "@/components/ui/input";

import { Recipe } from "@/hooks/useRecipe";

interface Props {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
}

export default function RecipeEdit({ recipe, setRecipe }: Props) {
  return (
    // edit mode
    <div className="flex flex-col gap-5">
      <Input
        className="text-2xl font-bold"
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
      ></Input>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>
              <Input
                value={ingredient}
                onChange={(e) => {
                  const newIngredients = [...recipe.ingredients];
                  newIngredients[i] = e.target.value;
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {recipe.body.map((step, i) => (
            <li key={i}>
              <Input
                value={step}
                onChange={(e) => {
                  const newBody = [...recipe.body];
                  newBody[i] = e.target.value;
                  setRecipe({ ...recipe, body: newBody });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Tips</h3>
        <ul className="flex flex-col gap-2">
          {recipe.tips.map((tip, i) => (
            <li key={i}>
              <Input
                value={tip}
                onChange={(e) => {
                  const newTips = [...recipe.tips];
                  newTips[i] = e.target.value;
                  setRecipe({ ...recipe, tips: newTips });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
