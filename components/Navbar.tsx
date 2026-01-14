import Link from "next/link";
import { auth } from "@/auth";
import ThemeToggle from "./ThemeToggle";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";
import Image from "next/image";

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
            <span className="hidden text-lg font-semibold md:block">
              Circulet
            </span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/items"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Browse
            </Link>

            <Link
              href="/requests"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Requests
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!session?.user && <LoginButton text="Login" />}

          {session?.user && <UserMenu user={session.user} />}
        </div>
      </div>
    </nav>
  );
}
