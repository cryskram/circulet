"use client";

import { signIn } from "next-auth/react";

export default function LoginButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-block rounded-md bg-slate-900 px-6 py-2 text-white shadow-sm transition hover:shadow-md dark:bg-slate-50 dark:text-slate-900"
    >
      {text}
    </button>
  );
}
