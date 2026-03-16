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

  }, [orders]);

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
     Status Badge Colors
  -------------------------- */

  const statusStyle = (status: string) => {

    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "ready-for-shipping":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }

  };

  /* --------------------------
     Loading State
  -------------------------- */

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading orders...
      </div>
    );

  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Orders
        </h1>

        <span className="text-gray-500 text-sm">
          Total Orders: {orders.length}
        </span>

      </div>

      {orders.length === 0 ? (

        <div className="text-center py-20 border rounded-lg bg-gray-50">
          <p className="text-gray-500 text-lg">
            No orders found
          </p>
        </div>

      ) : (

        <div className="grid gap-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >

              {/* Top Row */}

              <div className="flex justify-between items-center mb-4">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="font-mono text-sm text-gray-800">
                    {order._id}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${statusStyle(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </span>

              </div>

              {/* Order Info */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Amount
                  </p>
                  <p className="font-semibold text-lg">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Payment Status
                  </p>
                  <p className="font-semibold">
                    {order.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Advance Paid
                  </p>
                  <p className="font-semibold">
                    ₹{order.advanceAmount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Remaining
                  </p>
                  <p className="font-semibold">
                    ₹{order.remainingAmount}
                  </p>
                </div>

              </div>

              {/* Controls */}

              <div className="flex flex-col md:flex-row md:items-center gap-4">

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition"
                  >
                    Request Remaining Payment
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}