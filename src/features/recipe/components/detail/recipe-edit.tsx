"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import CommentForm from "@/features/recipe/components/detail/comment-form";
import useRecipes from "@/features/recipe/hooks/use-recipes";
import {
  RecipeFormData,
  recipeFormSchema,
} from "@/features/recipe/libs/schemas/recipe-form";
import { Recipe } from "@/features/recipe/models/recipe";

interface Props {
  recipe: Recipe;
  onSaveSuccess: (updatedRecipe?: Recipe) => void;
  onCancel: () => void;
}

const sectionStyle = "flex flex-col gap-3 bg-background p-4";

export default function RecipeEdit({ recipe, onSaveSuccess, onCancel }: Props) {
  const { updateRecipe, isUpdatingRecipe } = useRecipes();

  // Recipe를 RecipeFormData로 변환
  const recipeToFormData = (recipe: Recipe): RecipeFormData => ({
    title: recipe.title,
    url: recipe.url || "",
    description: recipe.description || "",
    ingredients:
      recipe.ingredients.length > 0
        ? recipe.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
          }))
        : [{ name: "", amount: "" }],
    steps:
      recipe.steps.length > 0
        ? recipe.steps.map((step) => ({ description: step.description }))
        : [{ description: "" }],
    tips: recipe.tips || [],
    tags: recipe.tags || [],
  });

  // FormData를 Recipe로 변환
  const formDataToRecipe = (formData: RecipeFormData): Recipe => ({
    ...recipe,
    title: formData.title,
    url: formData.url || null,
    description: formData.description || null,
    ingredients: formData.ingredients.filter((ing) => ing.name.trim() !== ""),
    steps: formData.steps.filter((step) => step.description.trim() !== ""),
    tips: formData.tips.filter((tip) => tip.trim() !== ""),
    tags: formData.tags.filter((tag) => tag.trim() !== ""),
  });

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: recipeToFormData(recipe),
    mode: "onChange",
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const { watch, setValue } = form;
  const currentTips = watch("tips");

  const onSubmit = (data: RecipeFormData) => {
    const updatedRecipe = formDataToRecipe(data);
    updateRecipe(updatedRecipe, {
      onSuccess: (savedRecipe) => {
        onSaveSuccess(savedRecipe || updatedRecipe);
      },
    });
  };

  const handleAddStep = (content: string) => {
    appendStep({ description: content });
  };

  const handleAddTip = (content: string) => {
    const newTips = [...currentTips, content];
    setValue("tips", newTips);
  };

  const handleRemoveTip = (index: number) => {
    const newTips = currentTips.filter((_, i) => i !== index);
    setValue("tips", newTips);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      {/* 제목 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">제목</h3>
        <div className="space-y-1">
          <Textarea
            {...form.register("title")}
            className="resize-none text-2xl font-bold"
            rows={1}
            placeholder="레시피 제목을 입력하세요"
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
      </section>

      {/* URL 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">URL</h3>
        <div className="space-y-1">
          <Input
            {...form.register("url")}
            placeholder="레시피 영상 URL (선택사항)"
          />
          {form.formState.errors.url && (
            <p className="text-sm text-red-500">
              {form.formState.errors.url.message}
            </p>
          )}
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">소개</h3>
        <div className="space-y-1">
          <Textarea
            {...form.register("description")}
            className="resize-none"
            rows={3}
            placeholder="레시피에 대한 간단한 소개를 입력하세요 (선택사항)"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
      </section>

      {/* 재료 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">재료</h3>
        <div className="space-y-2">
          <ul className="flex flex-col gap-2">
            {ingredientFields.map((field, index) => (
              <li key={field.id} className="relative flex gap-2">
                <div className="flex-1">
                  <Input
                    {...form.register(`ingredients.${index}.name`)}
                    placeholder="재료명"
                  />
                  {form.formState.errors.ingredients?.[index]?.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.ingredients[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    {...form.register(`ingredients.${index}.amount`)}
                    placeholder="용량 (선택사항)"
                  />
                </div>
                {ingredientFields.length > 1 && (
                  <DeleteButton
                    className="absolute -right-1 -top-1"
                    onClick={() => removeIngredient(index)}
                  />
                )}
              </li>
            ))}
          </ul>
          {form.formState.errors.ingredients && (
            <p className="text-sm text-red-500">
              {form.formState.errors.ingredients.message}
            </p>
          )}
          <Button
            type="button"
            onClick={() => appendIngredient({ name: "", amount: "" })}
            variant="outline"
          >
            재료 추가
          </Button>
        </div>
      </section>

      {/* 요리 순서 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <div className="space-y-2">
          <ul className="flex flex-col gap-2">
            {stepFields.map((field, index) => (
              <li key={field.id} className="relative">
                <div className="flex items-start gap-2">
                  <span className="mt-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <Textarea
                      {...form.register(`steps.${index}.description`)}
                      className="resize-none"
                      rows={2}
                      placeholder={`${index + 1}번째 조리 순서를 입력하세요`}
                    />
                    {form.formState.errors.steps?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">
                        {
                          form.formState.errors.steps[index]?.description
                            ?.message
                        }
                      </p>
                    )}
                  </div>
                </div>
                {stepFields.length > 1 && (
                  <DeleteButton
                    className="absolute -right-1 -top-1"
                    onClick={() => removeStep(index)}
                  />
                )}
              </li>
            ))}
          </ul>
          {form.formState.errors.steps && (
            <p className="text-sm text-red-500">
              {form.formState.errors.steps.message}
            </p>
          )}
          <CommentForm onSubmit={handleAddStep} />
        </div>
      </section>

      {/* Tips 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">Tips</h3>
        <div className="space-y-2">
          {currentTips.length > 0 && (
            <ul className="flex flex-col gap-2">
              {currentTips.map((tip, index) => (
                <li key={index} className="relative">
                  <Textarea
                    {...form.register(`tips.${index}`)}
                    className="resize-none"
                    rows={2}
                    placeholder="요리 팁을 입력하세요"
                    defaultValue={tip}
                  />
                  <DeleteButton
                    className="absolute -right-1 -top-1"
                    onClick={() => handleRemoveTip(index)}
                  />
                </li>
              ))}
            </ul>
          )}
          <CommentForm onSubmit={handleAddTip} />
        </div>
      </section>

      {/* 폼 액션 버튼들 */}
      <div className="sticky bottom-0 flex gap-2 border-t bg-background p-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isUpdatingRecipe}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isUpdatingRecipe || !form.formState.isValid}
          className="flex-1"
        >
          {isUpdatingRecipe ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  );
}
