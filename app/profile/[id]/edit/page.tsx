import { auth } from "@/auth";
import { getClient } from "@/lib/apolloServerClient";
import { redirect } from "next/navigation";
import { USER_BY_ID_QUERY } from "@/lib/operations";
import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { id } = await params;

  if (session.user.id !== id) {
    redirect(`/profile/${id}`);
  }

  const client = getClient();
  const { data }: any = await client.query({
    query: USER_BY_ID_QUERY,
    variables: { id },
  });

  if (!data?.userById) redirect("/");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Edit profile
        </h1>

        <EditProfileForm user={data.userById} />
      </div>
    </main>
  );
}
