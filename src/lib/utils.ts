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

export const getVideoId = (url: string) => {
  // https://www.youtube.com/shorts/ASD123ZXC 처럼 shorts가 첫 번째 path인 경우 처리
  const urlObj = new URL(url);
  const paths = urlObj.pathname.split("/");
  if (paths[1] === "shorts") {
    return paths[2];
  }
  return getQueryParam(urlObj, "v");
};
