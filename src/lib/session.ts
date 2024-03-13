import { AuthUser } from "@/models/user";
import { getServerSession } from "next-auth";

import { authOptions } from "@/service/auth";

export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>,
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return handler(user);
}
