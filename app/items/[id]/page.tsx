import { auth } from "@/auth";
import { GET_ITEM } from "@/lib/operations";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/lib/apolloServerClient";
import DeleteButton from "@/components/DeleteButton";
import { FaWhatsapp } from "react-icons/fa6";
import ShareButton from "@/components/ShareButton";
import { notFound } from "next/navigation";
import LoginButton from "@/components/LoginButton";
import MarkItemStatusButton from "@/components/MarkStatusButton";

type ItemStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "REMOVED";

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

  const isAvailable = item.status === "AVAILABLE";

  const statusLabel = {
    AVAILABLE: "Available",
    RESERVED: "Reserved",
    SOLD: "Sold / Given Away",
    REMOVED: "Removed",
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-700">
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
                    className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700"
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-1">
              <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
                {item.category.name}
              </p>

              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h1>

                <ShareButton
                  title={item.title}
                  text={`Check out ${item.title} on Circulet`}
                />
              </div>

              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                  isAvailable
                    ? "border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300"
                    : "border-slate-400 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {statusLabel[item.status as keyof typeof statusLabel]}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border px-3 py-1 text-xs font-medium text-slate-600 uppercase dark:border-slate-600 dark:text-slate-300">
                  {item.type}
                </span>
              </div>

              {item.type === "RENT" && item.rentPolicy && (
                <>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                      ₹{item.rentPolicy.price ?? "-"}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      per {item.rentPolicy.unit.toLowerCase()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Min {item.rentPolicy.minDuration}{" "}
                    {item.rentPolicy.unit.toLowerCase()}
                    {item.rentPolicy.minDuration > 1 && "s"}
                    {item.rentPolicy.maxDuration && (
                      <>
                        {" "}
                        · Max {item.rentPolicy.maxDuration}{" "}
                        {item.rentPolicy.unit.toLowerCase()}
                        {item.rentPolicy.maxDuration > 1 && "s"}
                      </>
                    )}
                  </p>
                </>
              )}

              {item.type === "SELL" && (
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    one-time price
                  </span>
                </div>
              )}

              {item.type === "FREE" && (
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
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
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
                {item.description}
              </p>
            </div>

            <Link
              href={`/profile/${item.owner.id}`}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                {item.owner.image && (
                  <Image
                    src={item.owner.image}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {item.owner.name ?? "User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Posted{" "}
                  {new Date(Number(item.createdAt)).toLocaleDateString(
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

            {item.status !== "AVAILABLE" && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                {item.status === "RESERVED" &&
                  "This item is currently reserved. The seller may re-open it if the deal falls through."}

                {item.status === "SOLD" &&
                  "This item has been sold or given away and is no longer available."}

                {item.status === "REMOVED" &&
                  "This listing has been removed by the owner."}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              {session?.user &&
                !isOwner &&
                item.owner.phone &&
                (isAvailable || isAdmin) && (
                  <Link
                    href={`https://wa.me/${item.owner.phone}`}
                    target="_blank"
                    className="flex w-full justify-center rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FaWhatsapp size={18} />
                      Chat on WhatsApp
                    </span>
                  </Link>
                )}

              {isAvailable && !session?.user && (
                <div className="w-full">
                  <LoginButton text="Sign in to contact" width={"full"} />
                </div>
              )}

              {canModify && (
                <>
                  <Link
                    href={`/items/${item.id}/edit`}
                    className="mx-auto flex w-full justify-center rounded-md border border-slate-300 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    Edit
                  </Link>

                  <DeleteButton
                    itemId={item.id}
                    isOwner={isOwner}
                    isAdmin={isAdmin}
                  />
                </>
              )}
            </div>

            {canModify && (
              <div className="flex flex-col gap-2 sm:flex-row">
                {isAvailable && (
                  <>
                    <MarkItemStatusButton
                      itemId={item.id}
                      status="RESERVED"
                      label="Mark as Reserved"
                    />

                    <MarkItemStatusButton
                      itemId={item.id}
                      status="SOLD"
                      label="Mark as Sold / Given Away"
                    />
                  </>
                )}

                {item.status === "RESERVED" && (
                  <>
                    <MarkItemStatusButton
                      itemId={item.id}
                      status="AVAILABLE"
                      label="Re-open Listing"
                    />

                    <MarkItemStatusButton
                      itemId={item.id}
                      status="SOLD"
                      label="Mark as Sold"
                    />
                  </>
                )}
              </div>
            )}

            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              Circulet does not handle payments. Please transact responsibly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
