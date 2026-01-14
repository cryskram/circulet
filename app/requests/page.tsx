import { getClient } from "@/lib/apolloServerClient";
import { GET_REQUESTS } from "@/lib/operations";
import Link from "next/link";

export default async function RequestsPage() {
  const client = getClient();
  const { data }: any = await client.query({ query: GET_REQUESTS });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Requests
          </h1>

          <Link
            href="/requests/new"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
          >
            Post request
          </Link>
        </div>

        {data.requests.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No active requests
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {data.requests.map((req: any) => (
              <Link
                key={req.id}
                href={`/requests/${req.id}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="line-clamp-2 font-medium text-slate-900 dark:text-slate-100">
                  {req.title}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {req.category.name}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 uppercase">
                  <span>{req.type}</span>
                  {req.budget && <span>₹{req.budget}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
