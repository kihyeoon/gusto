import { NextRequest, NextResponse } from "next/server";
import { Innertube } from "youtubei.js/web";

import { errorMessages } from "@/features/recipe/libs/constants";

import { ApiErrorSchema } from "@/libs/exceptions";

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get("videoId") || "";

  const youtube = await Innertube.create({
    lang: "ko",
    location: "KR",
    retrieve_player: false,
  });

  const fetchTranscript = async () => {
    try {
      const info = await youtube.getInfo(videoId);
      const transcriptData = await info.getTranscript();
      const script =
        transcriptData.transcript?.content?.body?.initial_segments.map(
          (segment) => segment.snippet.text,
        );

      if (!script || script.length === 0) {
        return NextResponse.json<ApiErrorSchema>(
          {
            message: errorMessages.CANNOT_FIND_RECIPE.message,
            description: errorMessages.CANNOT_FIND_RECIPE.description,
          },
          { status: 404 },
        );
      }

      return script;
    } catch (error) {
      return NextResponse.json<ApiErrorSchema>(
        {
          message: errorMessages.INVALID_URL.message,
          description: errorMessages.INVALID_URL.description,
        },
        { status: 400 },
      );
    }
  };

  return NextResponse.json(await fetchTranscript());
}
