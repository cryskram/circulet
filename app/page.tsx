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
    where: { status: "AVAILABLE" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900">
              A campus marketplace <br />
              built for students
            </h1>

            <p className="text-slate-600 max-w-md mx-auto md:mx-0">
              Buy, sell, or rent pre-owned items within your campus. Affordable,
              sustainable, and student-driven.
            </p>

            {!session?.user ? (
              <LoginButton text="Login with college email" />
            ) : (
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  href="/items"
                  className="px-5 py-3 rounded-md border bg-white shadow-sm hover:shadow-md transition"
                >
                  Browse items
                </Link>
                <Link
                  href="/new"
                  className="px-5 py-3 rounded-md bg-slate-900 text-white shadow-sm hover:shadow-md transition"
                >
                  Post an item
                </Link>
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <Image
              src="/images/community.svg"
              alt="Students exchanging items"
              width={512}
              height={512}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xl font-medium text-slate-900 mb-6">
          Browse by category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/items?category=${cat.slug}`}
              className="rounded-lg border bg-white p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-sm font-medium text-slate-800">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-slate-900">
            Recent listings
          </h2>

          <Link
            href="/items"
            className="text-sm text-slate-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center text-slate-500">
            No items listed yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
