import { describe, expect, it } from "vitest";

import { generateUUID } from "./utils";

describe("generateUUID", () => {
  it("UUID가 올바른 형식으로 생성되어야 한다", () => {
    const uuid = generateUUID();

    // UUID 형식 검증을 위한 정규식 패턴 (RFC 4122 버전 4)
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidPattern);
  });

  it("각 호출마다 다른 UUID를 생성해야 한다", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    const uuid3 = generateUUID();

    expect(uuid1).not.toEqual(uuid2);
    expect(uuid1).not.toEqual(uuid3);
    expect(uuid2).not.toEqual(uuid3);
  });

  it("UUID의 길이가 36자여야 한다", () => {
    const uuid = generateUUID();

    expect(uuid.length).toBe(36);
  });

  it("UUID의 버전이 4여야 한다", () => {
    const uuid = generateUUID();
    const parts = uuid.split("-");

    // 13-16번째 문자가 버전을 나타내는 부분으로, 버전 4는 첫 번째 문자가 '4'여야 함
    expect(parts[2].charAt(0)).toBe("4");
  });

  it("UUID의 variant 비트가 RFC 4122를 따라야 한다", () => {
    const uuid = generateUUID();
    const parts = uuid.split("-");

    // variant 비트는 네 번째 부분의 첫 문자로, 8, 9, a, b 중 하나여야 함
    const firstCharOfFourthPart = parts[3].charAt(0);
    expect(["8", "9", "a", "b"]).toContain(firstCharOfFourthPart.toLowerCase());
  });
});
