"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import RecipeSkeleton from "@/components/RecipeSkeleton";
import RecipeEdit from "@/components/recipe/RecipeEdit";
import RecipeView from "@/components/recipe/RecipeView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { type Script } from "@/app/api/recipe/script/route";

import { getQueryParam } from "@/lib/utils";

export interface Recipe {
  title: string;
  ingredients: string[];
  body: string[];
  tips: string[];
}

export default function VideoRecipe() {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const script = await fetch(
      `/api/recipe/script?videoId=${getQueryParam(url, "v")}`,
    ).then((res) => res.json());

    const recipe = await fetch(`/api/recipe/ai`, {
      method: "POST",
      body: JSON.stringify({
        script: script.map((s: Script) => s.text).join("\n"),
      }),
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res));

    setRecipe(recipe);

    //////////// For testing
    // setRecipe({
    //   title: "일본식 곰곰 왕 교자 만들기",
    //   ingredients: ["밀가루 30g", "식용유 100g", "물 100g", "대파", "간장"],
    //   body: [
    //     "밀가루, 식용유, 물을 넣어 묽은 반죽을 만든다.",
    //     "팬에 기름을 두르고 교자를 튀긴다. 중불로 아랫면을 바삭하게 구워준다.",
    //     "익은 바닥에 반죽을 조금씩 넣고 튀김 모양을 만든 후 대파를 곁들인다.",
    //     "뚜껑을 덮고 속까지 잘 익혀 완성한다. 접시에 담아 서빙한다.",
    //   ],
    //   tips: [
    //     "교자를 튀길 때 뒤집지 말고 아랫면을 바삭하게 구워준다.",
    //     "대파를 곁들여 풍미를 증진시킨다.",
    //     "간장과 함께 곁들여 먹으면 더 맛있게 즐길 수 있다.",
    //   ],
    // });
    ////////////

    setLoading(false);
  };

  const isReady = !loading && recipe;

  return (
    <div className="flex w-full flex-col gap-7">
      {isReady ? (
        isEditMode ? (
          <Button
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            View
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            Edit
          </Button>
        )
      ) : (
        <div className="flex w-full items-center justify-center gap-3">
          <Input
            className="w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a YouTube video URL"
          />
          <Button onClick={handleClick} disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                please wait
              </>
            ) : (
              "Create Recipe"
            )}
          </Button>
        </div>
      )}
      {loading && <RecipeSkeleton />}
      {isReady &&
        (isEditMode ? (
          <RecipeEdit recipe={recipe} setRecipe={setRecipe} />
        ) : (
          <RecipeView recipe={recipe} />
        ))}
    </div>
  );
}
