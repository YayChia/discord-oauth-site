import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;

const ALLOWED_GUILD = "1163448917300629534";
const BLOCKED_GUILD = "1110317468829876234";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (!account?.access_token) return false;

      try {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const guilds = await res.json();
        if (!Array.isArray(guilds)) {
          console.warn("⚠️ SignIn Callback: Guilds response is not an array.");
          return false;
        }

        const guildIds = guilds.map((g: any) => g.id);
        console.log("🔎 SignIn Callback: User guilds", guildIds);

        const isInAllowedGuild = guildIds.includes(ALLOWED_GUILD);
        const isInBlockedGuild = guildIds.includes(BLOCKED_GUILD);

        if (isInBlockedGuild || !isInAllowedGuild) {
          console.warn("❌ Access Denied: User in blocked guild or not in allowed guild");
          throw new Error("/no-access");
        }

        return true;
      } catch (err: any) {
        if (err.message === "/no-access") {
          return Promise.reject("/no-access");
        }
        console.error("❌ SignIn Error", err);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        try {
          const res = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          });

          const guilds = await res.json();
          if (Array.isArray(guilds)) {
            const guildIds = guilds.map((g: any) => g.id);
            token.guilds = guildIds;
            console.log("✅ JWT Callback: Stored guilds", guildIds);
          } else {
            console.warn("⚠️ JWT Callback: Guilds response is not an array.");
          }
        } catch (err) {
          console.error("❌ JWT Callback Error", err);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.guilds = token.guilds || [];
      return session;
    },
  },

  pages: {
    error: "/no-access",
  },
};
