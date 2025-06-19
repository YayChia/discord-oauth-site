import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });

      const guilds = await res.json();

      if (!Array.isArray(guilds)) return false;

      const isInBlockedGuild = guilds.some(g => g.id === "1110317468829876234");
      const isInAllowedGuild = guilds.some(g => g.id === "1163448917300629534");

      if (isInBlockedGuild) return false;
      return isInAllowedGuild;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
