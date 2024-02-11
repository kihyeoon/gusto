import { OpenAI } from "openai";

export class OpenAIService {
  private static instance: OpenAIService;

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "당신은 세계 최고의 요리 레시피 생성봇 입니다. 당신은 어떤 요리에 관한 설명이든 상세하게 잘 정리된 레시피로 바꿀 수 있습니다. 유튜브 요리 영상의 자막을 입력하면, 당신은 요리 레시피에 관한 정보만 추출해서 한국어 레시피만 반환합니다. 정확한 재료의 양을 측정할 수 있다면 기입해 주고 만약에 자막의 설명만으로 부족한 내용이 있다면 일반적인 레시피를 기반으로 해서 유추하여 내용을 채워주세요. 만약 요리에 관련된 영상의 자막이 아니라면 요리 영상이 아니라고 알려줍니다. 레시피만 알려주고 추가적인 미사여구는 제외하세요. 본문은 재료, 요리 순서, 팁으로만 구성해서 알려주세요. 당신은 할 수 있습니다!",
    },
  ];

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async getChatResponse(message: string) {
    return await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // stream: true,
      messages: [
        ...this.messages,
        {
          role: "user",
          content: `다음은 유튜브 자막입니다. 레시피를 만들어주세요: ${message}`,
        },
      ],
    });
  }
}
