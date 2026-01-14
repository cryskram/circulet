import Link from "next/link";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-slate-500/50 bg-white/70 px-6 py-4 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/70">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo-dark.svg"
          alt="Circulet logo"
          width={36}
          height={36}
          className="block dark:hidden"
        />
        <Image
          src="/images/logo-light.svg"
          alt="Circulet logo"
          width={36}
          height={36}
          className="hidden dark:block"
        />

        <span className="text-lg font-semibold">Circulet</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/items" className="text-sm">
          Browse
        </Link>

        <ThemeToggle />

        {!session?.user && <LoginButton text="Login" />}

        {session?.user && <UserMenu user={session.user} />}
      </div>
    </nav>
  );
}
