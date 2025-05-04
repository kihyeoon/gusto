import { YouTubeVideo } from "@/features/recipe/models/youtube";

import { getQueryParam } from "@/libs/utils";

export const getVideoId = (url: string) => {
  try {
    if (!url || typeof url !== "string") return null;

    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const paths = urlObj.pathname.split("/");

    if (domain === "youtu.be") {
      // 공유 링크인 경우
      return paths[1];
    } else if (paths[1] === "shorts") {
      // https://www.youtube.com/shorts/ASD123ZXC 처럼 shorts인 경우
      return paths[2];
    } else if (paths[1] === "embed") {
      // https://www.youtube.com/embed/ASD123ZXC 처럼 임베드인 경우
      return paths[2];
    }
    return getQueryParam(urlObj, "v");
  } catch (error) {
    return null;
  }
};

/**
 * 유튜브 비디오 썸네일 URL 가져오기
 */
export function getThumbnailUrl(url: string): string {
  const videoId = getVideoId(url);
  if (!videoId) return "";
  return getThumbnailUrlByVideoId(videoId);
}

export const getThumbnailUrlByVideoId = (videoId: string): string =>
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

export const buildYouTubeApiUrl = (
  query: string,
  apiKey: string,
  order: string,
  maxResults: number,
): string =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
    query,
  )}&type=video&key=${apiKey}&relevanceLanguage=ko&regionCode=KR&order=${order}`;

export const transformApiResponse = (data: any): YouTubeVideo[] =>
  data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
  }));
