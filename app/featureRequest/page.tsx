"use client";

import Image from "next/image";
import { useState } from "react";

const FeatureRequest = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      setName("");
      setEmail("");
      setMessage("");
      alert("Thanks! Your feature request has been sent.");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-slate-50 px-4 py-30 dark:bg-slate-800">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Request a Feature
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Have an idea to improve Circulet? We'd love to hear it.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="hidden justify-center md:flex">
            <Image
              src="/images/logo-dark.svg"
              alt="Circulet"
              width={420}
              height={420}
              className="block dark:hidden"
            />
            <Image
              src="/images/logo-light.svg"
              alt="Circulet"
              width={420}
              height={420}
              className="hidden dark:block"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Feature idea
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Describe your idea clearly..."
                  className="mt-1 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900"
              >
                {loading ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequest;
