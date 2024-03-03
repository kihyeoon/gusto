import { Recipe } from "@/models/recipe";
import { useEffect, useState } from "react";

export default function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const recipes: Recipe[] = await fetch("/api/recipes").then((res) =>
          res.json(),
        );

        setRecipes(recipes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading };
}
