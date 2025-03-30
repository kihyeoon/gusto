import { BlurFade } from "@/components/ui/blur-fade";

import { Ingredient } from "../../models/recipe";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="space-y-4">
      <BlurFade>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          재료
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {ingredients.map((ingredient, index) => (
            <BlurFade key={index} delay={index * 0.05} direction="up">
              <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                <span className="font-medium text-gray-900 dark:text-white">
                  {ingredient.name}
                </span>
                {ingredient.amount && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {ingredient.amount}
                  </span>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </BlurFade>
    </div>
  );
};

export default RecipeIngredients;
