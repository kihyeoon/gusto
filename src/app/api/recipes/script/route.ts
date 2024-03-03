import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export interface Script {
  offset: number;
  text: string;
}

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("videoId") || "";
  const YTtranscript: Script[] = await YoutubeTranscript.fetchTranscript(
    videoId,
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

  return NextResponse.json(YTtranscript);
}
