import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 서버 컴포넌트에서 QueryClient를 생성하는 함수
// 동일한 요청 내에서 QueryClient 인스턴스를 재사용
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10 * 1000,
        },
      },
    }),
);
