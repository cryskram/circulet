import { getClient } from "@/lib/apolloServerClient";
import { GET_REQUEST } from "@/lib/operations";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const client = getClient();
  const { id } = await params;
  const { data }: any = await client.query({
    query: GET_REQUEST,
    variables: { id },
  });

  const request = data?.request;
  if (!request) notFound();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {request.category.name}
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {request.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="uppercase">{request.type}</span>
            {request.budget && <span>• ₹{request.budget}</span>}
          </div>

          {request.description && (
            <p className="leading-relaxed text-slate-800 dark:text-slate-200">
              {request.description}
            </p>
          )}

          <div className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {request.requester.image && (
                <Image
                  src={request.requester.image}
                  alt="pfp"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {request.requester.name ?? "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Posted{" "}
                {new Date(Number(request.createdAt)).toLocaleDateString(
                  "en-IN",
                  { month: "short", day: "numeric", year: "numeric" }
                )}
              </p>
            </div>
          </div>

          {request.requester.phone && (
            <Link
              href={`https://wa.me/${request.requester.phone}`}
              target="_blank"
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
            >
              Contact requester
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
