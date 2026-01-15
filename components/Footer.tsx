import Link from "next/link";
import { FaAnglesRight, FaHeart, FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Circulet
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A campus-first marketplace built to encourage reuse,
              affordability, and trust within student communities.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/items"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Browse items <FaAnglesRight />
            </Link>

            <Link
              href="/requests"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              View requests <FaAnglesRight />
            </Link>
          </div>
        </div>

        <div className="my-8 h-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex flex-col items-center gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <FaRegCopyright size={14} />
            {new Date().getFullYear()} Circulet. All rights reserved.
          </span>

          <span className="inline-flex items-center gap-1">
            Built with <FaHeart className="text-red-500" /> by{" "}
            <Link
              href="https://github.com/cryskram"
              target="_blank"
              className="underline hover:text-slate-900 dark:hover:text-slate-200"
            >
              cryskram
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
