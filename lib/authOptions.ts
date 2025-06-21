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
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        try {
          const res = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          });

          const guilds: unknown = await res.json();
          if (Array.isArray(guilds)) {
            token.guilds = (guilds as DiscordGuild[]).map(g => g.id);
            console.log("JWT Callback: User guilds", token.guilds);
          } else {
            token.guilds = [];
            console.warn("JWT Callback: Guilds response is not an array.");
          }
        } catch (err) {
          console.error("JWT Callback: Failed to fetch guilds", err);
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
      if (!account?.access_token) return "/no-access";

      try {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const guilds: unknown = await res.json();
        if (!Array.isArray(guilds)) return "/no-access";

        const typedGuilds = guilds as DiscordGuild[];
        const guildIds = typedGuilds.map(g => g.id);
        console.log("SignIn Callback: User guilds", guildIds);

        const isInAllowedGuild = guildIds.includes("1163448917300629534");
        const isInBlockedGuild = guildIds.includes("1110317468829876234");

        if (isInAllowedGuild && !isInBlockedGuild) {
          console.log("✅ User is allowed, proceeding with sign-in");
          return true;
        } else {
          console.warn("❌ User blocked or not allowed. Redirecting to /no-access");
          return "/no-access";
        }
      } catch (err) {
        console.error("SignIn Callback: Failed to fetch guilds", err);
        return "/no-access";
      }
    },
  },
};
