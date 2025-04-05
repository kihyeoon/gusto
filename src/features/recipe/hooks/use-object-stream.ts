import { useCallback, useId, useRef, useState } from "react";
import { z } from "zod";

import { DeepPartial } from "@/libs/deep-partial";
import { parsePartialJson } from "@/libs/parse-partial-json";
import { isDeepEqualData } from "@/libs/utils";

interface UseObjectOptions<RESULT> {
  /**
   * API 엔드포인트. JSON 스키마와 일치하는 데이터를 청크로 스트리밍해야 합니다.
   */
  api: string;

  /**
   * 완전한 객체의 형태를 정의하는 Zod 스키마
   */
  schema: z.Schema<RESULT, z.ZodTypeDef, any>;

  /**
   * 고유 식별자. 제공되지 않으면 랜덤으로 생성됩니다.
   * 제공된 경우, 동일한 `id`를 가진 `useObject` 훅은 컴포넌트 간에 상태를 공유합니다.
   */
  id?: string;

  /**
   * 초기 객체 값(선택 사항)
   */
  initialValue?: DeepPartial<RESULT>;

  /**
   * 커스텀 fetch 구현. 요청을 가로채거나 테스트를 위한 커스텀 fetch 구현을 제공할 수 있습니다.
   */
  fetch?: typeof fetch;

  /**
   * 스트림이 완료되었을 때 호출되는 콜백
   */
  onFinish?: (event: {
    /**
     * 생성된 객체(스키마에 따라 타입이 지정됨)
     * 최종 객체가 스키마와 일치하지 않으면 undefined가 될 수 있습니다.
     */
    object: RESULT | undefined;

    /**
     * 선택적 오류 객체. 예: 최종 객체가 스키마와 일치하지 않을 때 TypeValidationError.
     */
    error: Error | undefined;
  }) => Promise<void> | void;

  /**
   * 오류가 발생했을 때 호출되는 콜백 함수
   */
  onError?: (error: Error) => void;

  /**
   * 요청에 포함할 추가 HTTP 헤더
   */
  headers?: Record<string, string> | Headers;
}

interface UseObjectHelpers<RESULT, INPUT> {
  /**
   * JSON 본문으로 API를 호출합니다.
   */
  submit: (input: INPUT) => void;

  /**
   * 생성된 객체의 현재 값. API가 JSON 청크를 스트리밍함에 따라 업데이트됩니다.
   */
  object: DeepPartial<RESULT> | undefined;

  /**
   * API 요청의 오류 객체(있는 경우).
   */
  error: Error | undefined;

  /**
   * API 요청이 진행 중인지 표시하는 플래그.
   */
  isLoading: boolean;

  /**
   * 현재 요청을 즉시 중단하고, 현재 부분 객체가 있으면 유지합니다.
   */
  stop: () => void;
}

/**
 * 객체를 스트리밍합니다.
 */
function useObjectStream<RESULT, INPUT = any>({
  api,
  id,
  schema,
  initialValue,
  fetch: customFetch,
  onError,
  onFinish,
  headers,
}: UseObjectOptions<RESULT>): UseObjectHelpers<RESULT, INPUT> {
  const hookId = useId();
  const completionId = id ?? hookId;

  const [data, setData] = useState<DeepPartial<RESULT> | undefined>(
    initialValue,
  );
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 현재 요청을 취소하기 위한 AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    try {
      abortControllerRef.current?.abort();
    } catch (ignored) {
      // 무시
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const submit = useCallback(
    async (input: INPUT) => {
      try {
        setData(initialValue); // 데이터 초기화
        setIsLoading(true);
        setError(undefined);

        // 이전 요청이 있다면 중단
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // 새 AbortController 생성
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        // 실제 fetch 결정 (커스텀 또는 기본)
        const actualFetch = customFetch ?? fetch;

        // API 요청
        const response = await actualFetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          signal: abortController.signal,
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw new Error(
            (await response.text()) ?? "API 요청이 실패했습니다.",
          );
        }

        if (response.body == null) {
          throw new Error("응답 본문이 비어 있습니다.");
        }

        let accumulatedText = "";
        let latestObject: DeepPartial<RESULT> | undefined = initialValue;

        // 스트림 처리 파이프라인 설정
        await response.body.pipeThrough(new TextDecoderStream()).pipeTo(
          new WritableStream<string>({
            // 각 청크 처리
            write(chunk) {
              accumulatedText += chunk;

              const { value } = parsePartialJson<RESULT>(accumulatedText);

              // 새로운 객체가 이전과 다른 경우만 상태 업데이트
              if (
                value !== undefined &&
                !isDeepEqualData(latestObject, value)
              ) {
                latestObject = value;
                setData(value);
              }
            },

            // 스트림 완료 처리
            close() {
              setIsLoading(false);
              abortControllerRef.current = null;

              // 최종 객체 유효성 검사 및 onFinish 콜백 호출
              if (onFinish != null && latestObject !== undefined) {
                try {
                  const validationResult = schema.safeParse(latestObject);

                  onFinish(
                    validationResult.success
                      ? { object: validationResult.data, error: undefined }
                      : {
                          object: undefined,
                          error: new Error(
                            "객체가 스키마와 일치하지 않습니다.",
                          ),
                        },
                  );
                } catch (validationError) {
                  onFinish({
                    object: undefined,
                    error:
                      validationError instanceof Error
                        ? validationError
                        : new Error("객체 유효성 검사 중 오류가 발생했습니다."),
                  });
                }
              }
            },
          }),
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          // 사용자가 의도적으로 중단한 경우
          return;
        }

        if (onError && error instanceof Error) {
          onError(error);
        }

        setIsLoading(false);
        setError(error instanceof Error ? error : new Error(String(error)));
        abortControllerRef.current = null;
      }
    },
    [api, schema, initialValue, customFetch, onError, onFinish, headers],
  );

  return {
    submit,
    object: data,
    error,
    isLoading,
    stop,
  };
}

export { useObjectStream };
export type { UseObjectOptions, UseObjectHelpers };
