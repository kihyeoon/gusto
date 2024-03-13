"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-20 mb-3 flex w-full items-center justify-end gap-1 bg-background">
      {user && (
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      )}
      {session ? (
        <Button onClick={() => signOut()}>로그아웃</Button>
      ) : (
        <Button onClick={() => signIn()}>로그인</Button>
      )}
    </nav>
  );
}
