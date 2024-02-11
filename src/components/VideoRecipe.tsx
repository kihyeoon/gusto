"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VideoRecipe() {
  const [videoId, setVideoId] = useState<string>("");
  const [recipe, setRecipe] = useState<string[]>([]);

  const handleClick = async () => {
    const recipe = await fetch(`/api/recipe/video/${videoId}`)
      .then((res) => res.json())
      .then((steps: string) =>
        steps.split("\n").filter((line) => line.trim() !== ""),
      );
    console.log(recipe);
    setRecipe(recipe);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex w-96 items-center justify-center gap-3">
        <Input
          className="w-full"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter a YouTube video URL"
        />
        <Button onClick={handleClick}>Submit</Button>
      </div>
      <ul>
        {recipe &&
          recipe.map((step, index) => (
            <div key={index} className="text-lg">
              {step}
            </div>
          ))}
      </ul>
    </div>
  );
}
