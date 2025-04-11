import { DeepPartial } from "@/libs/deep-partial";
import { fixJson } from "@/libs/fix-json";

// 불완전한 JSON을 최대한 파싱하는 함수
export function parsePartialJson<T>(text: string): {
  value: DeepPartial<T> | undefined;
} {
  // 완전한 JSON인 경우 그대로 파싱
  try {
    const parsed: DeepPartial<T> = JSON.parse(text);
    return { value: parsed };
  } catch (e) {
    // 에러가 발생한 경우, fixJson을 사용하여 복구 시도
    try {
      const fixedJson = fixJson(text);
      const parsed: DeepPartial<T> = JSON.parse(fixedJson);
      return { value: parsed };
    } catch (fixError) {
      // 복구해도 파싱 불가능한 경우
      return { value: undefined };
    }
  }
}
