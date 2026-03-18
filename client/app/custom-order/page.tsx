"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function CustomOrderPage() {

  const { user } = useAuthStore();
  const router = useRouter();

  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    productType: "",
    dimensions: "",
    colorPreference: "",
    budget: "",
    phone:"",
    message: "",
  });

  const quotes = [
    "✨ Your vision has been received. Beautiful things take time.",
    "🌿 A handcrafted creation is now being imagined for you.",
    "🎨 Every masterpiece begins with an idea like yours.",
    "✨ Your sacred creation journey has begun.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <p className="text-lg text-gray-600">
          Please login first to place a custom order.
        </p>
      </div>
    );
  }

  const submitRequest = async (e: any) => {
    e.preventDefault();

    try {
      await api.post("/custom-orders", form);
      setShowSuccess(true);
    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (

    <main className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 px-4">

      <div className="max-w-2xl mx-auto">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-4xl font-serif text-[#2B1B14]">
            Design Your Sacred Creation
          </h1>

          <p className="mt-3 text-gray-600 text-sm max-w-md mx-auto">
            Tell us your vision and we will craft a unique resin piece made especially for you.
          </p>

          <div className="flex justify-center gap-6 mt-6 text-xs text-gray-500">
            <span>🎨 Fully Custom</span>
            <span>🛠 Handmade</span>
            <span>⏱ 24h Response</span>
          </div>

        </div>

        {/* Form Card */}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">

          <form onSubmit={submitRequest} className="space-y-6">

            {/* Product Type */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                🎨 Product Type
              </label>

              <input
                placeholder="Tray, Table, Wall Frame..."
                className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition"
                onChange={(e) =>
                  setForm({ ...form, productType: e.target.value })
                }
              />
            </div>

            {/* Dimensions + Budget */}

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  📏 Size
                </label>

                <input
                  placeholder="12 x 18 in"
                  className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                  onChange={(e) =>
                    setForm({ ...form, dimensions: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  💰 Budget
                </label>

                <input
                  placeholder="₹1500 - ₹5000"
                  className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                />
              </div>

            </div>

            {/* Color */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                🌈 Color Preference
              </label>

              <input
                placeholder="Emerald Green with Gold flakes"
                className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                onChange={(e) =>
                  setForm({ ...form, colorPreference: e.target.value })
                }
              />
            </div>
                        <div>
              <label className="text-sm font-medium text-gray-700">
                📞 Phone No
              </label>

              <input
                placeholder="Emerald Green with Gold flakes"
                className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            {/* Message */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                💭 Your Idea
              </label>

              <textarea
                placeholder="Describe your idea, inspiration, or special request..."
                className="w-full mt-2 bg-[#FAFAFA] border border-gray-200 rounded-xl px-4 py-3 h-28 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none"
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
            </div>

            {/* Submit */}

            <button
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C19A2B] text-black py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-xl transition"
            >
              Submit Custom Request →
            </button>

          </form>

        </div>

      </div>

      {/* Success Popup */}

      {showSuccess && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">

            <div className="text-4xl mb-3">🎉</div>

            <h2 className="text-2xl font-serif text-[#2B1B14] mb-3">
              Request Submitted
            </h2>

            <p className="text-gray-600 mb-5">
              {randomQuote}
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Our team will contact you within 24 hours.
            </p>

            <button
              onClick={() => router.push("/")}
              className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl hover:shadow-lg transition"
            >
              Continue Exploring
            </button>

          </div>

        </div>

      )}

    </main>

  );
}