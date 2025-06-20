"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";

import TextHighlight from "@/features/recipe/components/list/text-highlight";
import useImgSrc from "@/features/recipe/hooks/use-img-src";
import { deleteRecipePrompt } from "@/features/recipe/libs/constants";
import { getThumbnailUrl, getVideoId } from "@/features/recipe/libs/utils";
import { RecipePreview } from "@/features/recipe/models/recipe";

import { cloudFrontLoader } from "@/libs/cloudfront-loader";

interface Props {
  recipe: RecipePreview;
  index: number;
  isTouchDevice: boolean;
  deleteRecipe: (id: string) => void;
  navigateToRecipe: (id: string) => void;
  searchTerm?: string;
}

export const RecipeListItem = ({
  recipe: { id, title, tags, url, thumbnailUrl },
  index,
  isTouchDevice,
  deleteRecipe,
  navigateToRecipe,
  searchTerm = "",
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const youtubeThumnail = thumbnailUrl || getThumbnailUrl(url || "");

  const { imgSrc, handleImageError } = useImgSrc({
    url: youtubeThumnail,
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
          {thumbnailUrl || url ? (
            <Image
              className="aspect-square rounded-full border border-primary object-cover"
              src={imgSrc}
              alt={title}
              width={48}
              height={48}
              onError={handleImageError}
              loader={cloudFrontLoader}
            />
          ) : (
            <div className="size-12 rounded-full border border-primary bg-secondary" />
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="truncate text-lg font-semibold" aria-label={title}>
              <TextHighlight text={title} searchTerm={searchTerm} />
            </h3>
            <div className="flex gap-1">
              {tags.map((tag) => (
                <span key={tag} className="text-sm text-gray-500">
                  #<TextHighlight text={tag} searchTerm={searchTerm} />
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
