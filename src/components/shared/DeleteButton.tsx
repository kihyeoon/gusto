import { MinusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface Props {
  onDelete: () => void;
  className?: string;
}

export default function DeleteButton({ onDelete, className }: Props) {
  return (
    <Button
      className={`size-4 rounded-full p-0 ${className}`}
      variant="destructive"
      onClick={onDelete}
    >
      <MinusIcon className="size-3" />
    </Button>
  );
}
