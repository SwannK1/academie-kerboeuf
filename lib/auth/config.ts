import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authEdgeConfig } from "@/lib/auth/edge-config";
import { findUserByCredentials } from "@/lib/auth/users";
import type { AccountRole } from "@/lib/auth/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authEdgeConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }
        const user = await findUserByCredentials(email, password);
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: AccountRole }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as AccountRole;
      }
      return session;
    },
  },
});
