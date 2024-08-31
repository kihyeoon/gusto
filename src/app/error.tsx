"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>잠시 후 다시 시도해주세요</h2>
      <button onClick={() => reset()}>다시 시도하기</button>
    </div>
  );
}
