"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

export default function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full border dark:border-slate-700">
          {user.image ? (
            <Image src={user.image} alt="User" fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-slate-300 dark:bg-slate-700" />
          )}
        </div>

        <FiChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          } text-slate-600 dark:text-slate-400`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          <div className="border-t dark:border-slate-700" />

          <Link
            href={`/profile/${user.id}`}
            className="menu-item"
            onClick={closeMenu}
          >
            Profile
          </Link>

          <Link href="/new" className="menu-item" onClick={closeMenu}>
            Add item
          </Link>

          <Link href="/requests/new" className="menu-item" onClick={closeMenu}>
            Add request
          </Link>

          <Link href="/requests" className="menu-item" onClick={closeMenu}>
            View requests
          </Link>

          <div className="border-t dark:border-slate-700" />

          <Link
            href="/api/auth/signout"
            className="menu-item text-red-500"
            onClick={closeMenu}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
