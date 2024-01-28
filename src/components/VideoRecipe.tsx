"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface script {
  offset: number;
  text: string;
}

export default function VideoRecipe() {
  const [videoId, setVideoId] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");

  const handleClick = async () => {
    const script = await fetch(`/api/recipe/video/${videoId}`).then((res) =>
      res.json(),
    );

    const recipe = await fetch(
      `/api/recipe/ai/${script.map((s: script) => s.text).join("\n")}`,
    ).then((res) => res.json());

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
      {recipe && <p>{recipe}</p>}
    </div>
  );
}
