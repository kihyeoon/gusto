import { MinusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: () => void;
}

export default function TextContent({ value, onChange, onDelete }: Props) {
  return (
    <div className="relative">
      <Textarea
        className="resize-none"
        rows={1}
        value={value}
        onChange={onChange}
      />
      <Button
        className="absolute -right-1 -top-1 size-4 rounded-full p-0"
        variant="destructive"
        onClick={onDelete}
      >
        <MinusIcon className="size-3" />
      </Button>
    </div>
  );
}
