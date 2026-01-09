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
    <div className="flex items-center rounded-lg border bg-slate-100 p-0.5 dark:bg-slate-800">
      <button
        onClick={() => setTheme("light")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
          !isDark
            ? "bg-slate-800 text-slate-400 shadow"
            : "text-slate-400 hover:bg-slate-400/40"
        } `}
        aria-label="Light mode"
      >
        <FiSun size={14} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
          isDark
            ? "bg-slate-200 text-slate-900 shadow"
            : "text-slate-400 hover:bg-slate-400/40"
        } `}
        aria-label="Dark mode"
      >
        <FiMoon size={14} />
      </button>
    </div>
  );
}
