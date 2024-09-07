"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="z-20 mx-auto flex h-12 w-full max-w-md items-center justify-end gap-1 bg-background px-4 pt-2">
      {user && (
        <Avatar className="cursor-pointer" onClick={() => signOut()}>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      )}
      {!session && <Button onClick={() => signIn()}>로그인</Button>}
    </nav>
  );
}
