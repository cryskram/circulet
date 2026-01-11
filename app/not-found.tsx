import Link from "next/link";

export default function NotFound() {
  return (
    <main className="animate-fade-in flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100">
          404
        </h1>

        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
          This page doesn’t exist
        </p>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The link might be broken, or the item may have been removed.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
          >
            Go home
          </Link>

          <Link
            href="/items"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Browse items
          </Link>
        </div>
      </div>
    </main>
  );
}
