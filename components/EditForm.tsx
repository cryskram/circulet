"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_ITEM, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import Select from "@/components/Select";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditForm({ item }: { item: any }) {
  const { data }: any = useQuery(GET_ITEMS_AND_CATEGORIES);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [price, setPrice] = useState(item.price ?? "");
  const [categoryId, setCategoryId] = useState(item.category.id);

  const rent = item.rentPolicy;

  const [rentUnit, setRentUnit] = useState(rent?.unit ?? "DAY");
  const [rentPrice, setRentPrice] = useState(
    rent?.price != null ? String(rent.price) : ""
  );
  const [minDuration, setMinDuration] = useState(
    rent?.minDuration != null ? String(rent.minDuration) : "1"
  );
  const [maxDuration, setMaxDuration] = useState(
    rent?.maxDuration != null ? String(rent.maxDuration) : ""
  );

  const [updateItem, { loading }] = useMutation(UPDATE_ITEM, {
    onCompleted: () => {
      toast.success("Item updated");
      window.location.replace(`/items/${item.id}`);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (type === "RENT" && !rentUnit) {
      toast.error("Rent unit required");
      return;
    }

    await updateItem({
      variables: {
        id: item.id,
        title,
        description,
        type,
        categoryId,
        price: type === "SELL" ? Number(price) : null,

        rentPolicy:
          type === "RENT"
            ? {
                unit: rentUnit,
                price: rentPrice ? Number(rentPrice) : null,
                minDuration: Number(minDuration),
                maxDuration: maxDuration ? Number(maxDuration) : null,
              }
            : null,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
        </label>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {data?.categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Type
          </label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="SELL">Sell</option>
            <option value="RENT">Rent</option>
            <option value="FREE">Free</option>
          </Select>
        </div>

        {type !== "FREE" && (
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Price
            </label>
            <input
              type="number"
              disabled={type === "RENT"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        )}
      </div>

      {type === "RENT" && (
        <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Rent details
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Select
              value={rentUnit}
              onChange={(e) => setRentUnit(e.target.value)}
            >
              <option value="HOUR">Per hour</option>
              <option value="DAY">Per day</option>
              <option value="WEEK">Per week</option>
            </Select>

            <input
              type="number"
              placeholder="Price per unit"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />

            <input
              type="number"
              placeholder="Min duration"
              value={minDuration}
              onChange={(e) => setMinDuration(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />

            <input
              type="number"
              placeholder="Max duration (optional)"
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      )}

      {item.images?.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Current images
          </p>

          <div className="grid grid-cols-3 gap-3">
            {item.images.map((img: string, i: number) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md border dark:border-slate-700"
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
      >
        {loading ? "Saving changes..." : "Save changes"}
      </button>
    </form>
  );
}
