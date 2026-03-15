"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", form);
      router.push("/profile");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (

    <main className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Brand */}

        <h1 className="text-center text-3xl font-serif text-[#2B1B14] mb-2">
          Bhairvee
        </h1>

        <p className="text-center text-gray-500 text-sm mb-8">
          Sign in to continue your sacred resin journey
        </p>

        {/* Card */}

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}

            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}

            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* Login Button */}

            <button
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C19A2B] text-black py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              Sign In
            </button>

            {/* Extra Links */}

            <div className="text-center text-sm text-gray-500 mt-4">

              <p className="mb-2 cursor-pointer hover:text-black">
                Forgot password?
              </p>

              <p>
                New here?{" "}
                <span
                  onClick={() => router.push("/register")}
                  className="text-[#C19A2B] cursor-pointer"
                >
                  Create account
                </span>
              </p>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}