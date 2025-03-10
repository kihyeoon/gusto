import { Metadata } from "next";
import { redirect } from "next/navigation";

import SignIn from "@/features/auth/components/SignIn";
import { auth } from "@/features/auth/services/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In or Sign Up to Gusto.",
};

interface Props {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}

export default async function SignInPage(props: Props) {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <section className="mt-24 flex flex-col justify-center gap-4">
      <SignIn callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
