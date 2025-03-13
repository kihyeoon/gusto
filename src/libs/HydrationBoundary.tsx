"use client";

import {
  HydrationBoundaryProps,
  HydrationBoundary as RQHydrationBoundary,
} from "@tanstack/react-query";

// React Query의 HydrationBoundary를 클라이언트 컴포넌트로 래핑
export function HydrationBoundary(props: HydrationBoundaryProps) {
  return <RQHydrationBoundary {...props} />;
}
