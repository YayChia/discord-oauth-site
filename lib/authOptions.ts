import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";

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
      if (account) {
        token.accessToken = account.access_token;

        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const guilds = await res.json();
        if (Array.isArray(guilds)) {
          token.guilds = (guilds as { id: string }[]).map(g => g.id);
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
      const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${account?.access_token}`,
        },
      });

      const guilds = await res.json();
      if (!Array.isArray(guilds)) return false;

      const isInAllowedGuild = guilds.some(g => g.id === "1163448917300629534");
      const isInBlockedGuild = guilds.some(g => g.id === "1110317468829876234");

      return isInAllowedGuild && !isInBlockedGuild;
    },
  },
};
