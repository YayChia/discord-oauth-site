import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = (req as any).nextauth.token as {
      guilds?: string[];
    };

    const allowedGuildId = "1163448917300629534";
    const blockedGuildId = "1110317468829876234";

    const userGuilds = token.guilds ?? [];

    const isAllowed = userGuilds.includes(allowedGuildId);
    const isBlocked = userGuilds.includes(blockedGuildId);

    // ❌ Deny if not in allowed, or if in blocked
    if (!isAllowed || isBlocked) {
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
