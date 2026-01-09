import Link from "next/link";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/15 z-50 flex items-center justify-between px-6 py-4 border-b">
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
