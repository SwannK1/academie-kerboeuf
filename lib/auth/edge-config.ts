import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config (no Postgres/bcrypt imports) shared by middleware and
 * the full server config. Keep providers and DB access out of this file.
 */
export const authEdgeConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/connexion" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      if (!isAdminRoute) {
        return true;
      }
      return auth?.user?.role === "admin";
    },
  },
} satisfies NextAuthConfig;
