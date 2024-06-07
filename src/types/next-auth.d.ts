import { AuthUser } from "@/features/auth/models/user";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
