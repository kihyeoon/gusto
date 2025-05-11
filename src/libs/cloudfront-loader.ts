"use client";

/**
 * AWS CloudFront를 사용하는 이미지 로더
 * Next.js Image 컴포넌트의 loader prop으로 사용할 수 있는 함수입니다.
 */
export const cloudFrontLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const cdnURL = process.env.NEXT_PUBLIC_AWS_GUSTO_CDN_URL || "";
  const imageQuality = quality || 75;
  let queryParams = `width=${width}&quality=${imageQuality}`;

  if (src.includes("amazonaws.com")) {
    const s3Path = new URL(src).pathname;
    return `${cdnURL}${s3Path}?${queryParams}`;
  }

  if (src.includes(cdnURL)) {
    return `${src}?${queryParams}`;
  }

  return src;
};
