"use client";

import { CLOSE_REQUEST } from "@/lib/operations";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CloseRequestButton({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();

  const [closeRequest, { loading }] = useMutation(CLOSE_REQUEST, {
    onCompleted: () => {
      toast.success("Request closed");
      router.push("/requests");
    },
    onError: () => {
      toast.error("Failed to close request");
    },
  });

  return (
    <button
      onClick={() => closeRequest({ variables: { id: requestId } })}
      disabled={loading}
      className="w-full rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
    >
      {loading ? "Closing..." : "Close request"}
    </button>
  );
}
