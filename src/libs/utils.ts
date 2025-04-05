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

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 두 객체를 깊게 비교하는 함수
 */
export function isDeepEqualData(a: any, b: any): boolean {
  if (a === b) return true;

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isDeepEqualData(a[i], b[i])) return false;
      }
      return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!isDeepEqualData(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

/**
 * 배열을 무작위로 섞는 함수
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * 배열에서 랜덤하게 n개 요소 선택
 */
export const getRandomItems = <T>(array: T[], count: number): T[] =>
  array.length <= count ? [...array] : shuffleArray([...array]).slice(0, count);

/**
 * 배열에서 중복 요소 제거
 */
export const removeDuplicates = <T>(array: T[]): T[] => [...new Set(array)];

/**
 * 문자열 배열을 OR 연산자(|)로 연결하는 함수
 */
export const buildOrQuery = (keywords: string[]): string => keywords.join("|");

/**
 * 배열에서 랜덤한 요소 하나 선택
 */
export const selectRandomOption = <T>(options: T[]): T =>
  options[Math.floor(Math.random() * options.length)];
