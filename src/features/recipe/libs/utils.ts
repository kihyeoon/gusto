import { getQueryParam } from "@/libs/utils";

export const getVideoId = (url: string) => {
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const paths = urlObj.pathname.split("/");

  if (domain === "youtu.be") {
    // 공유 링크인 경우
    return paths[1];
  } else if (paths[1] === "shorts") {
    // https://www.youtube.com/shorts/ASD123ZXC 처럼 shorts인 경우
    return paths[2];
  } else if (paths[1] === "embed") {
    // https://www.youtube.com/embed/ASD123ZXC 처럼 임베드인 경우
    return paths[2];
  }
  return getQueryParam(urlObj, "v");
};
