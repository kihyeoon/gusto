import { Button } from "@/components/ui/button";

interface RecipeHeaderProps {
  title: string;
  isGenerating: boolean;
  onStop: () => void;
  onEditClick?: () => void;
}

const RecipeHeader = ({
  title,
  isGenerating,
  onStop,
  onEditClick,
}: RecipeHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {title || "레시피"}
      </h2>
      <div className="flex gap-2">
        {isGenerating && (
          <Button variant="destructive" size="sm" onClick={onStop}>
            중지하기
          </Button>
        )}
        {!isGenerating && onEditClick && (
          <Button variant="outline" size="sm" onClick={onEditClick}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecipeHeader;
