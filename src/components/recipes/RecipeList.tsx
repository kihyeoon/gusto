import { RecipePreview } from "@/models/recipe";
import Link from "next/link";

export default function RecipeList({ recipes }: { recipes: RecipePreview[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {recipes.map((recipe, index) => (
        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
          <li className="flex cursor-pointer items-center gap-3">
            <div className="font-semibold">{index + 1}</div>
            <div className="size-10 rounded-full border border-primary"></div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <div className="flex gap-1">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="text-sm text-gray-500">
                    {`#${tag}`}
                  </span>
                ))}
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
