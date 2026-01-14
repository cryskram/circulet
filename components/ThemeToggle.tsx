"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex h-9 w-16 items-center rounded-full border border-slate-300 bg-slate-100 transition-colors duration-300 focus:ring-1 focus:ring-slate-400/40 focus:outline-none dark:border-slate-600 dark:bg-slate-800"
    >
      <span
        className={`absolute top-1/2 left-0.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-slate-100 shadow transition-transform duration-300 ease-out dark:bg-white dark:text-slate-700 ${isDark ? "translate-x-7" : "translate-x-0"} `}
      >
        {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
      </span>

      <span className="ml-2 text-slate-400 dark:text-slate-500">
        <FiSun size={14} />
      </span>

      <span className="mr-2 ml-auto text-slate-400 dark:text-slate-500">
        <FiMoon size={14} />
      </span>
    </button>
  );
}
