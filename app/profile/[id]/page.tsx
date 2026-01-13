import { auth } from "@/auth";
import { getClient } from "@/lib/apolloServerClient";
import { USER_BY_ID_QUERY } from "@/lib/operations";
import { notFound } from "next/navigation";
import ProfileView from "@/components/ProfileView";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  const client = getClient();
  const { data }: any = await client.query({
    query: USER_BY_ID_QUERY,
    variables: { id: id },
  });

  if (!data?.userById) {
    notFound();
  }

  const isOwnProfile = session?.user?.id === data.userById.id;

  return <ProfileView user={data.userById} isOwnProfile={isOwnProfile} />;
}
