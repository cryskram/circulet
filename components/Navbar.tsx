import Link from "next/link";
import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-dark.svg"
              alt="Circulet"
              width={28}
              height={28}
              className="block dark:hidden"
            />
            <Image
              src="/images/logo-light.svg"
              alt="Circulet"
              width={28}
              height={28}
              className="hidden dark:block"
            />
            <span className="text-lg font-semibold">Circulet</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            <Link href="/items" className="nav-link">
              Browse
            </Link>
            <Link href="/requests" className="nav-link">
              Requests
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-2 hidden items-center gap-4 md:flex">
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/guidelines" className="nav-link">
              Guidelines
            </Link>
          </div>

          <ThemeToggle />

          {!session?.user && (
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Sign in
            </Link>
          )}

          {session?.user && <UserMenu user={session.user} />}

          <div className="md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
