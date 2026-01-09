import Link from "next/link";
import { FaCopyright, FaHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-900">Circulet</h3>
          <p className="max-w-xs text-sm text-slate-600">
            A campus-first marketplace for students to buy, sell, and reuse
            items responsibly.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-900">Explore</h4>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/items" className="hover:underline">
                Browse items
              </Link>
            </li>
            <li>
              <Link href="/new" className="hover:underline">
                Post an item
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-900">About</h4>
          <p className="text-sm text-slate-600">
            Built for campus communities to promote affordability,
            sustainability, and reuse.
          </p>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-500 sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <FaCopyright size={16} /> {new Date().getFullYear()} Circulet. All
            rights reserved.
          </span>
          <span className="inline-flex items-center gap-1">
            Made with <FaHeart /> by{" "}
            <Link
              href="https://github.com/cryskram"
              className="underline"
              target="_blank"
            >
              cryskram
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
