import DiscordProvider from "next-auth/providers/discord";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

const allowedGuildId = "1163448917300629534";
const blockedGuildId = "1110317468829876234";

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
  callbacks: {
    async signIn({ account, profile }) {
      try {
        const res = await axios.get("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account?.access_token}`,
          },
        });

        const guilds = res.data as { id: string }[];

        const guildIds = guilds.map((g) => g.id);
        console.log("🔎 SignIn Callback: User guilds", guildIds);

        const inAllowed = guildIds.includes(allowedGuildId);
        const inBlocked = guildIds.includes(blockedGuildId);

        if (!inAllowed || inBlocked) {
          console.warn("❌ Access denied due to guild restrictions.");
          return false;
        }

        // ✅ Store guilds in profile for JWT use
        (profile as any).guilds = guildIds;
        return true;

      } catch (error) {
        console.error("❌ Error fetching guilds:", error);
        return false;
      }
    },

    async jwt({ token, profile }) {
      if (profile && (profile as any).guilds) {
        token.guilds = (profile as any).guilds;
      }

      // Ensure token.guilds is always an array
      if (!Array.isArray(token.guilds)) {
        console.warn("⚠️ JWT Callback: Guilds response is not an array.", token.guilds);
        token.guilds = [];
      }

      return token;
    },

    async session({ session, token }) {
      session.guilds = token.guilds ?? [];
      return session;
    },
  },
  pages: {
    error: "/no-access",
  },
};
