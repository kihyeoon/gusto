"use client";

import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { RefreshButton } from "@/components/ui/refresh-button";
import { Skeleton } from "@/components/ui/skeleton";

import useSuggestions from "@/features/recipe/hooks/useSuggestions";

interface SuggestionsProps {
  onSelectVideo: (url: string) => void;
  isLoading: boolean;
}

const RecipeSuggestions = ({ onSelectVideo, isLoading }: SuggestionsProps) => {
  const {
    suggestions,
    isLoading: suggestionsLoading,
    error,
    refetch,
  } = useSuggestions();

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    refetch();
  };

  return (
    <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
          추천 레시피 영상
        </h3>
        <RefreshButton 
          isLoading={suggestionsLoading}
          onClick={handleRefresh}
          size="md"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        영상을 선택하면 레시피를 요약해 드릴게요.
      </p>

      {suggestionsLoading ? (
        <div className="grid gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md p-2">
              <Skeleton className="h-20 w-36 flex-shrink-0 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error instanceof Error
            ? error.message
            : "추천 레시피를 가져오는 중 오류가 발생했습니다"}
        </div>
      ) : (
        <div className="grid gap-3">
          {suggestions.map((video, index) => (
            <BlurFade
              key={video.id}
              delay={index * 0.1}
              direction="up"
              blur="4px"
              className="w-full"
            >
              <Button
                variant="ghost"
                className="group h-auto w-full overflow-hidden rounded-lg p-0 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() =>
                  onSelectVideo(`https://www.youtube.com/watch?v=${video.id}`)
                }
                disabled={isLoading}
              >
                <div className="flex w-full items-center gap-3 p-2">
                  <div className="flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={144}
                      height={80}
                      className="h-20 w-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-[1_1_0] text-left">
                    <p className="line-clamp-2 whitespace-normal break-words break-keep text-sm font-medium text-gray-800 dark:text-gray-200">
                      {video.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {video.channelTitle}
                    </p>
                  </div>
                </div>
              </Button>
            </BlurFade>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSuggestions;
