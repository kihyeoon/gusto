import { Recipe } from "@/models/recipe";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
}

// TODO: 블록기반 WYSIWYG 에디터로 변경
export default function RecipeEdit({ recipe, setRecipe }: Props) {
  const { title, url, description, ingredients, steps, tips } = recipe;
  return (
    <div className="flex flex-col gap-5">
      <Textarea
        className="resize-none text-2xl font-bold"
        value={title}
        rows={1}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
      />
      <div className="flex flex-col gap-3">
        {description && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">소개</h3>
            <p>{description}</p>
          </div>
        )}
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {ingredients.map(({ name, amount }, i) => (
            <li className="flex gap-2" key={i}>
              <Input
                value={name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[i].name = e.target.value;
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              />
              {amount && (
                <Input
                  value={amount}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[i].amount = e.target.value;
                    setRecipe({ ...recipe, ingredients: newIngredients });
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {steps.map(({ description }, i) => (
            <li key={i}>
              <Textarea
                className="resize-none"
                rows={1}
                value={description}
                onChange={(e) => {
                  const newSteps = [...steps];
                  newSteps[i] = { description: e.target.value };
                  setRecipe({ ...recipe, steps: newSteps });
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">Tips</h3>
        <ul className="flex flex-col gap-2">
          {tips.map((tip, i) => (
            <li key={i}>
              <Textarea
                className="resize-none"
                rows={1}
                value={tip}
                onChange={(e) => {
                  const newTips = [...tips];
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
