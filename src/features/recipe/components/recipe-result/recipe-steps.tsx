import { BlurFade } from "@/components/ui/blur-fade";

import { Step } from "../../models/recipe";

interface RecipeStepsProps {
  steps: Step[];
}

const RecipeSteps = ({ steps }: RecipeStepsProps) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4">
      <BlurFade>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          조리 방법
        </h3>
        <ol className="mt-2 space-y-3">
          {steps.map((step, index) => (
            <BlurFade key={index} delay={index * 0.1} direction="up">
              <li className="flex gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {index + 1}
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
              </li>
            </BlurFade>
          ))}
        </ol>
      </BlurFade>
    </div>
  );
};

export default RecipeSteps;
