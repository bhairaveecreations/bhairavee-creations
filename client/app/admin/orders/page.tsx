"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminOrdersPage() {

  const router = useRouter();
  const { user, fetchProfile } = useAuthStore();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------
     Fetch Orders
  -------------------------- */

  const fetchOrders = async () => {

    try {

      const res = await api.get("/orders");

      setOrders(res.data);

    } catch (error: any) {

      if (error.response?.status === 401) {
        router.replace("/login");
      }

    } finally {

      setLoading(false);

    }

  };

  /* --------------------------
     Initial Load
  -------------------------- */

  useEffect(() => {

    const load = async () => {

      if (!user) {
        await fetchProfile();
      }

      const currentUser = user || useAuthStore.getState().user;

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      if (currentUser.role !== "admin") {
        router.replace("/");
        return;
      }

      fetchOrders();

    };

    load();

  }, []);

  /* --------------------------
     Update Order Status
  -------------------------- */

  const updateStatus = async (id: string, status: string) => {

    try {

      const res = await api.put(`/orders/${id}`, { status });

      const updatedOrder = res.data.order || res.data;

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? updatedOrder : order
        )
      );

    } catch {

      alert("Failed to update order");

    }

  };

  /* --------------------------
     Request Remaining Payment
  -------------------------- */

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

  /* --------------------------
     Loading State
  -------------------------- */

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading orders...
      </div>
    );

  }

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (

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

      )}

    </div>

  );

}