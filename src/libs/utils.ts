import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryParam = (url: string | URL, key: string) => {
  if (typeof url === "string") {
    url = new URL(url);
  }
  return url.searchParams.get(key);
};
