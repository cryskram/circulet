import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import LoginButton from "@/components/LoginButton";

export default async function HomePage() {
  const session = await auth();

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const items = await prisma.item.findMany({
    where: { status: "AVAILABLE" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-neutral-900">
              A campus marketplace <br />
              built for students
            </h1>

            <p className="text-neutral-600 max-w-md">
              Buy, sell, or rent pre-owned items within your campus. Affordable,
              sustainable, and student-driven.
            </p>

            {!session?.user ? (
              <LoginButton text="Login with college email" />
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/browse"
                  className="px-5 py-3 rounded-md border bg-white shadow-sm hover:shadow-md transition"
                >
                  Browse items
                </Link>
                <Link
                  href="/new"
                  className="px-5 py-3 rounded-md bg-neutral-900 text-white shadow-sm hover:shadow-md transition"
                >
                  Post an item
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="h-64 rounded-xl bg-linear-to-br from-neutral-100 to-neutral-200 shadow-inner" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xl font-medium text-neutral-900 mb-6">
          Browse by category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/items?category=${cat.slug}`}
              className="rounded-lg border bg-white p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm font-medium text-neutral-800">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-neutral-900">
            Recent listings
          </h2>

          <Link
            href="/browse"
            className="text-sm text-neutral-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center text-neutral-500">
            No items listed yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/items/${item.id}`}
                className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2"
              >
                <div className="h-32 rounded-md bg-neutral-100" />

                <div className="flex-1 space-y-1">
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  <p className="text-sm text-neutral-600">
                    {item.category.name}
                  </p>
                </div>

                <p className="text-sm font-medium text-neutral-800">
                  {item.type === "FREE" ? "Free" : `₹${item.price}`}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
