import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import { createRecipe, deleteRecipe, getRecipes } from "@/features/recipe/apis";
import { RecipePreview } from "@/features/recipe/models/recipe";

import { ApiException } from "@/libs/exceptions";

const RECIPE_QUERY_KEY = ["recipes"] as const;

export default function useRecipes() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recipes, isLoading } = useQuery({
    queryKey: RECIPE_QUERY_KEY,
    queryFn: getRecipes,
  });

  const createRecipeMutation = useMutation({
    mutationFn: (url: string) => createRecipe(url, userId),
    onSuccess: (recipe) => {
      router.push(`/recipe/${recipe._id}`);
      return queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
    onError: ({ message, description }: ApiException) => {
      toast({
        title: message,
        description,
      });

      console.error(message, description);
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: RECIPE_QUERY_KEY });
      const previousRecipes =
        queryClient.getQueryData<RecipePreview[]>(RECIPE_QUERY_KEY);

      queryClient.setQueryData(
        RECIPE_QUERY_KEY,
        previousRecipes?.filter((recipe) => recipe.id !== id),
      );

      return { previousRecipes };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(RECIPE_QUERY_KEY, context?.previousRecipes);
      toast({
        title: "레시피 삭제에 실패했습니다.",
        description: "다시 시도해주세요.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
  });

  return {
    recipes,
    isLoading,
    isCreatingRecipe: createRecipeMutation.isPending,
    createRecipe: createRecipeMutation.mutate,
    deleteRecipe: deleteRecipeMutation.mutate,
  };
}
