"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DeleteButton from "@/components/DeleteButton";

import { RecipePreview } from "@/features/recipe/models/recipe";

import { getVideoId } from "@/libs/utils";

interface Props {
  recipe: RecipePreview;
  index: number;
  deleteRecipe: (id: string) => void;
}

export const RecipeListItem = ({
  recipe: { id, title, tags, url },
  index,
  deleteRecipe,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <>
      <li
        className="flex cursor-pointer items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/recipe/${id}`)}
      >
        <div className="w-5 text-center font-semibold">{index + 1}</div>
        {url ? (
          <Image
            className="aspect-square rounded-full border border-primary  object-cover"
            src={`https://img.youtube.com/vi/${getVideoId(url)}/mqdefault.jpg`}
            alt={title}
            width={48}
            height={48}
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.png";
            }}
          />
        ) : (
          <div className="size-12 rounded-full border border-primary bg-secondary"></div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-lg font-semibold" aria-label={title}>
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
        {isHovered && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                deleteRecipe(id);
              }}
            ></DeleteButton>
          </motion.div>
        )}
      </li>

      <button
        className="absolute right-[-96px] top-1/2 flex h-full w-20 -translate-y-1/2 transform items-center justify-center bg-destructive text-white"
        onClick={() => deleteRecipe(id)}
      >
        지우기
      </button>
    </>
  );
};
