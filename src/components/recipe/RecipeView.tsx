"use client";

import { Recipe } from "@/models/recipe";
import Image from "next/image";

import { getQueryParam } from "@/lib/utils";

interface Props {
  recipe: Recipe;
}

export default function RecipeView({
  recipe: { title, url, description, ingredients, steps, tips },
}: Props) {
  url && console.log(getQueryParam(url, "v"));
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">썸네일</h3>
        {url && (
          <a href={url} target="_blank" rel="noreferrer">
            <Image
              src={`https://img.youtube.com/vi/${getQueryParam(url, "v")}/maxresdefault.jpg`}
              alt={title}
              width={500}
              height={300}
            />
          </a>
        )}
        {description && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">소개</h3>
            <p>{description}</p>
          </div>
        )}
        <h3 className="text-xl font-semibold">재료</h3>
        <ul className="flex flex-col gap-2">
          {ingredients.map(({ name, amount }, i) => (
            <li key={i}>{`${name} ${amount || ""}`}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">요리 순서</h3>
        <ul className="flex flex-col gap-2">
          {steps.map(({ description }, i) => (
            <li key={i}>{`${i + 1}. ${description}`}</li>
          ))}
        </ul>
      </div>
      {!!tips && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Tips</h3>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
