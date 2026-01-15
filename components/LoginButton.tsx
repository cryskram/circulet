"use client";

import { signIn } from "next-auth/react";

export default function LoginButton({
  text,
  width = "reg",
}: {
  text: string;
  width?: "reg" | "full";
}) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-block ${width === "full" ? "w-full" : "w-fit"} rounded-md bg-slate-900 px-6 py-2 text-white shadow-sm transition hover:shadow-md dark:bg-slate-50 dark:text-slate-900`}
    >
      {text}
    </button>
  );
}
