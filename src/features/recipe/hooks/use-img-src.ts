import { useState } from "react";

interface Props {
  url: string | null;
  fallbackImg: string;
}

export default function useImgSrc({ url, fallbackImg }: Props) {
  const [imgSrc, setImgSrc] = useState(url ?? fallbackImg);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error("error => ", e);
    setImgSrc(fallbackImg);
  };

  return {
    imgSrc,
    handleImageError,
  };
}
