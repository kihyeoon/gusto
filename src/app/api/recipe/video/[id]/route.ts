import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

import { OpenAIService } from "@/service/openAI";

interface Context {
  params: { id: string };
}

interface script {
  offset: number;
  text: string;
}

export async function GET(_: NextRequest, { params: { id } }: Context) {
  const YTtranscript: script[] = await YoutubeTranscript.fetchTranscript(
    id,
  ).then((res) => {
    return res.map(({ text, offset }) => ({
      offset,
      text,
    }));
  });

  try {
    const message: string = YTtranscript.map((s) => s.text).join("\n");
    console.log(message);
    const openai = OpenAIService.getInstance();
    const response = await openai.getChatResponse(message);
    console.log(response);
    const content = response.choices[0].message.content;
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
