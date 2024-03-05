import { RecipePreview } from "@/models/recipe";

export default function RecipeList({ recipes }: { recipes: RecipePreview[] }) {
  const handleRecipeClick = async (recipe: RecipePreview) => {
    const res = await fetch(`/api/recipes/${recipe.id}`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <ul className="flex flex-col gap-4">
      {recipes.map((recipe, index) => (
        <li
          key={recipe.id}
          className="flex cursor-pointer items-center gap-3"
          onClick={() => handleRecipeClick(recipe)}
        >
          <div className="font-semibold">{index + 1}</div>
          <div className="size-10 rounded-full border border-black"></div>
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
      ))}
    </ul>
  );
}
