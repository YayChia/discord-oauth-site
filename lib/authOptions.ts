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
      // Initial login - fetch guilds
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
            console.log("✅ JWT Callback (login): User guilds", token.guilds);
          } else {
            token.guilds = [];
            console.warn("⚠️ JWT Callback (login): Guilds response is not an array.");
          }
        } catch (err) {
          console.error("❌ JWT Callback (login): Failed to fetch guilds", err);
          token.guilds = [];
        }
      } else {
        // Subsequent requests: reuse previous token.guilds
        if (!token.guilds) {
          token.guilds = [];
          console.warn("⚠️ JWT Callback (session): Missing token.guilds, defaulting to empty.");
        } else {
          console.log("✅ JWT Callback (session): Reused guilds", token.guilds);
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

      try {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const guilds: unknown = await res.json();
        if (!Array.isArray(guilds)) return false;

        const typedGuilds = guilds as DiscordGuild[];
        const guildIds = typedGuilds.map(g => g.id);
        console.log("🔎 SignIn Callback: User guilds", guildIds);

        const isInAllowedGuild = guildIds.includes("1163448917300629534");
        const isInBlockedGuild = guildIds.includes("1110317468829876234");

        if (isInAllowedGuild && !isInBlockedGuild) {
          console.log("✅ User is allowed, proceeding with sign-in");
          return true;
        }

        console.warn("❌ User is NOT allowed, blocking sign-in");
        return false;
      } catch (err) {
        console.error("❌ SignIn Callback: Failed to fetch guilds", err);
        return false;
      }
    },
  },
};
