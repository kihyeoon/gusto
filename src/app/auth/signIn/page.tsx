import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

import SignIn from "@/components/auth/SignIn";

import { authOptions } from "@/service/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In or Sign Up to Gusto.",
};

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="mt-24 flex justify-center">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
