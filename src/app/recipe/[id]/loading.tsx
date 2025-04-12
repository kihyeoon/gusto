import RecipeSkeleton from "@/features/recipe/components/detail/recipe-skeleton";

export default function Loading() {
  return (
    <div className="size-full px-4 py-4">
      <RecipeSkeleton />
    </div>
  );
}
