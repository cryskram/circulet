"use client";

import { useMutation } from "@apollo/client/react";
import { MARK_ITEM_STATUS } from "@/lib/operations";
import toast from "react-hot-toast";

export default function MarkItemStatusButton({
  itemId,
  status,
  label,
}: {
  itemId: string;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
  label: string;
}) {
  const [markStatus, { loading }] = useMutation(MARK_ITEM_STATUS, {
    onCompleted: () => {
      toast.success("Item status updated");
      window.location.reload();
    },
    onError: () => toast.error("Failed to update status"),
  });

  return (
    <button
      disabled={loading}
      onClick={() =>
        markStatus({
          variables: { id: itemId, status },
        })
      }
      className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {loading ? "Updating..." : label}
    </button>
  );
}
