import { getClient } from "@/lib/apolloServerClient";
import { GET_REQUEST } from "@/lib/operations";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import CloseRequestButton from "@/components/CloseRequestButton";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const client = getClient();
  const session = await auth();
  const { id } = await params;

  const { data }: any = await client.query({
    query: GET_REQUEST,
    variables: { id },
  });

  const request = data?.request;
  if (!request) notFound();

  console.log(data);

  const isOwner = session?.user?.id === request.requester.id;
  const isAdmin = session?.user?.role === "ADMIN";
  const canClose = isOwner || isAdmin;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="space-y-1">
            <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
              {request.category.name}
            </p>

            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {request.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 uppercase dark:border-slate-600 dark:text-slate-300">
              {request.type}
            </span>

            {request.budget && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Budget ₹{request.budget}
              </span>
            )}
          </div>

          {request.description && (
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {request.description}
            </p>
          )}

          {request.requestRentPolicy && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Rent details
              </p>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                <span>Unit</span>
                <span className="font-medium capitalize">
                  {request.requestRentPolicy.unit.toLowerCase()}
                </span>

                {request.requestRentPolicy.price != null && (
                  <>
                    <span>Price</span>
                    <span className="font-medium">
                      ₹{request.requestRentPolicy.price} / unit
                    </span>
                  </>
                )}

                <span>Min duration</span>
                <span className="font-medium">
                  {request.requestRentPolicy.minDuration}
                </span>

                {request.requestRentPolicy.maxDuration && (
                  <>
                    <span>Max duration</span>
                    <span className="font-medium">
                      {request.requestRentPolicy.maxDuration}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <Link
            href={`/profile/${request.requester.id}`}
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {request.requester.image && (
                <Image
                  src={request.requester.image}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {request.requester.name ?? "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Posted{" "}
                {new Date(Number(request.createdAt)).toLocaleDateString(
                  "en-IN",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </Link>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            {request.requester.phone && (
              <Link
                href={`https://wa.me/${request.requester.phone}`}
                target="_blank"
                className="flex-1 rounded-md bg-slate-900 py-2 text-center text-sm font-medium text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
              >
                Contact requester
              </Link>
            )}

            {canClose && (
              <div className="flex">
                <CloseRequestButton requestId={request.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
