import Image from "next/image";
import ItemCard from "./ItemCard";
import Link from "next/link";

type ProfileViewProps = {
  user: {
    id: string;
    name?: string;
    username?: string;
    image?: string;
    gradYear?: number;
    items: any[];
  };
  isOwnProfile: boolean;
};

export default function ProfileView({
  user,
  isOwnProfile = false,
}: ProfileViewProps) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                    ?
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {user.name ?? "User"}
                </h1>

                {user.username && (
                  <p className="text-sm text-slate-500">@{user.username}</p>
                )}

                {user.gradYear && (
                  <p className="text-sm text-slate-500">
                    Class of {user.gradYear}
                  </p>
                )}
              </div>
            </div>

            {isOwnProfile && (
              <Link
                href={`/profile/${user.id}/edit`}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Edit profile
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              Listings
            </h2>

            <span className="text-sm text-slate-500">
              {user.items.length} item{user.items.length !== 1 ? "s" : ""}
            </span>
          </div>

          {user.items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500 dark:border-slate-600">
              No active listings
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {user.items.map((item: any) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
