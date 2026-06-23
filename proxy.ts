import NextAuth from "next-auth";
import { authEdgeConfig } from "@/lib/auth/edge-config";

const { auth } = NextAuth(authEdgeConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};
