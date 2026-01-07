import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // whitelisted urls
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const session = await auth();

  // not logged in
  if (!session?.user) {
    return NextResponse.next();
  }

  // onboarding url
  if (session.user.isProfileComplete === false && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (session.user.isProfileComplete === true && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if no issue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
