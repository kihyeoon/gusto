import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CommentForm from "@/features/recipe/components/detail/comment-form";
import IngredientContent from "@/features/recipe/components/detail/ingredient-content";
import TextContent from "@/features/recipe/components/detail/text-content";
import { Ingredient, Recipe } from "@/features/recipe/models/recipe";

interface Props {
  recipe: Recipe;
  setRecipe: (recipe: Recipe) => void;
}

const sectionStyle = "flex flex-col gap-3 bg-background p-4";

// TODO: 블록기반 WYSIWYG 에디터로 변경
export default function RecipeEdit({ recipe, setRecipe }: Props) {
  const { title, url, description, ingredients, steps, tips } = recipe;
  return (
    <div className="flex flex-col gap-3">
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">제목</h3>
        <Textarea
          className="resize-none text-2xl font-bold"
          value={title}
          rows={1}
          onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        />
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">URL</h3>
        <Input
          value={url || ""}
          onChange={(e) => setRecipe({ ...recipe, url: e.target.value })}
        />
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">소개</h3>
        <Textarea
          className="resize-none"
          rows={1}
          value={description || ""}
          onChange={(e) =>
            setRecipe({ ...recipe, description: e.target.value })
          }
        />
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {ingredients.map(({ name, amount }, i) => (
            <li className="flex w-full gap-2" key={i}>
              <IngredientContent
                name={name}
                amount={amount || ""}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[i][e.target.name as keyof Ingredient] =
                    e.target.value;
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
                onDelete={() => {
                  const newIngredients = [...ingredients];
                  newIngredients.splice(i, 1);
                  setRecipe({ ...recipe, ingredients: newIngredients });
                }}
              />
            </li>
          ))}
        </ul>
        <Button
          onClick={() => {
            const newIngredients = [...ingredients, { name: "", amount: "" }];
            setRecipe({ ...recipe, ingredients: newIngredients });
          }}
        >
          재료 추가
        </Button>
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {steps.map(({ description }, i) => (
            <li key={i}>
              <TextContent
                value={description}
                onChange={(e) => {
                  const newSteps = [...steps];
                  newSteps[i] = { description: e.target.value };
                  setRecipe({ ...recipe, steps: newSteps });
                }}
                onDelete={() => {
                  const newSteps = [...steps];
                  newSteps.splice(i, 1);
                  setRecipe({ ...recipe, steps: newSteps });
                }}
              />
            </li>
          ))}
        </ul>
        <CommentForm
          onSubmit={(content) => {
            const newSteps = [...steps, { description: content }];
            setRecipe({ ...recipe, steps: newSteps });
          }}
        />
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">Tips</h3>
        <ul className="flex flex-col gap-2">
          {tips?.map((tip, i) => (
            <li key={i}>
              <TextContent
                value={tip}
                onChange={(e) => {
                  const newTips = [...tips];
                  newTips[i] = e.target.value;
                  setRecipe({ ...recipe, tips: newTips });
                }}
                onDelete={() => {
                  const newTips = [...tips];
                  newTips.splice(i, 1);
                  setRecipe({ ...recipe, tips: newTips });
                }}
              />
            </li>
          ))}
        </ul>
        <CommentForm
          onSubmit={(content) => {
            const newTips = [...tips, content];
            setRecipe({ ...recipe, tips: newTips });
          }}
        />
      </section>
    </div>
  );
}
