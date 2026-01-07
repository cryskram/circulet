"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // graphl should come here later
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          username,
          gradYear: gradYear ? Number(gradYear) : null,
        }),
      });

      // After successful onboarding
      router.replace("/");
    } catch (err) {
      console.error("Onboarding failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border rounded-lg p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Complete your profile</h1>

        <p className="text-sm text-gray-600">
          Please provide a few details before continuing.
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Graduation year</label>
          <input
            type="number"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
