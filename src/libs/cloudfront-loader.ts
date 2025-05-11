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
  const queryParams = `width=${width}&quality=${quality || 75}`;

  return `${src}?${queryParams}`;
};
