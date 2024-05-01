import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import { Recipe, RecipePreview } from "@/models/recipe";

import { type Script } from "@/app/api/recipes/script/route";

import { getVideoId } from "@/lib/utils";

export default function useRecipes() {
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const userId = useSession().data?.user?.id;
  const { toast } = useToast();

  const createRecipe = async (url: string) => {
    try {
      setLoading(true);

      const script: Script[] = await fetch(
        `/api/recipes/script?videoId=${getVideoId(url)}`,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });

      const recipe: Recipe = await fetch(`/api/recipes/ai`, {
        method: "POST",
        body: JSON.stringify({
          script: script.map((s) => s.text).join("\n"),
          url,
          userId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
          return res;
        })
        .catch((err) => {
          throw new Error(err);
        });

      router.push(`/recipe/${recipe._id}`);
    } catch (error) {
      if (!(error instanceof Error)) return;

      const { message } = error;
      console.error(message);

      if (message.includes("Invalid URL")) {
        toast({
          title: "올바르지 않은 URL입니다.",
          description:
            "자막이 사용 가능한 YouTube 요리 영상의 URL을 입력해주세요.",
        });
      } else if (message.includes("No recipe found")) {
        toast({
          title: "레시피를 찾을 수 없습니다.",
          description: "요리와 관련된 영상의 URL을 입력해주세요.",
        });
      } else {
        toast({
          title: "레시피 생성에 실패했습니다.",
          description: "다시 시도해주세요.",
        });
      }

      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    try {
      await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setListLoading(true);

        const recipes: RecipePreview[] = await fetch("/api/recipes").then(
          (res) => res.json(),
        );

        setRecipes(recipes);
        setListLoading(false);
      } catch (error) {
        console.error(error);
        setListLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, listLoading, loading, createRecipe, deleteRecipe };
}
