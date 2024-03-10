import { Recipe, RecipePreview } from "@/models/recipe";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { type Script } from "@/app/api/recipes/script/route";

import { getQueryParam } from "@/lib/utils";

export default function useRecipes() {
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createRecipe = async (url: string) => {
    setLoading(true);

    try {
      const script = await fetch(
        `/api/recipes/script?videoId=${getQueryParam(url, "v")}`,
      ).then((res) => res.json());

      const recipe = await fetch(`/api/recipes/ai`, {
        method: "POST",
        body: JSON.stringify({
          script: script.map((s: Script) => s.text).join("\n"),
          url,
        }),
      }).then((res) => res.json());

      // /recipe/${recipe._id} 로 이동
      router.push(`/recipe/${recipe._id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
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

  return { recipes, listLoading, recipe, loading, createRecipe };
}
