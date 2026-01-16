"use client";

import Image from "next/image";
import ItemCard from "./ItemCard";
import Link from "next/link";
import { useState } from "react";

type ProfileViewProps = {
  user: {
    id: string;
    name?: string;
    username?: string;
    image?: string;
    gradYear?: number;
    items: any[];
    requests: any[];
  };
  isOwnProfile: boolean;
};

export default function ProfileView({
  user,
  isOwnProfile = false,
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"items" | "requests">("items");

  const visibleRequests = isOwnProfile
    ? user.requests
    : user.requests.filter((r) => r.status === "OPEN");

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

        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("items")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "items"
                ? "border-b-2 border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Listings ({user.items.length})
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "requests"
                ? "border-b-2 border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Requests ({visibleRequests.length})
          </button>
        </div>

        {activeTab === "items" && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
        )}

        {activeTab === "requests" && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {visibleRequests.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-sm text-slate-500 dark:border-slate-600">
                No active requests
              </div>
            ) : (
              <div className="space-y-4">
                {visibleRequests.map((req: any) => (
                  <Link
                    key={req.id}
                    href={`/requests/${req.id}`}
                    className="block rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {req.title}
                      </h3>
                      {isOwnProfile && (
                        <span className="text-xs text-slate-500">
                          {req.status}
                        </span>
                      )}
                    </div>

                    {req.description && (
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {req.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
