import { getVideoId } from "./utils";

describe("getVideoId", () => {
  it("일반적인 YouTube URL에서 비디오 ID를 추출할 수 있다", () => {
    expect(getVideoId("https://www.youtube.com/watch?v=ASD123ZXC")).toBe(
      "ASD123ZXC",
    );
  });

  it("YouTube 공유 링크(youtu.be)에서 비디오 ID를 추출할 수 있다", () => {
    expect(getVideoId("https://youtu.be/ASD123ZXC")).toBe("ASD123ZXC");
  });

  it("YouTube Shorts URL에서 비디오 ID를 추출할 수 있다", () => {
    expect(getVideoId("https://www.youtube.com/shorts/ASD123ZXC")).toBe(
      "ASD123ZXC",
    );
  });

  it("추가 매개변수가 있는 URL에서도 비디오 ID를 추출할 수 있다", () => {
    expect(
      getVideoId(
        "https://www.youtube.com/watch?v=ASD123ZXC&t=120s&feature=shared",
      ),
    ).toBe("ASD123ZXC");
  });

  it("임베드 URL에서 비디오 ID를 추출할 수 있다", () => {
    expect(getVideoId("https://www.youtube.com/embed/ASD123ZXC")).toBe(
      "ASD123ZXC",
    );
  });
});

