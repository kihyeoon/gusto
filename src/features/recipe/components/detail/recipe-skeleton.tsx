import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[70px]" />
      <Skeleton className="h-4 w-[60px]" />
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[70px]" />
      <Skeleton className="h-4 w-[60px]" />
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[350px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[350px]" />
    </div>
  );
}
