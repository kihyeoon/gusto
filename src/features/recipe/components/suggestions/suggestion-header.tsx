import { RefreshButton } from "@/components/ui/refresh-button";

interface SuggestionHeaderProps {
  isLoading: boolean;
  onRefresh: (e: React.MouseEvent) => void;
}

const SuggestionHeader = ({ isLoading, onRefresh }: SuggestionHeaderProps) => (
  <>
    <div className="flex items-center justify-between">
      <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
        추천 레시피 영상
      </h3>
      <RefreshButton isLoading={isLoading} onClick={onRefresh} size="md" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      영상을 선택하면 레시피를 요약해 드릴게요.
    </p>
  </>
);

export default SuggestionHeader;
