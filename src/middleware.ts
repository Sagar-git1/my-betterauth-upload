import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🟡 MIDDLEWARE HIT:", pathname);

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🔐 Read session cookie directly
  const hasSession =
    req.cookies.get("better-auth.session-token") ||
    req.cookies.get("__Secure-better-auth.session-token");

  if (!hasSession) {
    console.log("🔴 no session cookie, redirecting");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
