import { TextShimmer } from "@/components/ui/text-shimmer";

import RecipeSkeleton from "@/features/recipe/components/detail/recipe-skeleton";

interface RecipeLoadingStateProps {
  isGenerating: boolean;
  isScriptLoading: boolean;
  showResult: boolean;
}

const RecipeLoadingState = ({
  isGenerating,
  isScriptLoading,
  showResult,
}: RecipeLoadingStateProps) => {
  if (!isGenerating) return null;

  return (
    <>
      <TextShimmer className="text-xs" spread={5}>
        {isScriptLoading ? "스크립트 가져오는 중..." : "레시피 생성 중..."}
      </TextShimmer>
      {!showResult && <RecipeSkeleton />}
    </>
  );
};

export default RecipeLoadingState;
