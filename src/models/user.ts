export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
}

export type SimpleUser = Pick<AuthUser, "username" | "image">;
