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

  console.log(user.image);

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
        className="flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-neutral-100 transition"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-neutral-700">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>

        <FaCaretDown
          size={16}
          className={`text-neutral-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg overflow-hidden">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-neutral-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <Link
            href="/post"
            className="block px-4 py-2 text-sm hover:bg-neutral-100"
            onClick={() => setOpen(false)}
          >
            Post item
          </Link>

          <div className="border-t" />

          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm bg-red-400 hover:bg-red-400/80 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
