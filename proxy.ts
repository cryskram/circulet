import { auth } from "@/auth";
import { NextResponse } from "next/server";

const AUTH_REQUIRED_PATHS = ["/new", "/profile", "/myItems", "/requests/new"];

export async function proxy(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const session = await auth();

  const isAuthRequired = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (isAuthRequired && !session?.user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    session?.user &&
    session.user.isProfileComplete === false &&
    pathname !== "/onboarding"
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (
    session?.user &&
    session.user.isProfileComplete === true &&
    pathname === "/onboarding"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session?.user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
