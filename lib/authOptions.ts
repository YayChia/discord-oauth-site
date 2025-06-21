// lib/authOptions.ts
import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";

// Extend the types for JWT and Session
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
    guilds?: string[];
  }

  interface JWT {
    sub?: string;
    guilds?: string[];
    accessToken?: string;
  }
}

interface DiscordGuild {
  id: string;
  [key: string]: unknown; // allow unknown props but only access .id
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        // Fetch user's guilds
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const guilds: DiscordGuild[] = await res.json();

        if (Array.isArray(guilds)) {
          token.guilds = guilds.map((g) => g.id);
        } else {
          token.guilds = [];
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }

      session.guilds = token.guilds;
      return session;
    },

    async signIn({ account }) {
      if (!account?.access_token) return false;

      const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });

      const guilds: DiscordGuild[] = await res.json();
      if (!Array.isArray(guilds)) return false;

      const isInAllowedGuild = guilds.some(g => g.id === "1163448917300629534");
      const isInBlockedGuild = guilds.some(g => g.id === "1110317468829876234");

      return isInAllowedGuild && !isInBlockedGuild;
    },
  },
};
