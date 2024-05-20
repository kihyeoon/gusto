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
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const paths = urlObj.pathname.split("/");

  if (domain === "youtu.be") {
    // 공유 링크인 경우
    return paths[1];
  } else if (paths[1] === "shorts") {
    // https://www.youtube.com/shorts/ASD123ZXC 처럼 shorts인 경우
    return paths[2];
  }
  return getQueryParam(urlObj, "v");
};
