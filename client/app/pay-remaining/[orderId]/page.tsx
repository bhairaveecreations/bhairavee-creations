"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type Order = {
  _id: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  orderStatus: string;
  paymentStatus: string;
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

  /* Load Razorpay Script */

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

  }, []);

  /* Pay Remaining */

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
      <div className="flex justify-center items-center h-screen">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Order not found</p>
      </div>
    );
  }

  return (

    <div className="flex flex-col items-center justify-center h-screen text-center px-6">

      <h1 className="text-3xl font-bold mb-6">
        Order Payment
      </h1>

      {/* If fully paid */}

      {order.paymentStatus === "fully-paid" ? (

        <>
          <p className="text-green-600 font-semibold text-lg mb-3">
            Payment Completed ✅
          </p>

          <p className="mb-2">
            Total Amount Paid: ₹{order.totalAmount}
          </p>

          <p className="text-gray-500 mb-6">
            Your order will be shipped soon.
          </p>

          <button
            disabled
            className="bg-green-600 text-white px-6 py-3 rounded cursor-not-allowed"
          >
            Payment Completed
          </button>
        </>

      ) : (

        <>
          <p className="mb-2">
            Total Amount: ₹{order.totalAmount}
          </p>

          <p className="mb-2">
            Advance Paid: ₹{order.advanceAmount}
          </p>

          <p className="mb-6 font-semibold text-lg">
            Remaining: ₹{order.remainingAmount}
          </p>

          <p className="text-sm text-gray-500">
            Order Status: {order.orderStatus}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Payment Status: {order.paymentStatus}
          </p>

          {order.orderStatus === "ready-for-shipping" &&
          order.paymentStatus === "advance-paid" ? (

            <button
              onClick={payNow}
              className="bg-black text-white px-6 py-3 rounded hover:opacity-80 transition"
            >
              Pay Remaining Amount
            </button>

          ) : (

            <button
              disabled
              className="bg-gray-400 text-white px-6 py-3 rounded cursor-not-allowed"
            >
              Waiting for Order Preparation
            </button>

          )}
        </>

      )}

    </div>

  );

}