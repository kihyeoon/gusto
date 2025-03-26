// app/api/stream-recipe/route.ts
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // 항상 동적으로 실행되도록 설정

export async function GET(req: NextRequest) {
  // CORS 헤더 설정 (필요한 경우)
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  };

  try {
    // ReadableStream 생성
    const stream = new ReadableStream({
      async start(controller) {
        const mockRecipeData = {
          title: "토마토 마리네이드",
          description: "신선한 방울 토마토와 바질, 양파를 활용한 상큼한 마리네이드로, 식전 입맛을 돋우는 요리입니다.",
          ingredients: [
            {
              name: "방울 토마토",
              amount: "500g"
            },
            {
              name: "양파",
              amount: "1개"
            },
            {
              name: "바질",
              amount: "10g"
            },
            {
              name: "올리브 오일",
              amount: "4스푼"
            },
            {
              name: "발사믹 식초",
              amount: "3스푼"
            },
            {
              name: "레몬즙",
              amount: "4스푼"
            },
            {
              name: "알룰로스",
              amount: "3스푼"
            },
            {
              name: "소금",
              amount: "두 꼬집"
            },
            {
              name: "후추",
              amount: "기호에 따라"
            },
            {
              name: "모짜렐라 치즈",
              amount: "적당량"
            }
          ],
          steps: [
            {
              description: "방울 토마토 500g을 팔팔 끓는 뜨거운 물에 1분간 데친 후 차가운 물에 담가 껍질을 벗깁니다."
            },
            {
              description: "양파 한 개를 반으로 갈라 최대한 작게 자릅니다."
            },
            {
              description: "바질 10g을 잘게 다집니다."
            },
            {
              description: "믹싱볼에 준비한 토마토, 양파, 바질을 담습니다."
            },
            {
              description: "올리브 오일 4스푼, 발사믹 식초 3스푼, 레몬즙 4스푼, 알룰로스 3스푼, 소금 두 꼬집을 넣고 잘 섞습니다."
            },
            {
              description: "기호에 따라 후추를 추가합니다."
            },
            {
              description: "완성된 마리네이드를 접시에 담고 모짜렐라 치즈를 위에 올려 마무리합니다."
            }
          ],
          tips: [
            "토마토의 껍질을 쉽게 벗기기 위해 차가운 물에 충분히 담가주세요.",
            "모짜렐라 치즈는 신선한 것을 사용하면 더욱 맛있습니다."
          ]
        };

        // 데이터를 문자열로 변환
        const recipeText = convertRecipeToText(mockRecipeData);
        
        // 텍스트를 작은 청크로 나누어 스트리밍
        const chunks = splitTextIntoChunks(recipeText, 5); // 5자씩 나누어 스트리밍 (속도 조절용)
        
        for (const chunk of chunks) {
          // 각 청크를 인코딩하여 전송
          const encoder = new TextEncoder();
          const encoded = encoder.encode(chunk);
          controller.enqueue(encoded);
          
          // 스트림 속도 제어 (50ms 간격으로 전송)
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        controller.close();
      }
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error('스트리밍 중 오류 발생:', error);
    return new Response(JSON.stringify({ error: '스트리밍 처리 중 오류가 발생했습니다' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req: NextRequest) {
  // CORS 헤더 설정 (필요한 경우)
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  };

  try {
    // 요청 본문에서 데이터를 받을 수도 있지만, 여기서는 mockRecipeData 사용
    // const requestData = await req.json(); // 클라이언트에서 데이터를 받아올 경우

    // ReadableStream 생성
    const stream = new ReadableStream({
      async start(controller) {
        const mockRecipeData = {
          title: "토마토 마리네이드",
          description: "신선한 방울 토마토와 바질, 양파를 활용한 상큼한 마리네이드로, 식전 입맛을 돋우는 요리입니다.",
          ingredients: [
            {
              name: "방울 토마토",
              amount: "500g"
            },
            {
              name: "양파",
              amount: "1개"
            },
            {
              name: "바질",
              amount: "10g"
            },
            {
              name: "올리브 오일",
              amount: "4스푼"
            },
            {
              name: "발사믹 식초",
              amount: "3스푼"
            },
            {
              name: "레몬즙",
              amount: "4스푼"
            },
            {
              name: "알룰로스",
              amount: "3스푼"
            },
            {
              name: "소금",
              amount: "두 꼬집"
            },
            {
              name: "후추",
              amount: "기호에 따라"
            },
            {
              name: "모짜렐라 치즈",
              amount: "적당량"
            }
          ],
          steps: [
            {
              description: "방울 토마토 500g을 팔팔 끓는 뜨거운 물에 1분간 데친 후 차가운 물에 담가 껍질을 벗깁니다."
            },
            {
              description: "양파 한 개를 반으로 갈라 최대한 작게 자릅니다."
            },
            {
              description: "바질 10g을 잘게 다집니다."
            },
            {
              description: "믹싱볼에 준비한 토마토, 양파, 바질을 담습니다."
            },
            {
              description: "올리브 오일 4스푼, 발사믹 식초 3스푼, 레몬즙 4스푼, 알룰로스 3스푼, 소금 두 꼬집을 넣고 잘 섞습니다."
            },
            {
              description: "기호에 따라 후추를 추가합니다."
            },
            {
              description: "완성된 마리네이드를 접시에 담고 모짜렐라 치즈를 위에 올려 마무리합니다."
            }
          ],
          tips: [
            "토마토의 껍질을 쉽게 벗기기 위해 차가운 물에 충분히 담가주세요.",
            "모짜렐라 치즈는 신선한 것을 사용하면 더욱 맛있습니다."
          ]
        };

        // 데이터를 문자열로 변환
        const recipeText = convertRecipeToText(mockRecipeData);
        
        // 텍스트를 작은 청크로 나누어 스트리밍
        const chunks = splitTextIntoChunks(recipeText, 5); // 5자씩 나누어 스트리밍 (속도 조절용)
        
        for (const chunk of chunks) {
          // 각 청크를 인코딩하여 전송
          const encoder = new TextEncoder();
          const encoded = encoder.encode(chunk);
          controller.enqueue(encoded);
          
          // 스트림 속도 제어 (50ms 간격으로 전송)
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        controller.close();
      }
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error('스트리밍 중 오류 발생:', error);
    return new Response(JSON.stringify({ error: '스트리밍 처리 중 오류가 발생했습니다' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 레시피 객체를 텍스트 형식으로 변환하는 함수
function convertRecipeToText(recipe: any): string {
  let text = `제목: ${recipe.title}\n\n`;
  text += `설명: ${recipe.description}\n\n`;
  
  text += `재료:\n`;
  recipe.ingredients.forEach((ingredient: any, index: number) => {
    text += `${index + 1}. ${ingredient.name} - ${ingredient.amount}\n`;
  });
  
  text += `\n조리 방법:\n`;
  recipe.steps.forEach((step: any, index: number) => {
    text += `${index + 1}. ${step.description}\n`;
  });
  
  text += `\n팁:\n`;
  recipe.tips.forEach((tip: string, index: number) => {
    text += `${index + 1}. ${tip}\n`;
  });
  
  return text;
}

// 텍스트를 청크로 나누는 함수
function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}