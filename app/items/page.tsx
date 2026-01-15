"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import Select from "@/components/Select";
import { useRouter, useSearchParams } from "next/navigation";

type Item = {
  id: string;
  title: string;
  price: number | null;
  type: "SELL" | "RENT" | "FREE";
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "REMOVED";
  category: {
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function BrowsePage() {
  const { data, loading, error } = useQuery<{
    items: Item[];
    categories: Category[];
  }>(GET_ITEMS_AND_CATEGORIES);

  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(next: {
    q?: string;
    category?: string;
    type?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.q !== undefined) {
      next.q ? params.set("q", next.q) : params.delete("q");
    }

    if (next.category !== undefined) {
      next.category === "all"
        ? params.delete("category")
        : params.set("category", next.category);
    }

    if (next.type !== undefined) {
      next.type === "all"
        ? params.delete("type")
        : params.set("type", next.type);
    }

    router.replace(`/items?${params.toString()}`, { scroll: false });
  }

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(
    searchParams.get("category") ?? "all"
  );
  const [type, setType] = useState(searchParams.get("type") ?? "all");

  const items =
    data?.items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || item.category.slug === category;

      const matchesType = type === "all" || item.type === type;

      return matchesSearch && matchesCategory && matchesType;
    }) ?? [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Browse items
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Search and filter items listed by students on campus
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateParams({ q: e.target.value });
            }}
            className="col-span-3 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-slate-300"
          />

          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              updateParams({ category: e.target.value });
            }}
          >
            <option value="all">All categories</option>
            {data?.categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>

          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              updateParams({ type: e.target.value });
            }}
          >
            <option value="all">All types</option>
            <option value="SELL">Sell</option>
            <option value="RENT">Rent</option>
            <option value="FREE">Free</option>
          </Select>
        </div>

        <button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setType("all");
            router.replace("/items");
          }}
          className="text-sm underline"
        >
          Clear filters
        </button>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:text-red-400">
            Failed to load items. {error.message}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="rounded-md border border-slate-200 bg-white p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No items match your filters.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
