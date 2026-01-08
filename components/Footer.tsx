import Link from "next/link";
import { FaCopyright, FaHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-900">Circulet</h3>
          <p className="text-sm text-neutral-600 max-w-xs">
            A campus-first marketplace for students to buy, sell, and reuse
            items responsibly.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-neutral-900">Explore</h4>
          <ul className="space-y-1 text-sm text-neutral-600">
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
          <h4 className="text-sm font-medium text-neutral-900">About</h4>
          <p className="text-sm text-neutral-600">
            Built for campus communities to promote affordability,
            sustainability, and reuse.
          </p>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
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
