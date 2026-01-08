"use client";

import { useMutation } from "@apollo/client/react";
import { DELETE_ITEM } from "@/lib/operations";

export default function DeleteButton({
  itemId,
  isOwner,
}: {
  itemId: string;
  isOwner: boolean;
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

  if (!isOwner) return null;

  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full bg-red-400 hover:bg-red-400/80 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
