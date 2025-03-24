import { describe, expect, it } from "vitest";

import { fixJson } from "./fix-json";

describe("fixJson", () => {
  // 기본 케이스 테스트
  describe("완전한 JSON 처리", () => {
    it("완전한 JSON 객체는 그대로 반환해야 함", () => {
      const input = '{"name":"John","age":30}';
      expect(fixJson(input)).toBe(input);
    });

    it("완전한 JSON 배열은 그대로 반환해야 함", () => {
      const input = "[1,2,3,4,5]";
      expect(fixJson(input)).toBe(input);
    });

    it("중첩된 완전한 JSON은 그대로 반환해야 함", () => {
      const input = '{"users":[{"name":"John","items":["book","pen"]}]}';
      expect(fixJson(input)).toBe(input);
    });
  });

  // 문자열 수정 테스트
  describe("문자열 수정", () => {
    it("끝나지 않은 문자열을 완성해야 함", () => {
      expect(fixJson('{"name":"John')).toBe('{"name":"John"}');
    });

    it("이스케이프된 문자가 있는 끝나지 않은 문자열을 완성해야 함", () => {
      expect(fixJson('{"name":"Jo\\"hn')).toBe('{"name":"Jo\\"hn"}');
    });
  });

  // 객체 수정 테스트
  describe("객체 수정", () => {
    it("끝나지 않은 객체를 완성해야 함", () => {
      expect(fixJson('{"name":"John","age":30')).toBe(
        '{"name":"John","age":30}',
      );
    });

    it("빈 객체 시작을 완성해야 함", () => {
      expect(fixJson("{")).toBe("{}");
    });

    it("객체 키 입력 중인 객체를 완성해야 함", () => {
      expect(fixJson('{"name')).toBe("{}");
    });

    it("객체 키-값 쌍 완료 후 콤마가 있는 객체를 완성해야 함", () => {
      expect(fixJson('{"name":"John",')).toBe('{"name":"John"}');
    });
  });

  // 배열 수정 테스트
  describe("배열 수정", () => {
    it("끝나지 않은 배열을 완성해야 함", () => {
      expect(fixJson("[1,2,3")).toBe("[1,2,3]");
    });

    it("빈 배열 시작을 완성해야 함", () => {
      expect(fixJson("[")).toBe("[]");
    });
  });

  // 리터럴 수정 테스트
  describe("리터럴 수정", () => {
    it("불완전한 true 리터럴을 완성해야 함", () => {
      expect(fixJson('{"value":tr')).toBe('{"value":true}');
    });

    it("불완전한 false 리터럴을 완성해야 함", () => {
      expect(fixJson('{"value":fal')).toBe('{"value":false}');
    });

    it("불완전한 null 리터럴을 완성해야 함", () => {
      expect(fixJson('{"value":nu')).toBe('{"value":null}');
    });
  });

  // 숫자 수정 테스트
  describe("숫자 수정", () => {
    it("끝나지 않은 숫자 속성을 완성해야 함", () => {
      expect(fixJson('{"value":123')).toBe('{"value":123}');
    });

    it("소수점이 있는 끝나지 않은 숫자 속성을 완성해야 함", () => {
      expect(fixJson('{"value":123.45')).toBe('{"value":123.45}');
    });

    it("음수 끝나지 않은 숫자 속성을 완성해야 함", () => {
      expect(fixJson('{"value":-123')).toBe('{"value":-123}');
    });
  });

  // 복잡한 중첩 구조 테스트
  describe("복잡한 중첩 구조", () => {
    it("여러 단계로 중첩된 끝나지 않은 구조를 완성해야 함", () => {
      expect(fixJson('{"users":[{"name":"John","items":["book","pen"')).toBe(
        '{"users":[{"name":"John","items":["book","pen"]}]}',
      );
    });

    it("여러 개의 객체와 배열이 중첩된 구조를 완성해야 함", () => {
      expect(fixJson('{"a":{"b":[{"c":"d","e":{"f":[1,2,3')).toBe(
        '{"a":{"b":[{"c":"d","e":{"f":[1,2,3]}}]}}',
      );
    });

    it("깊게 중첩된 객체 안의 리터럴을 완성해야 함", () => {
      expect(fixJson('{"a":{"b":{"c":{"d":{"e":tr')).toBe(
        '{"a":{"b":{"c":{"d":{"e":true}}}}}',
      );
    });
  });

  // 특수 케이스 테스트
  describe("특수 케이스", () => {
    it("빈 문자열에 대해 빈 문자열을 반환해야 함", () => {
      expect(fixJson("")).toBe("");
    });

    it("공백만 있는 문자열은 빈 문자열을 반환해야 함", () => {
      expect(fixJson("   ")).toBe("");
    });

    it("JSON이 아닌 일반 문자열은 빈 문자열을 반환해야 함", () => {
      expect(fixJson("hello world")).toBe("");
    });
  });
});
