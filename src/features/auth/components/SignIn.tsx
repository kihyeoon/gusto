"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface Props {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <Button key={id} onClick={() => signIn(id, { callbackUrl })}>
          {`${name}로 로그인하기`}
        </Button>
      ))}
    </>
  );
}
