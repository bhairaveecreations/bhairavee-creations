"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccess() {

  const router = useRouter();

  return (

    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#f8f6f2] via-[#f3efe9] to-[#ede7df]
      px-4
    ">

      <div className="
        max-w-md w-full text-center

        bg-white/60 backdrop-blur-xl
        border border-white/40
        rounded-3xl
        p-8

        shadow-[0_25px_80px_rgba(0,0,0,0.1)]
      ">

        {/* 🎉 ICON */}
        <div className="
          text-5xl mb-4
          animate-bounce
        ">
          🎉
        </div>

        {/* 💎 TITLE */}
        <h1 className="text-2xl md:text-3xl font-serif text-[#2B1B14] mb-3">
          Your Order is Confirmed
        </h1>

        {/* ✨ SUBTEXT */}
        <p className="text-[#7a6a58] text-sm mb-6">
          Thank you for choosing Bhairvee Creations.
          Your handcrafted piece is now being prepared with love 💛
        </p>

        {/* 🌿 QUOTE BOX */}
        <div className="
          p-4 rounded-2xl mb-6
          bg-gradient-to-br from-[#fff8e1] to-[#f5e6b8]
          border border-[#D4AF37]/20
        ">

          <p className="text-[#2B1B14] font-serif text-base leading-relaxed">
            ✨ “Every creation carries a story — and yours has just begun.”
          </p>

        </div>

        {/* 📦 INFO */}
        <div className="text-xs text-[#8a7a65] mb-6 space-y-1">
          <p>📞 Our team will contact you within 24 hours</p>
          <p>🚚 Delivery updates will be shared soon</p>
        </div>

        {/* 🔘 ACTION BUTTONS */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => router.push("/")}
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r from-[#D4AF37] to-[#C19A2B]
              text-black font-semibold

              shadow-[0_10px_30px_rgba(212,175,55,0.4)]
              hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)]
              hover:scale-[1.02]
              active:scale-[0.98]

              transition-all duration-300
            "
          >
            Continue Exploring →
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="
              text-sm text-[#7a6a58]
              hover:text-[#2B1B14]
              transition
            "
          >
            View My Orders
          </button>

        </div>

      </div>

    </div>
  );
}