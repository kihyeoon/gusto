import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

import { getSuggestions } from "@/features/recipe/apis/client";
import {
  SUGGESTIONS_QUERY_KEY,
  errorMessages,
} from "@/features/recipe/libs/constants";

import { ApiException, CustomException } from "@/libs/exceptions";

interface UseSuggestionsProps {
  query?: string;
  count?: number;
}

// 캐시가 절대 만료되지 않도록 설정
const STALE_TIME_MS = Infinity;
const CACHE_TIME_MS = Infinity;

export default function useSuggestions({
  query = "레시피",
  count = 5,
}: UseSuggestionsProps = {}) {
  const { toast } = useToast();

  const {
    data: suggestions = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: [...SUGGESTIONS_QUERY_KEY, query],
    queryFn: () => getSuggestions(query, count),
    staleTime: STALE_TIME_MS,
    gcTime: CACHE_TIME_MS,
    retry: 1,
    refetchOnWindowFocus: false, // 창 포커스 시 리페치 비활성화
    refetchOnMount: false, // 마운트 시 리페치 비활성화
    refetchOnReconnect: false, // 다시 연결 시 리페치 비활성화
  });

  useEffect(() => {
    if (error) {
      if (error instanceof ApiException) {
        const { message, description } = error;
        toast({
          title: message,
          description,
        });
      } else if (error instanceof CustomException) {
        toast({
          title: error.message,
        });
      } else {
        toast({
          title: errorMessages.CANNOT_FETCH_SUGGESTIONS.message,
          description: errorMessages.CANNOT_FETCH_SUGGESTIONS.description,
        });
      }
      console.error("추천 레시피 가져오기 오류:", error);
    }
  }, [error, toast]);

  return {
    suggestions,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
}
