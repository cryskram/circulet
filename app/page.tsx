"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>
        {session?.user
          ? "Welcome back " + session.user.name
          : "Sign in to proceed"}
      </h1>
      <div className="mt-4">
        {!session?.user ? (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white p-2"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full border-4 border-black p-1"
              src={session.user.image as string}
              width={64}
              height={64}
              alt="pfp"
            />
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white p-2"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
