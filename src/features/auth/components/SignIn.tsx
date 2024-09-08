"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface Props {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

export default function SignIn({ providers, callbackUrl }: Props) {
  const testAccount = {
    email: "test@example.com",
    password: "testpassword",
  };

  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        if (id !== "credentials") {
          return (
            <Button key={id} onClick={() => signIn(id, { callbackUrl })}>
              {`${name}로 로그인하기`}
            </Button>
          );
        } else {
          return (
            <Button
              key={id}
              onClick={() =>
                signIn(id, {
                  email: testAccount.email,
                  password: testAccount.password,
                  callbackUrl,
                })
              }
            >
              체험해보기
            </Button>
          );
        }
      })}
    </>
  );
}
