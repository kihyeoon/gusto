import { RefreshCw } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";

interface RefreshButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  title?: string;
  className?: string;
}

const RefreshButton = ({
  isLoading = false,
  size = "md",
  title = "새로고침",
  className,
  onClick,
  ...props
}: RefreshButtonProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(sizeClasses[size], "rounded-full", className)}
      onClick={onClick}
      disabled={isLoading || props.disabled}
      title={title}
      {...props}
    >
      <RefreshCw
        className={cn(
          iconSizes[size],
          "text-gray-500 dark:text-gray-400",
          isLoading && "animate-spin",
        )}
      />
      <span className="sr-only">{title}</span>
    </Button>
  );
};

export { RefreshButton };
