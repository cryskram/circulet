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

  console.log(isAdmin, isOwner);

  if (!isAdmin && !isOwner) return null;

  return (
    <div className="flex w-full gap-3">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full rounded-md bg-red-400 py-2 hover:bg-red-400/80 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
