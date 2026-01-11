import { auth } from "@/auth";
import EditForm from "@/components/EditForm";
import { getClient } from "@/lib/apolloServerClient";
import { GET_ITEM } from "@/lib/operations";
import { redirect } from "next/navigation";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { id } = await params;

  const client = getClient();
  const { data }: any = await client.query({
    query: GET_ITEM,
    variables: { id },
  });

  const item = data?.item;
  if (!item) redirect("/");

  const isOwner = session.user.id === item.owner.id;
  const isAdmin = session?.user.role === "ADMIN";
  if (!isOwner && !isAdmin) redirect(`/items/${item.id}`);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Edit item
        </h1>

        <EditForm item={item} />
      </div>
    </main>
  );
}
