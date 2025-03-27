import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-primary">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          레시피를 찾을 수 없어요.
        </h2>
        <p className="text-muted-foreground">
          찾으시는 레시피가 삭제되었거나 <br />
          잘못된 URL을 입력하셨을 수 있습니다.
        </p>
        <div className="pt-4">
          <Button asChild variant="default">
            <Link href="/recipe" className="inline-flex items-center">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              레시피 목록으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
