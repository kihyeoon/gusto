"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import RecipeSkeleton from "@/components/RecipeSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { type Script } from "@/app/api/recipe/video/[id]/route";

export default function VideoRecipe() {
  const [videoId, setVideoId] = useState("");
  const [recipe, setRecipe] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const script = await fetch(`/api/recipe/video/${videoId}`).then((res) =>
      res.json(),
    );

    const recipe = await fetch(`/api/recipe/ai`, {
      method: "POST",
      body: JSON.stringify({
        script: script.map((s: Script) => s.text).join("\n"),
      }),
    })
      .then((res) => res.json())
      .then((steps: string) =>
        steps.split("\n").filter((line) => line.trim() !== ""),
      );

    setRecipe(recipe);
    setLoading(false);
  };

  const isReady = !loading && recipe.length > 0;

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex w-full items-center justify-center gap-3">
        <Input
          className="w-full"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
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
      {loading && <RecipeSkeleton />}
      <ul>
        {isReady &&
          recipe.map((step, index) => (
            <div key={index} className="">
              {step}
            </div>
          ))}
      </ul>
    </div>
  );
}
