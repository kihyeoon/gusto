import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: Props) {
  const [content, setContent] = useState("");
  
  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex w-full">
      <Textarea
        className="resize-none pr-12"
        placeholder="글을 입력해주세요."
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="글"
      />
      <Button
        type="button"
        className="absolute right-3 top-1/2 size-8 -translate-y-1/2 p-0"
        disabled={!content}
        onClick={handleSubmit}
        aria-label="글 작성"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
