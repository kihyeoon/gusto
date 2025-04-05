import { NextRequest, NextResponse } from "next/server";

import { YouTubeVideo } from "@/features/recipe/models/youtube";

import { buildOrQuery, getRandomItems, selectRandomOption } from "@/libs/utils";

const FOOD_CATEGORIES = [
  "한식 레시피",
  "양식 레시피",
  "중식 레시피",
  "일식 레시피",
  "아침 레시피",
  "점심 레시피",
  "저녁 레시피",
  "간단한 레시피",
  "건강한 레시피",
  "디저트 레시피",
  "비건 레시피",
  "건강한 레시피",
  "고기 레시피",
  "쉬운 레시피",
  "자취 레시피",
  "손님 접대 레시피",
];

const createSearchQuery = (): string => {
  const selectedKeywords = getRandomItems(FOOD_CATEGORIES, 5);

  return buildOrQuery(selectedKeywords);
};

const buildYouTubeApiUrl = (
  query: string,
  apiKey: string,
  order: string,
): string =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
    query,
  )}&type=video&key=${apiKey}&relevanceLanguage=ko&regionCode=KR&order=${order}`;

const transformApiResponse = (data: any): YouTubeVideo[] =>
  data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
  }));

const fetchYouTubeVideos = async (
  query: string,
  apiKey: string,
): Promise<YouTubeVideo[]> => {
  const orderOptions = ["relevance", "rating", "viewCount"];
  const order = selectRandomOption(orderOptions);
  const url = buildYouTubeApiUrl(query, apiKey, order);

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("YouTube API 요청 실패");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return [];
  }

  const allVideos = transformApiResponse(data);
  return getRandomItems(allVideos, 5);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userQuery = searchParams.get("query") || "레시피";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API 키가 설정되지 않았습니다" },
      { status: 500 },
    );
  }

  try {
    // 검색 쿼리 생성 (기본 "레시피" 검색어인 경우에만 랜덤 쿼리 생성)
    const query = userQuery === "레시피" ? createSearchQuery() : userQuery;
    console.log("생성된 검색 쿼리:", query);

    const videos = await fetchYouTubeVideos(query, apiKey);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("YouTube API 호출 중 오류 발생:", error);
    return NextResponse.json(
      { error: "추천 레시피를 가져오는 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
