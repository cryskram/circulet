"use client";

import { FaShareNodes } from "react-icons/fa6";
import toast from "react-hot-toast";

type ShareButtonProps = {
  title: string;
  text?: string;
};

export default function ShareButton({ title, text }: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
      title="Share item"
    >
      <FaShareNodes size={14} />
      <span className="hidden sm:inline">Share</span>
    </button>
  );
}
