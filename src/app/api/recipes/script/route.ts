import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

import { errorMessages } from "@/features/recipe/libs/constants";
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
        message: errorMessages.INVALID_URL.message,
        description: errorMessages.INVALID_URL.description,
      },
      { status: 400 },
    );
  }
  return NextResponse.json(YTtranscript);
}
