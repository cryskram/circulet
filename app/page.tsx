import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import LoginButton from "@/components/LoginButton";
import ItemCard from "@/components/ItemCard";
import Image from "next/image";

export default async function HomePage() {
  const session = await auth();

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const items = await prisma.item.findMany({
    where: { status: { in: ["AVAILABLE", "RESERVED"] } },
    include: { category: true, rentPolicy: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <section className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-6 py-20 md:grid-cols-2">
          <div className="order-last space-y-6 text-center md:order-first md:text-left">
            <h1 className="text-4xl leading-tight font-semibold text-slate-900 dark:text-slate-100">
              A campus marketplace <br />
              built for students
            </h1>

            <p className="mx-auto max-w-md text-slate-600 md:mx-0 dark:text-slate-400">
              Buy, sell, or rent pre-owned items within your campus. Affordable,
              sustainable, and student-driven.
            </p>

            {!session?.user ? (
              <LoginButton text="Login with college email" />
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-center gap-4 md:justify-start">
                  <Link
                    href="/items"
                    className="rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-900 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    Browse items
                  </Link>

                  <Link
                    href="/new"
                    className="rounded-md bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:shadow-md dark:bg-slate-100 dark:text-slate-900"
                  >
                    Add an item
                  </Link>
                </div>
                <Link
                  href="/requests/new"
                  className="mt-4 text-sm text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
                >
                  Looking for something?
                </Link>
              </div>
            )}
          </div>

          <div className="relative order-first flex justify-center md:order-last">
            <Image
              src="/images/heroLight.png"
              alt="Students exchanging items"
              width={512}
              height={512}
              className="block w-full max-w-sm object-contain transition-opacity duration-300 md:max-w-lg dark:hidden"
              priority
            />

            <Image
              src="/images/heroDark.png"
              alt="Students exchanging items"
              width={512}
              height={512}
              className="hidden w-full max-w-sm object-contain transition-opacity duration-300 md:max-w-lg dark:block"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-xl font-medium text-slate-900 dark:text-slate-100">
          Browse by category
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/items?category=${cat.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-slate-900 dark:text-slate-100">
            Recent listings
          </h2>

          <Link
            href="/items"
            className="text-sm text-slate-600 hover:underline dark:text-slate-400"
          >
            View all
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            No items listed yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
