import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

interface Context {
  params: { id: string };
}

export async function GET(_: NextRequest, { params: { id } }: Context) {
  const YTtranscript = await YoutubeTranscript.fetchTranscript(id).then(
    (res) => {
      return res.map(({ text, offset }) => ({
        offset,
        text,
      }));
    },
  );

  return NextResponse.json(YTtranscript);
}
