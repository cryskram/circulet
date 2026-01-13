"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client/react";
import { ONBOARDING_UPDATE } from "@/lib/operations";

export default function EditProfileForm({ user }: { user: any }) {
  const [username, setUsername] = useState(user.username ?? "");
  const [gradYear, setGradYear] = useState(
    user.gradYear != null ? String(user.gradYear) : ""
  );
  const [phone, setPhone] = useState(user.phone ?? "");

  const [saveProfile, { loading }] = useMutation(ONBOARDING_UPDATE, {
    onCompleted: () => {
      toast.success("Profile updated");
      window.location.replace(`/profile/${user.id}`);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (phone && phone.length < 10) {
      toast.error("Phone number looks invalid");
      return;
    }

    await saveProfile({
      variables: {
        username: username || null,
        gradYear: gradYear ? Number(gradYear) : null,
        phone: phone || null,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-500">
              ?
            </div>
          )}
        </div>

        <p className="text-sm text-slate-500">
          Profile photo is managed via your login provider
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
        </label>
        <input
          value={user.name ?? ""}
          disabled
          className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourname"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
          placeholder="10-digit mobile number including country code"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
        <p className="mt-1 text-xs text-slate-500">
          Used for buyers to contact you
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Graduation year
        </label>
        <input
          type="number"
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
          placeholder="2026"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
