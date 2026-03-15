"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const DELIVERY_FEE = subtotal > 5000 ? 0 : 499;
  const total = subtotal + DELIVERY_FEE;

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      setLoading(true);

      /* --------------------------
         STEP 1: CREATE RAZORPAY ORDER
      --------------------------- */

      const paymentRes = await api.post("/payment/create-advance", {
        items,
        totalAmount: total,
        shippingAddress: form
      });

      const paymentData = paymentRes.data;

      /* --------------------------
         STEP 2: OPEN RAZORPAY
      --------------------------- */

      const options = {

        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: paymentData.razorpayOrder.amount,

        currency: "INR",

        name: "Bhairvee Creations",

        description: "Advance Payment",

        order_id: paymentData.razorpayOrder.id,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: false,
          emi: false,
          paylater: false
        },

        handler: async function (response: any) {

          /* --------------------------
             STEP 3: VERIFY PAYMENT
             (THIS WILL CREATE ORDER)
          --------------------------- */

          await api.post("/payment/verify-advance", {

            ...response,

            items,
            totalAmount: total,
            shippingAddress: form

          });

          clearCart();

          router.push("/order-success");

        },

        theme: {
          color: "#D4AF37"
        }

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

    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-2xl font-bold mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Full Name"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Address"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, addressLine: e.target.value })
          }
        />

        <input
          placeholder="City"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <input
          placeholder="State"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
        />

        <input
          placeholder="Pincode"
          required
          className="w-full border p-3"
          onChange={(e) =>
            setForm({ ...form, pincode: e.target.value })
          }
        />

        <div className="border-t pt-4 mt-6 space-y-2">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {DELIVERY_FEE === 0 ? "Free" : `₹${DELIVERY_FEE}`}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-yellow-600 font-semibold">
            <span>Advance (50%)</span>
            <span>₹{Math.round(total * 0.5)}</span>
          </div>

        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 mt-6 rounded-lg"
        >
          {loading ? "Processing..." : "Pay 50% Advance"}
        </button>

      </form>

    </div>

  );

}