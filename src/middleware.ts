import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const aifansSessionId = req?.cookies?.get("aifansSessionId")?.value;
  const publicRoutes = ["/", "/auth/login", "/auth/register"];
  const protectedRoutes = ["/main", "/me", "/game"];
  const path = req.nextUrl.pathname;
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }
  if (protectedRoutes.includes(path) && !aifansSessionId) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
