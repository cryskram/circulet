"use client";

import Select from "@/components/Select";
import { CREATE_REQUEST, GET_ITEMS_AND_CATEGORIES } from "@/lib/operations";
import { useMutation, useQuery } from "@apollo/client/react";
import toast from "react-hot-toast";

export default function NewRequestPage() {
  const { data }: any = useQuery(GET_ITEMS_AND_CATEGORIES);

  const [createRequest, { loading }] = useMutation(CREATE_REQUEST, {
    onCompleted: () => {
      toast.success("Request posted");
      window.location.replace("/requests");
    },
    onError: () => toast.error("Failed to post request"),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    await createRequest({
      variables: {
        title: form.get("title"),
        description: form.get("description"),
        type: form.get("type"),
        categoryId: form.get("category"),
        budget: form.get("budget") ? Number(form.get("budget")) : null,
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
              name="title"
              required
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Category *
            </label>
            <Select name="category">
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
                Type *
              </label>
              <Select name="type">
                <option value="BUY">Buy</option>
                <option value="RENT">Rent</option>
                <option value="BORROW">Borrow</option>
                <option value="FREE">Free</option>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Budget (optional)
              </label>
              <input
                name="budget"
                type="number"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
          >
            {loading ? "Posting..." : "Post request"}
          </button>
        </form>
      </div>
    </main>
  );
}
