"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

/* 💎 PREMIUM INPUT */
function PremiumInput({ label, placeholder, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-[#5c4b3a]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full mt-2
          bg-[#FAF9F6]
          border border-[#e6dfd5]
          rounded-2xl
          px-4 py-3
          text-[#2B1B14]

          focus:outline-none
          focus:border-[#D4AF37]
          focus:ring-2 focus:ring-[#D4AF37]/30

          transition-all duration-300
        "
      />
    </div>
  );
}

export default function CheckoutPage() {

  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(150);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* 💬 QUOTES */
  const quotes = [
    "✨ A beautiful creation is already taking shape for you.",
    "🌿 Crafted slowly, beautifully, and just for you.",
    "🎨 Your vision is becoming reality, one detail at a time.",
    "💛 Every piece we make carries intention and love."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  /* 💰 CALCULATIONS */
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee;

  /* 📦 PINCODE */
  const handlePincodeChange = (value: string) => {

    setForm({ ...form, pincode: value });

    if (value.length === 6) {

      if (value.startsWith("411") || value.startsWith("412")) {
        setDeliveryFee(0);
      } else {
        setDeliveryFee(150);
      }
    }
  };

  /* 💳 PAYMENT */
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      const paymentRes = await api.post("/payment/create-advance", {
        items,
        totalAmount: total,
        shippingAddress: form
      });

      const paymentData = paymentRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.razorpayOrder.amount,
        currency: "INR",
        name: "Bhairvee Creations",
        description: "Advance Payment",
        order_id: paymentData.razorpayOrder.id,

        handler: async function (response: any) {

          await api.post("/payment/verify-advance", {
            ...response,
            items,
            totalAmount: total,
            shippingAddress: form
          });

          clearCart();
          router.push("/order-success");
        },

        theme: { color: "#D4AF37" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {

      alert(error.response?.data?.message || "Checkout failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f2] via-[#f3efe9] to-[#ede7df] py-16 px-4 pt-30">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* 🔥 LEFT: FORM */}
        <div className="
          bg-white/60 backdrop-blur-xl
          border border-white/40
          rounded-3xl
          p-6 md:p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        ">

          <h2 className="text-2xl font-serif text-[#2B1B14] mb-6">
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-4">
              <PremiumInput
                label="👤 Full Name"
                placeholder="Enter your name"
                onChange={(e:any)=>setForm({...form, fullName:e.target.value})}
              />

              <PremiumInput
                label="📱 Phone"
                placeholder="Enter mobile number"
                onChange={(e:any)=>setForm({...form, phone:e.target.value})}
              />
            </div>

            <PremiumInput
              label="📍 Address"
              placeholder="House, street, landmark"
              onChange={(e:any)=>setForm({...form, addressLine:e.target.value})}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <PremiumInput
                label="🏙 City"
                placeholder="Enter city"
                onChange={(e:any)=>setForm({...form, city:e.target.value})}
              />

              <PremiumInput
                label="🌍 State"
                placeholder="Enter state"
                onChange={(e:any)=>setForm({...form, state:e.target.value})}
              />
            </div>

            <PremiumInput
              label="📦 Pincode"
              placeholder="6-digit pincode"
              onChange={(e:any)=>handlePincodeChange(e.target.value)}
            />

            <button
              disabled={loading}
              className="
                w-full py-4 rounded-2xl
                font-semibold text-lg text-black

                bg-gradient-to-r from-[#D4AF37] via-[#f0d36a] to-[#C19A2B]

                shadow-[0_12px_35px_rgba(212,175,55,0.4)]
                hover:shadow-[0_20px_50px_rgba(212,175,55,0.6)]
                hover:scale-[1.02]
                active:scale-[0.98]

                transition-all duration-300
              "
            >
              {loading ? "Processing..." : "Pay 50% Advance →"}
            </button>

          </form>

        </div>

        {/* 💎 RIGHT: SUMMARY */}
        <div className="
          bg-white/60 backdrop-blur-xl
          border border-white/40
          rounded-3xl
          p-6 md:p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        ">

          <h2 className="text-2xl font-serif text-[#2B1B14] mb-6">
            Order Summary
          </h2>

          {/* ✨ QUOTE BLOCK */}
          <div className="
            mb-6 p-5 rounded-2xl
            bg-gradient-to-br from-[#fff8e1] to-[#f5e6b8]
            border border-[#D4AF37]/20
            text-center
            shadow-[0_10px_30px_rgba(212,175,55,0.15)]
          ">

            <p className="text-sm text-[#7a6a58] mb-2">
              ✨ Your order is being prepared with care
            </p>

            <p className="text-[#2B1B14] font-serif text-lg leading-relaxed">
              {randomQuote}
            </p>

          </div>

          {/* 💰 PRICE */}
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-[#D4AF37] font-semibold">
              <span>Advance (50%)</span>
              <span>₹{Math.round(total * 0.5)}</span>
            </div>

          </div>

          {/* 🔒 TRUST */}
          <div className="mt-6 text-xs text-center text-[#8a7a65]">
            🔒 Secure payment powered by Razorpay
            <br />
            🌿 Handmade with devotion • Delivered with care
          </div>

        </div>

      </div>

    </div>
  );
}