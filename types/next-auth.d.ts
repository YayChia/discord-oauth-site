// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
    guilds?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    accessToken?: string;
    guilds?: string[];
  }
}
