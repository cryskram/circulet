import { auth } from "@/auth";
import { DELETE_ITEM, GET_ITEM } from "@/lib/operations";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/lib/apolloServerClient";
import { useMutation } from "@apollo/client/react";
import DeleteButton from "@/components/DeleteButton";
import { FaWhatsapp } from "react-icons/fa6";

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
  if (!item) {
    window.location.replace("/");
  }

  const isOwner = session?.user?.id === item.owner.id;
  const isAdmin = session?.user.role === "ADMIN";

  const canModify = isOwner || isAdmin;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
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
              <div className="flex h-full items-center justify-center text-slate-400">
                No image
              </div>
            )}
          </div>

          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.slice(1).map((img: string, i: number) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-md overflow-hidden bg-slate-100"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500">{item.category.name}</p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {item.title}
            </h1>
          </div>

          <div className="text-xl font-medium">
            {item.type === "FREE" ? "Free" : item.price ? `₹${item.price}` : ""}
            <span className="ml-2 text-sm uppercase text-slate-500">
              {item.type}
            </span>
          </div>

          <div>
            <h2 className="text-sm font-medium text-slate-700">Description</h2>
            <p className="mt-2 text-slate-800 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-3 border-t pt-4">
            {item.owner.image ? (
              <Image
                src={item.owner.image}
                alt={item.owner.name ?? "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-slate-200" />
            )}
            <div>
              <p className="text-sm font-medium">{item.owner.name ?? "User"}</p>
              <p className="text-xs text-slate-500">
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

          <div className="flex gap-3 w-full">
            {!isOwner && (
              <Link
                href={`https://wa.me/${item.owner.phone}`}
                target="_blank"
                className="w-full text-center bg-slate-900 text-white py-2 rounded-md transition items-center inline-flex justify-center gap-2"
              >
                <FaWhatsapp size={20} /> Chat on WhatsApp
              </Link>
            )}

            {canModify && (
              <div className="flex w-full gap-4">
                <Link
                  href={`/items/${item.id}/edit`}
                  className="border py-2 w-full rounded-md text-center hover:bg-slate-100"
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
