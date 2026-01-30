import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo-dark.svg"
                alt="Circulet"
                width={28}
                height={28}
                className="block dark:hidden"
              />
              <Image
                src="/images/logo-light.svg"
                alt="Circulet"
                width={28}
                height={28}
                className="hidden dark:block"
              />
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Circulet
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              A campus-first marketplace built to encourage reuse,
              affordability, and trust within student communities.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/items" className="footer-link">
                  Browse items
                </Link>
              </li>
              <li>
                <Link href="/requests" className="footer-link">
                  View requests
                </Link>
              </li>
              <li>
                <Link href="/new" className="footer-link">
                  Add an item
                </Link>
              </li>
              <li>
                <Link href="/requests/new" className="footer-link">
                  Add a request
                </Link>
              </li>

              <li>
                <Link href="/featureRequest" className="footer-link">
                  Feature request
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              About
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="footer-link">
                  About Circulet
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="footer-link">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-slate-200 dark:bg-slate-700" />

        <div className="flex flex-col items-center gap-3 text-xs text-slate-500 sm:flex-row sm:justify-between dark:text-slate-400">
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
