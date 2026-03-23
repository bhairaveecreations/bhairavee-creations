"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type Product = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type Order = {
  _id: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  orderStatus: string;
  paymentStatus: string;
  products?: Product[];
};

export default function PayRemaining() {

  const { orderId } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  /* Fetch Order */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
          { withCredentials: true }
        );
        setOrder(data);
      } catch (error) {
        console.error("Order fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  /* Load Razorpay */

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Pay */

  const payNow = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-remaining`,
        { orderId },
        { withCredentials: true }
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        order_id: data.razorpayOrder.id,
        name: "Bhairvee Creations",
        description: "Remaining Payment",

        handler: async function (response: any) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-remaining`,
            {
              ...response,
              orderId
            },
            { withCredentials: true }
          );

          alert("Payment successful");
          window.location.href = "/profile";
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  /* Loading */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading your order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Order Summary
        </h1>

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <span className={`px-4 py-1 rounded-full text-sm font-medium 
            ${order.paymentStatus === "fully-paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"}`}>
            {order.paymentStatus}
          </span>
        </div>

        {/* Product List */}
        {order.products && order.products.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-3">Products</h2>

            <div className="space-y-4">
              {order.products.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-md transition"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Advance Paid</span>
            <span>- ₹{order.advanceAmount}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Remaining</span>
            <span>₹{order.remainingAmount}</span>
          </div>
        </div>

        {/* Fully Paid */}
        {order.paymentStatus === "fully-paid" ? (
          <button
            disabled
            className="w-full bg-green-600 text-white py-3 rounded-xl cursor-not-allowed"
          >
            Payment Completed ✅
          </button>
        ) : (
          <>
            {order.orderStatus === "ready-for-shipping" &&
            order.paymentStatus === "advance-paid" ? (
              <button
                onClick={payNow}
                className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition font-medium"
              >
                Pay Remaining Amount
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
              >
                Waiting for Order Preparation
              </button>
            )}
          </>
        )}

      </div>
    </div>
  );
}