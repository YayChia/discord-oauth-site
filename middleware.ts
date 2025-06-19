import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Allow access to public routes (login, home, etc.)
  if (!request.nextUrl.pathname.startsWith('/event')) return NextResponse.next()

  if (!token) {
    // Not logged in
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Optionally add more checks (e.g., session.user.guilds if you pass that into the token/session)
  return NextResponse.next()
}

export const config = {
  matcher: ['/event/:path*'], // Protect /event and subroutes
}
