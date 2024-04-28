import Image from "next/image";
import Link from "next/link";

import { ListItemMotion } from "@/components/recipes/ListItemMotion";

import { RecipePreview } from "@/models/recipe";

import { getVideoId } from "@/lib/utils";

export default function RecipeList({ recipes }: { recipes: RecipePreview[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {recipes.map(({ id, title, tags, url }, index) => (
        <ListItemMotion key={id}>
          <Link href={`/recipe/${id}`} className="w-full">
            <li className="flex cursor-pointer items-center gap-3">
              <div className="w-5 text-center font-semibold">{index + 1}</div>
              {url ? (
                <Image
                  className="aspect-square rounded-full border border-primary  object-cover"
                  src={`https://img.youtube.com/vi/${getVideoId(url)}/mqdefault.jpg`}
                  alt={title}
                  width={48}
                  height={48}
                />
              ) : (
                <div className="size-12 rounded-full border border-primary bg-secondary"></div>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <h3
                  className="truncate text-lg font-semibold"
                  aria-label={title}
                >
                  {title}
                </h3>
                <div className="flex gap-1">
                  {tags.map((tag) => (
                    <span key={tag} className="text-sm text-gray-500">
                      {`#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          </Link>
          <div className="absolute right-[-40px] top-1/2 size-5 -translate-y-1/2 transform bg-red-400"></div>
        </ListItemMotion>
      ))}
    </ul>
  );
}
