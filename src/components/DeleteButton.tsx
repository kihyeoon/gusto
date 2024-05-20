import { MinusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function DeleteButton({ className, ...props }: Props) {
  return (
    <Button
      className={`size-4 rounded-full p-0 ${className}`}
      variant="destructive"
      {...props}
    >
      <MinusIcon className="size-3" />
    </Button>
  );
}
