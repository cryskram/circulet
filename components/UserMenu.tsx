"use client";

import { signOut } from "next-auth/react";

export default function UserMenu({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.name}</span>

      <button
        onClick={() => signOut()}
        className="text-sm border px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
