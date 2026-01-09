"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ONBOARDING_UPDATE } from "@/lib/operations";
import toast from "react-hot-toast";

export default function OnboardingPage() {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [loading, setLoading] = useState(false);

  const [completeOnboarding] = useMutation(ONBOARDING_UPDATE, {
    onCompleted: () => {
      toast.success("Profile Creation Complete");
      window.location.replace("/");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await completeOnboarding({
        variables: {
          phone,
          username,
          gradYear: gradYear ? Number(gradYear) : 0,
        },
      });
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
        <h1 className="text-xl font-semibold text-center">
          Complete your profile
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Please provide a few details before continuing. <br />
          Kindly confirm that the information provided is to the best of your
          knowledge.
        </p>

        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium">
            Phone number with country code
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 917338652387"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. cryskram"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Graduation year</label>
          <input
            type="number"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 2027"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
