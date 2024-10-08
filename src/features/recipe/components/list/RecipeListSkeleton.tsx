import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <div className="flex items-center gap-3" key={index}>
          <div className="w-5 text-center font-semibold">{index + 1}</div>
          <Skeleton className="size-12 rounded-full" />
          <div className="flex h-full flex-1 flex-col justify-between gap-1">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
