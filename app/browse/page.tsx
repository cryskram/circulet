"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { useState } from "react";
import ItemCard from "@/components/ItemCard";
import Select from "@/components/Select";

type Item = {
  id: string;
  title: string;
  price: number | null;
  type: "SELL" | "RENT" | "FREE";
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

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

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
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Browse items
          </h1>
          <p className="text-sm text-neutral-600">
            Search and filter items listed by students on campus
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-5">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 col-span-3"
          />

          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {data?.categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>

          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            <option value="SELL">Sell</option>
            <option value="RENT">Rent</option>
            <option value="FREE">Free</option>
          </Select>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-neutral-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-md border bg-white p-6 text-sm text-red-600">
            Failed to load items. {error.message}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="rounded-md border bg-white p-10 text-center text-neutral-600">
            No items match your filters.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
