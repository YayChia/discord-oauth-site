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
  [key: string]: unknown;
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

        try {
          const guilds: unknown = await res.json();
          if (Array.isArray(guilds)) {
            token.guilds = (guilds as DiscordGuild[]).map(g => g.id);
          } else {
            token.guilds = [];
          }
        } catch (e) {
          token.guilds = [];
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && typeof token.sub === "string") {
        session.user.id = token.sub;
      }

      if (Array.isArray(token.guilds)) {
        session.guilds = token.guilds;
      }

      return session;
    },

    async signIn({ account }) {
      if (!account?.access_token) return false;

      const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });

      try {
        const guilds: unknown = await res.json();
        if (!Array.isArray(guilds)) return false;

        const typedGuilds = guilds as DiscordGuild[];
        const isInAllowedGuild = typedGuilds.some(g => g.id === "1163448917300629534");
        const isInBlockedGuild = typedGuilds.some(g => g.id === "1110317468829876234");

        return isInAllowedGuild && !isInBlockedGuild;
      } catch (e) {
        return false;
      }
    },
  },
};
