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
}

const STALE_TIME_MS = 60 * 1000; // 1분

export default function useSuggestions({
  query = "레시피",
}: UseSuggestionsProps = {}) {
  const { toast } = useToast();

  const {
    data: suggestions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [...SUGGESTIONS_QUERY_KEY, query],
    queryFn: () => getSuggestions(query),
    staleTime: STALE_TIME_MS,
    retry: 1,
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
    isLoading,
    error,
  };
}
