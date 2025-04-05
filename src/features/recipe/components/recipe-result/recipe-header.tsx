import { Button } from "@/components/ui/button";

interface RecipeHeaderProps {
  title: string;
  isGenerating: boolean;
  onStop: () => void;
}

const RecipeHeader = ({ title, isGenerating, onStop }: RecipeHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {title || "레시피"}
      </h2>
      {isGenerating && (
        <Button variant="destructive" size="sm" onClick={onStop}>
          중지하기
        </Button>
      )}
    </div>
  );
};

export default RecipeHeader;
