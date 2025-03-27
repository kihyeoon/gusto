"use client";

import {
  ListBulletIcon,
  PersonIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  trigger?: ReactNode;
}

function NavItem({
  icon,
  label,
  href,
  onClick,
  isActive,
  trigger,
}: NavItemProps) {
  const content = (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex size-14 flex-col items-center justify-center gap-1 rounded-lg p-0"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center ${
          isActive ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs ${
          isActive ? "font-medium text-primary" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </Button>
  );

  if (trigger) return trigger;
  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  if (pathname === "/auth/signIn") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto flex h-16 w-full max-w-md items-center justify-around border-t bg-background px-2 py-1">
      <NavItem
        icon={<PlusCircledIcon className="h-5 w-5" />}
        label="생성"
        href="/"
        isActive={pathname === "/"}
      />
      <NavItem
        icon={<ListBulletIcon className="h-5 w-5" />}
        label="목록"
        href="/recipe"
        isActive={pathname === "/recipe"}
      />
      {user ? (
        <ConfirmDialog
          trigger={
            <NavItem
              icon={
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    <PersonIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              }
              label="내 정보"
              isActive={pathname === "/profile"}
            />
          }
          title="로그아웃 하시겠습니까?"
          handleAction={() => signOut()}
        />
      ) : (
        <NavItem
          icon={<PersonIcon className="h-5 w-5" />}
          label="로그인"
          onClick={() => signIn()}
        />
      )}
    </nav>
  );
}
