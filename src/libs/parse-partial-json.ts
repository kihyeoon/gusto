import { DeepPartial } from "@/libs/deep-partial";
import { fixJson } from "@/libs/fix-json";

// 불완전한 JSON을 최대한 파싱하는 함수
export function parsePartialJson<T>(text: string): {
  value: DeepPartial<T> | undefined;
  state: "successful-parse" | "partial-parse" | "no-parse";
} {
  // 완전한 JSON인 경우 그대로 파싱
  try {
    const parsed = JSON.parse(text);
    return { value: parsed as DeepPartial<T>, state: "successful-parse" };
  } catch (e) {
    // 에러가 발생한 경우, fixJson을 사용하여 복구 시도
    try {
      const fixedJson = fixJson(text);
      const parsed = JSON.parse(fixedJson);
      return { value: parsed as DeepPartial<T>, state: "partial-parse" };
    } catch (fixError) {
      // 복구해도 파싱 불가능한 경우
      return { value: undefined, state: "no-parse" };
    }
  }
}
