import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

import { Script } from "@/features/recipe/models/recipe";

import { ApiErrorSchema } from "@/libs/exceptions";

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("videoId") || "";
  const YTtranscript: Script[] = await YoutubeTranscript.fetchTranscript(
    videoId,
    { lang: "ko" },
  )
    .then((res) => {
      return res.map(({ text, offset }) => ({
        offset,
        text,
      }));
    })
    .catch((err) => {
      return [{ offset: 0, text: "error" }];
    });

  if (YTtranscript[0].text === "error") {
    return NextResponse.json<ApiErrorSchema>(
      {
        message: "올바르지 않은 URL입니다.",
        description:
          "자막이 사용 가능한 YouTube 요리 영상의 URL을 입력해주세요.",
      },
      { status: 400 },
    );
  }
  return NextResponse.json(YTtranscript);
}
