import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const blockedGuildId = "1110317468829876234";
    const allowedGuildId = "1163448917300629534";

    const guilds = token.guilds as string[] | undefined;

    // If the user is not in allowed guild or is in blocked guild, deny access
    if (!guilds?.includes(allowedGuildId) || guilds.includes(blockedGuildId)) {
      return NextResponse.redirect(new URL("/no-access", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/event/:path*"],
};
