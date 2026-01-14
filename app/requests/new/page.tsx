"use client";

import Select from "@/components/Select";
import { CREATE_REQUEST, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateRequestPage() {
  const { data } = useQuery<any>(GET_ITEMS_AND_CATEGORIES);

  const [createRequest, { loading }] = useMutation(CREATE_REQUEST, {
    onCompleted: () => {
      toast.success("Request posted");
      window.location.replace("/requests");
    },
    onError: (e) => toast.error(e.message || "Failed to create request"),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"BUY" | "RENT" | "BORROW" | "FREE">("BUY");
  const [categoryId, setCategoryId] = useState("");
  const [budget, setBudget] = useState("");

  const [rentUnit, setRentUnit] = useState<"HOUR" | "DAY" | "WEEK">("DAY");
  const [rentPrice, setRentPrice] = useState("");
  const [minDuration, setMinDuration] = useState(1);
  const [maxDuration, setMaxDuration] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    if (type === "RENT" && !minDuration) {
      toast.error("Please fill rent details");
      return;
    }

    await createRequest({
      variables: {
        title,
        description,
        type,
        categoryId,
        budget: type === "BUY" ? Number(budget) : null,

        requestRentPolicy:
          type === "RENT" || type === "BORROW"
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Post a request
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Title *
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
              Category *
            </label>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
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
                Request type *
              </label>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="BUY">Buy</option>
                <option value="RENT">Rent</option>
                <option value="BORROW">Borrow</option>
                <option value="FREE">Free</option>
              </Select>
            </div>

            {type === "BUY" && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Budget
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            )}
          </div>

          {(type === "RENT" || type === "BORROW") && (
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Rent / borrow details
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={rentUnit}
                  onChange={(e) => setRentUnit(e.target.value as any)}
                >
                  <option value="HOUR">Per hour</option>
                  <option value="DAY">Per day</option>
                  <option value="WEEK">Per week</option>
                </Select>

                <input
                  type="number"
                  placeholder="Price per unit (optional)"
                  value={rentPrice}
                  onChange={(e) => setRentPrice(e.target.value)}
                  className="rounded-md border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />

                <input
                  type="number"
                  placeholder="Min duration"
                  value={minDuration}
                  onChange={(e) => setMinDuration(Number(e.target.value))}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
          >
            {loading ? "Posting request..." : "Post request"}
          </button>
        </form>
      </div>
    </main>
  );
}
