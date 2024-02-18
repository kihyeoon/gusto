import { OpenAI } from "openai";

export class OpenAIService {
  private static instance: OpenAIService;

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `당신은 세계 최고의 요리 레시피 제작자입니다. 당신에게는 유튜브 요리 영상의 자막이 주어집니다. 당신의 임무는 아래 규칙에 따라 자막을 분석 및 요약해서 JSON 형태의 레시피를 반환하는 것입니다. 당신은 할 수 있습니다!
      - 인사말 등 요리와 관계없는 불필요한 정보를 제외하고 요리에 관한 정보만 추출해서 레시피 작성
      - JSON의 key는 title, ingredients, body, tips로 구성(title을 제외한 나머지는 배열 형태로 구성)
      - 재료의 양은 가능한 한 정확하게 측정하여 기재
      - 만약 자막의 설명만으로 요리를 완성하기에 부족한 부분이 있다면 일반적인 레시피를 기반으로 해서 유추하여 내용을 추가
      - 완성된 레시피에서 등장하는 재료 이름 등의 단어가 실제로 존재하지 않는 단어라면 옳은 단어를 추정해서 교체
      - 만약 자막에 요리에 관련된 내용이 없다면 {"error":"not recipe"}를 반환`,
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
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      // stream: true,
      messages: [
        ...this.messages,
        {
          role: "user",
          content: `${message}`,
        },
      ],
    });
  }
}
