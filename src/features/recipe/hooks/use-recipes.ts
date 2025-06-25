import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "@/features/recipe/apis/client";
import {
  RECIPE_QUERY_KEY,
  errorMessages,
} from "@/features/recipe/libs/constants";
import { Recipe, RecipePreview } from "@/features/recipe/models/recipe";

import { ApiException, CustomException } from "@/libs/exceptions";

export default function useRecipes() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recipes, isLoading } = useQuery({
    queryKey: RECIPE_QUERY_KEY,
    queryFn: getRecipes,
    staleTime: 10 * 1000,
  });

  const createRecipeMutation = useMutation({
    mutationFn: (url: string) => createRecipe(url, userId),
    onSuccess: (recipe) => {
      router.push(`/recipe/${recipe._id}`);
      return queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
    onError: (error: unknown) => {
      if (error instanceof ApiException) {
        const { message, description } = error;
        toast({
          title: message,
          description,
        });
      } else if (error instanceof CustomException) {
        toast({
          title: error.message,
        });
      }

      console.error(error);
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
        title: errorMessages.CANNOT_DELETE_RECIPE.message,
        description: errorMessages.CANNOT_DELETE_RECIPE.description,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_QUERY_KEY });
    },
  });

  const updateRecipeMutation = useMutation({
    mutationFn: (recipe: Recipe) => updateRecipe(recipe),
    onSuccess: (updatedRecipe) => {
      // 캐시 업데이트
      queryClient.setQueryData(
        RECIPE_QUERY_KEY,
        (prevRecipes: RecipePreview[] | undefined) =>
          prevRecipes?.map((recipe) =>
            recipe.id === updatedRecipe.id
              ? { 
                  ...recipe, 
                  title: updatedRecipe.title,
                  description: updatedRecipe.description,
                  tags: updatedRecipe.tags,
                  url: updatedRecipe.url,
                  thumbnailUrl: updatedRecipe.thumbnailUrl
                }
              : recipe
          )
      );
      
      toast({
        title: "레시피가 성공적으로 수정되었습니다.",
      });
    },
    onError: (error: unknown) => {
      console.error("레시피 수정 중 오류 발생:", error);
      toast({
        title: "레시피 수정에 실패했습니다.",
        description: "다시 시도해주세요.",
      });
    },
  });

  return {
    recipes,
    isLoading,
    isCreatingRecipe: createRecipeMutation.isPending,
    createRecipe: createRecipeMutation.mutate,
    deleteRecipe: deleteRecipeMutation.mutate,
    isUpdatingRecipe: updateRecipeMutation.isPending,
    updateRecipe: updateRecipeMutation.mutate,
  };
}
