"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Open menu"
      >
        <FiMenu size={20} className="text-slate-700 dark:text-slate-300" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <Link
            href="/items"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            Browse items
          </Link>
          <Link
            href="/requests"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            Requests
          </Link>

          <div className="border-t dark:border-slate-700" />

          <Link
            href="/about"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/guidelines"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            Guidelines
          </Link>
        </div>
      )}
    </div>
  );
}
