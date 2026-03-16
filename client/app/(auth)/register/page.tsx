"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {

  const router = useRouter();
  const { fetchProfile } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/auth/register", form);

      await fetchProfile();

      router.push("/profile");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <h1 className="text-center text-3xl font-serif text-[#2B1B14] mb-2">
          Bhairvee
        </h1>

        <p className="text-center text-gray-500 text-sm mb-8">
          Create an account to begin your sacred resin journey
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              required
              placeholder="Your full name"
              value={form.name}
              className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              required
              type="password"
              placeholder="Create a password"
              value={form.password}
              className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C19A2B] text-black py-3 rounded-xl font-semibold"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-[#C19A2B] cursor-pointer"
              >
                Sign in
              </span>
            </p>

          </form>

        </div>

      </div>

    </main>
  );
}