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
  const [price, setPrice] = useState(item.price ?? "");
  const [type, setType] = useState(item.type);
  const [categoryId, setCategoryId] = useState(item.category.id);

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

    await updateItem({
      variables: {
        id: item.id,
        title,
        description,
        type,
        categoryId,
        price: type === "FREE" ? null : Number(price),
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
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300"
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
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300"
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

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Price
          </label>
          <input
            type="number"
            disabled={type === "FREE"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-300 dark:disabled:bg-slate-800"
          />
        </div>
      </div>

      {item.images?.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Current images
          </p>

          <div className="grid grid-cols-3 gap-3">
            {item.images.map((img: string, i: number) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
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
