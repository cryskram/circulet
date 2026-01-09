"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaCaretDown } from "react-icons/fa6";
import Image from "next/image";

type Props = {
  user: {
    name?: string | null;
    image?: string | null;
  };
};

export default function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border bg-white px-2 py-1 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>

        <FaCaretDown
          size={14}
          className={`text-slate-600 transition-transform dark:text-slate-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <Link
            href="/new"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Post item
          </Link>

          <div className="border-t border-slate-200 dark:border-slate-700" />

          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
