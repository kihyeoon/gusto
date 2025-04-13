import { Skeleton } from "@/components/ui/skeleton";

interface SuggestionSkeletonProps {
  count?: number;
}

const SuggestionSkeleton = ({ count = 5 }: SuggestionSkeletonProps) => (
  <div className="grid gap-3">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-md p-2">
        <Skeleton className="h-20 w-36 flex-shrink-0 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default SuggestionSkeleton;
