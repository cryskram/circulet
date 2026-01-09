"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_ITEM } from "@/lib/operations";

export default function DeleteButton({
  itemId,
  isOwner,
  isAdmin,
}: {
  itemId: string;
  isOwner: boolean;
  isAdmin: boolean;
}) {
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM, {
    onCompleted: () => {
      window.location.replace("/");
    },
    onError: () => {
      alert("Failed to delete item");
    },
  });

  async function handleDelete() {
    if (!confirm("Delete this item?")) return;

    await deleteItem({
      variables: { id: itemId },
    });
  }

  if (!isAdmin && !isOwner) return null;

  return (
    <div className="flex w-full gap-3">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full rounded-md border border-red-300 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-900/30"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
