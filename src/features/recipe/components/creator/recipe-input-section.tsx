import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import RecipeSuggestions from "../suggestions/recipe-suggestions";

interface RecipeInputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  createRecipe: (url: string) => void;
  isGenerating: boolean;
  handleSelectVideo: (videoUrl: string) => void;
}

const RecipeInputSection = ({
  url,
  setUrl,
  createRecipe,
  isGenerating,
  handleSelectVideo,
}: RecipeInputSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isGenerating && url) {
      createRecipe(url);
    }
  };

  return (
    <div className="mt-auto">
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
        어떤 레시피를 알고 싶으세요?
      </h2>
      <div className="relative rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center py-2">
          <Input
            ref={inputRef}
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="YouTube URL을 입력하세요"
            disabled={isGenerating}
          />
          <Button
            onClick={() => createRecipe(url)}
            disabled={!url || isGenerating}
            className="mr-1 rounded-full p-2"
            variant="ghost"
            aria-label="레시피 생성"
          >
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      <RecipeSuggestions
        onSelectVideo={handleSelectVideo}
        isLoading={isGenerating}
      />
    </div>
  );
};

export default RecipeInputSection;
