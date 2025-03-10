"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface Props {
  callbackUrl: string;
}

export default function SignIn({ callbackUrl }: Props) {
  const testAccount = {
    email: "test@example.com",
    password: "testpassword",
  };

  return (
    <>
      <Button onClick={() => signIn("google", { callbackUrl })}>
        구글로 로그인하기
      </Button>
      <Button
        onClick={() =>
          signIn("credentials", {
            email: testAccount.email,
            password: testAccount.password,
            callbackUrl,
          })
        }
      >
        체험해보기
      </Button>
    </>
  );
}
