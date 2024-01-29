import { NextRequest, NextResponse } from "next/server";
import { type ClientOptions, OpenAI } from "openai";

interface Context {
  params: { script: string };
}

const apiKey = process.env.OPENAI_API_KEY;

const configuration: ClientOptions = {
  apiKey,
};
const openai = new OpenAI(configuration);

const messages: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content:
      "당신은 세계 최고의 요리 레시피 연구원입니다. 당신은 어떤 요리에 관한 설명이든 상세하게 잘 정리된 레시피로 바꿀 수 있습니다. 유튜브 요리 영상의 자막을 입력하면, 당신이 책에 써있는 것 과 같이 포멀한 글 형태의 레시피로 바꿔줍니다. 정확한 재료의 양을 측정할 수 있다면 기입해주세요. 만약 요리에 관련된 영상의 자막이 아니라면 요리 영상이 아니라고 알려줍니다. 당신은 할 수 있습니다!",
  },
];

export const runtime = "edge";

export async function GET(_: NextRequest, { params: { script } }: Context) {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...messages,
          {
            role: "user",
            content: `다음은 유튜브 자막입니다. 레시피를 만들어주세요: ${script}`,
          },
        ],
      });

      if (
        completion.choices &&
        completion.choices.length > 0 &&
        completion.choices[0].message &&
        completion.choices[0].message.content
      ) {
        const content = completion.choices[0].message.content;

        return NextResponse.json(content);
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error(`Failed to fetch data (retry ${retries + 1}):`, error);
      retries += 1;

      if (retries === maxRetries) {
        return NextResponse.json(error);
      }
    }
  }
}
