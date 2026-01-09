import Link from "next/link";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className=":border-slate-700/50 fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-slate-900/50 bg-white/70 px-6 py-4 backdrop-blur-md dark:bg-slate-900/70">
      <Link href="/" className="text-lg font-semibold">
        Circulet
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
