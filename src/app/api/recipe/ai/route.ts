import { NextRequest, NextResponse } from "next/server";

import { OpenAIService } from "@/service/openAI";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { script } = await req.json();
  console.log(script);

  try {
    const openai = OpenAIService.getInstance();
    const response = await openai.getChatResponse(script);
    const content = response.choices[0].message.content;
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
