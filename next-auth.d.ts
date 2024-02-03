import type { Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "@auth/core/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    bio?: string | null;
    website?: string | null;
    gender?: string | null;
    name?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: NextAuthUser & {
      username?: string | null;
      bio?: string | null;
      website?: string | null;
      gender?: string | null;
      name?: string | null;
    };
  }

  interface User {
    username?: string | null;
    bio?: string | null;
    website?: string | null;
    gender?: string | null;
    name?: string | null;
  }
}
