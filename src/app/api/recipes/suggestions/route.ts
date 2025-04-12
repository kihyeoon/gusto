import { NextRequest, NextResponse } from "next/server";

import { getYouTubeVideos } from "@/features/recipe/apis/server";

import { buildOrQuery, getRandomItems } from "@/libs/utils";

const FOOD_CATEGORIES = [
  "한식 레시피",
  "양식 레시피",
  "중식 레시피",
  "일식 레시피",
  "비건 레시피",
  "건강 레시피",
  "간단 레시피",
  "쉬운 레시피",
  "자취 레시피",
  "손님 접대 레시피",
];

const createSearchQuery = (): string => {
  const selectedKeywords = getRandomItems(FOOD_CATEGORIES, 5);

  return buildOrQuery(selectedKeywords);
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userQuery = searchParams.get("query") || "레시피";
  const count = Number(searchParams.get("count") || "5");
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
    console.log("생성된 검색 쿼리:", query, "개수:", count);

    const videos = await getYouTubeVideos(query, apiKey, count);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("YouTube API 호출 중 오류 발생:", error);
    return NextResponse.json(
      { error: "추천 레시피를 가져오는 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
