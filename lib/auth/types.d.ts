import type { DefaultSession } from "next-auth";
import type { AccountRole } from "@/lib/auth/roles";

declare module "next-auth" {
  interface User {
    role: AccountRole;
  }

  interface Session {
    user: {
      role: AccountRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: AccountRole;
  }
}
