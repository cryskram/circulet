import { auth } from "@/auth";
import { GET_ITEM } from "@/lib/operations";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/lib/apolloServerClient";
import DeleteButton from "@/components/DeleteButton";
import { FaWhatsapp } from "react-icons/fa6";
import ShareButton from "@/components/ShareButton";
import { notFound } from "next/navigation";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const client = getClient();

  const { data }: any = await client.query({
    query: GET_ITEM,
    variables: { id },
  });

  const item = data?.item;
  if (!item) notFound();

  const isOwner = session?.user?.id === item.owner.id;
  const isAdmin = session?.user.role === "ADMIN";
  const canModify = isOwner || isAdmin;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
            {item.images?.[0] ? (
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={item.images[0].replace(
                  "/upload/",
                  "/upload/w_20,q_1,e_blur:200/"
                )}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
                No image
              </div>
            )}
          </div>

          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.slice(1).map((img: string, i: number) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.category.name}
            </p>

            <div className="flex items-center justify-start gap-6">
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h1>

              <ShareButton
                title={item.title}
                text={`Check out ${item.title} on Circulet`}
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Pricing
            </p>

            {item.type === "RENT" && item.rentPolicy && (
              <>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    ₹{item.rentPolicy.price ?? "—"}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    per {item.rentPolicy.unit.toLowerCase()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Minimum {item.rentPolicy.minDuration}{" "}
                  {item.rentPolicy.unit.toLowerCase()}
                  {item.rentPolicy.minDuration > 1 ? "s" : ""}
                  {item.rentPolicy.maxDuration && (
                    <>
                      {" "}
                      · Maximum {item.rentPolicy.maxDuration}{" "}
                      {item.rentPolicy.unit.toLowerCase()}
                      {item.rentPolicy.maxDuration > 1 ? "s" : ""}
                    </>
                  )}
                </p>
              </>
            )}

            {item.type === "SELL" && (
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  ₹{item.price}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  one-time price
                </span>
              </div>
            )}

            {item.type === "FREE" && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Free
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  no cost
                </span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </h2>
            <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            {item.owner.image ? (
              <Image
                src={item.owner.image}
                alt={item.owner.name ?? "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-600" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {item.owner.name ?? "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Posted on{" "}
                {item.createdAt
                  ? new Date(Number(item.createdAt)).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  : "—"}
              </p>
            </div>
          </div>

          <div className="flex w-full gap-3">
            {!isOwner && item.owner.phone && (
              <Link
                href={`https://wa.me/${item.owner.phone}`}
                target="_blank"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-2 text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </Link>
            )}

            {canModify && (
              <div className="flex w-full gap-4">
                <Link
                  href={`/items/${item.id}/edit`}
                  className="w-full rounded-md border border-slate-300 py-2 text-center text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Edit
                </Link>

                <DeleteButton
                  itemId={item.id}
                  isOwner={isOwner}
                  isAdmin={isAdmin}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
