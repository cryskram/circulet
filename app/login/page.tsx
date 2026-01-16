"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Redirecting to Google...
      </p>
    </div>
  );
}
