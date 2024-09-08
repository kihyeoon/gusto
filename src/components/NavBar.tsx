"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  if (pathname === "/auth/signIn") {
    return null;
  }

  return (
    <nav className="z-20 mx-auto flex h-12 w-full max-w-md items-center justify-end gap-1 bg-background px-4 pt-2">
      {user && (
        <ConfirmDialog
          trigger={
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          }
          title="로그아웃 하시겠습니까?"
          handleAction={() => signOut()}
        />
      )}
      {!session && <Button onClick={() => signIn()}>로그인</Button>}
    </nav>
  );
}
