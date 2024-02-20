import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryParam = (url: string, key: string) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key);
};
