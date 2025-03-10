import { AuthUser } from "@/features/auth/models/user";
import { auth } from "@/features/auth/services/auth";

export async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>,
) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return handler(user);
}
