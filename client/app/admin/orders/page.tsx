"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {

    const res = await api.put(`/orders/${id}`, { status });

    const updatedOrder = res.data.order||res.data;

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? updatedOrder : order
      )
    );

  };

  const requestRemainingPayment = async (id: string) => {

    try {

      await api.post(`/orders/request-payment/${id}`);

      alert("Payment request sent to customer");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Failed to send payment request"
      );

    }

  };

  return (

    <div className="max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order._id}
            className="border p-4 rounded-lg space-y-2"
          >

            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentStatus}
            </p>

            {/* STATUS UPDATE */}

            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border p-2 rounded"
            >

              <option value="processing">
                Processing
              </option>

              <option value="ready-for-shipping">
                Ready For Shipping
              </option>

          

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

            {/* REQUEST PAYMENT BUTTON */}

            {order.orderStatus === "ready-for-shipping" &&
             order.paymentStatus === "advance-paid" && (

              <button
                onClick={() =>
                  requestRemainingPayment(order._id)
                }
                className="bg-yellow-600 text-white px-4 py-2 rounded mt-2"
              >
                Request Remaining Payment
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}