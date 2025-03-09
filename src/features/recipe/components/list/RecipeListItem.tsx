"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";

import useImgSrc from "@/features/recipe/hooks/useImgSrc";
import { deleteRecipePrompt } from "@/features/recipe/libs/constants";
import { getVideoId } from "@/features/recipe/libs/utils";
import { RecipePreview } from "@/features/recipe/models/recipe";

interface Props {
  recipe: RecipePreview;
  index: number;
  isTouchDevice: boolean;
  deleteRecipe: (id: string) => void;
  navigateToRecipe: (id: string) => void;
}

export const RecipeListItem = ({
  recipe: { id, title, tags, url },
  index,
  isTouchDevice,
  deleteRecipe,
  navigateToRecipe,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const { imgSrc, handleImageError } = useImgSrc({
    url: url && `https://img.youtube.com/vi/${getVideoId(url)}/mqdefault.jpg`,
    fallbackImg: "/images/placeholder.png",
  });

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsHovered(false);
  };

  return (
    <>
      <li
        className="flex cursor-pointer items-center gap-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex flex-1 items-center gap-3"
          onClick={() => navigateToRecipe(id)}
        >
          <div className="w-5 text-center font-semibold">{index + 1}</div>
          {url ? (
            <Image
              className="aspect-square rounded-full border border-primary object-cover"
              src={imgSrc}
              alt={title}
              width={48}
              height={48}
              onError={handleImageError}
            />
          ) : (
            <div className="size-12 rounded-full border border-primary bg-secondary" />
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
        </div>
        {!isTouchDevice && isHovered && (
          <ConfirmDialog
            trigger={
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <DeleteButton></DeleteButton>
              </motion.div>
            }
            handleAction={() => {
              deleteRecipe(id);
              setIsHovered(false);
            }}
            handleCancel={() => setIsHovered(false)}
            {...deleteRecipePrompt}
          />
        )}
      </li>

      <ConfirmDialog
        trigger={
          <Button
            className="absolute right-[-96px] top-1/2 flex h-full w-20 -translate-y-1/2"
            variant="destructive"
          >
            지우기
          </Button>
        }
        handleAction={() => deleteRecipe(id)}
        {...deleteRecipePrompt}
      />
    </>
  );
};
