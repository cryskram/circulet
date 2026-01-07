"use client";

import { signIn } from "next-auth/react";

export default function LoginButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-block bg-neutral-900 text-white px-6 py-2 rounded-md shadow-sm hover:shadow-md transition"
    >
      {text}
    </button>
  );
}
