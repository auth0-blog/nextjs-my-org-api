// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";
import { isOrgAdmin } from "./lib/auth0-utils";

export async function proxy(request: NextRequest) {
 
  const authRes = await auth0.middleware(request);
  // Let Auth0 handle its own auth routes (/auth/login, /auth/callback, etc.)
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // Guard /admin routes - only accessible to authenticated org admins.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Must pass `request` here (required in proxy/middleware context)
    const session = await auth0.getSession(request);

    // Not authenticated: redirect to login
    if (!session) {
      const redirectRes = NextResponse.redirect(
        new URL(`/auth/login?returnTo=/admin`, request.nextUrl.origin)
      );

      // Copy set-cookie from authRes so rolling session / token refresh updates are preserved.
      authRes.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          redirectRes.headers.append("set-cookie", value);
        }
      });
      return redirectRes;
    }

    // Authenticated but not an org admin → redirect to home
    if (!isOrgAdmin(session.user)) {

      const redirectRes = NextResponse.redirect(new URL("/", request.nextUrl.origin));
      // Copy set-cookie from authRes so rolling session / token refresh updates are preserved.
      authRes.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          redirectRes.headers.append("set-cookie", value);
        }
      });
      return redirectRes;
    }
  }

  // For all other routes, return authRes.
  return authRes;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};