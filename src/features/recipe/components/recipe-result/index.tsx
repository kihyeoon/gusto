import type { RecipeSchema } from "@/features/recipe/libs/ai/schemas";
import type { Recipe } from "@/features/recipe/models/recipe";

import { DeepPartial } from "@/libs/deep-partial";

import RecipeDescription from "./recipe-description";
import RecipeHeader from "./recipe-header";
import RecipeIngredients from "./recipe-ingredients";
import RecipeSteps from "./recipe-steps";
import RecipeTips from "./recipe-tips";

interface RecipeResultProps {
  recipe: any;
  url: string;
  initialUrl?: string;
  isGenerating: boolean;
  stop: () => void;
  getThumbnailUrl: (url: string) => string;
  imgSrc: string;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const RecipeResult = ({
  recipe,
  url,
  initialUrl,
  isGenerating,
  stop,
  getThumbnailUrl,
  imgSrc,
  handleImageError,
}: RecipeResultProps) => {
  if (!recipe) return null;

  return (
    <div className="space-y-6">
      <RecipeHeader
        title={recipe.title}
        isGenerating={isGenerating}
        onStop={stop}
      />

      <div className="space-y-6">
        {recipe.description && (
          <RecipeDescription
            description={recipe.description}
            url={url}
            initialUrl={initialUrl}
            title={recipe.title}
            imgSrc={imgSrc}
            getThumbnailUrl={getThumbnailUrl}
            handleImageError={handleImageError}
          />
        )}

        <RecipeIngredients ingredients={recipe.ingredients || []} />
        <RecipeSteps steps={recipe.steps || []} />
        {recipe.tips && <RecipeTips tips={recipe.tips} />}
      </div>
    </div>
  );
};

export default RecipeResult;
