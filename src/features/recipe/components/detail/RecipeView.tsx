"use client";

import Image from "next/image";

import useImgSrc from "@/features/recipe/hooks/useImgSrc";
import { getVideoId } from "@/features/recipe/libs/utils";
import { Recipe } from "@/features/recipe/models/recipe";

interface Props {
  recipe: Recipe;
}

const sectionStyle = "flex flex-col gap-3 bg-background p-4";

export default function RecipeView({
  recipe: { title, url, description, ingredients, steps, tips },
}: Props) {
  const { imgSrc, handleImageError } = useImgSrc({
    url:
      url && `https://img.youtube.com/vi/${getVideoId(url)}/maxresdefault.jpg`,
    fallbackImg: "/images/placeholder.png",
  });

  return (
    <div className="flex flex-col gap-3">
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          <Image
            src={imgSrc}
            alt={title}
            width={500}
            height={300}
            onError={handleImageError}
          />
        </a>
      )}
      <section className={sectionStyle}>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description || ""}</p>
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {ingredients.map(({ name, amount }, i) => (
            <li key={i}>{`${name} ${amount || ""}`}</li>
          ))}
        </ul>
      </section>
      <section className={sectionStyle}>
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {steps.map(({ description }, i) => (
            <li key={i}>{`${i + 1}. ${description}`}</li>
          ))}
        </ul>
      </section>
      {!!tips && (
        <section className={sectionStyle}>
          <h3 className="text-xl font-semibold">Tips</h3>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
