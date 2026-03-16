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
  const [filter, setFilter] = useState("all");

  /* Fetch Orders */

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

  /* Initial Load */

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

  /* Update Status */

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

  /* Request Remaining Payment */

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

  /* Filter Orders */

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  /* Loading */

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading orders...
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-xl font-semibold">
          Orders
        </h1>

        <span className="text-sm text-gray-500">
          {orders.length} orders
        </span>

      </div>


      {/* Filters */}

      <div className="flex gap-2 overflow-x-auto mb-5">

        {[
          "all",
          "processing",
          "ready-for-shipping",
          "delivered",
          "cancelled"
        ].map((status) => (

          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
              ${
                filter === status
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {status.replaceAll("-", " ")}
          </button>

        ))}

      </div>


      {/* Orders */}

      <div className="space-y-4">

        {filteredOrders.length === 0 && (

          <div className="text-center text-gray-500 py-10">
            No orders found
          </div>

        )}

        {filteredOrders.map((order) => (

          <div
            key={order._id}
            className="bg-white border rounded-lg p-4"
          >

            {/* Top */}

            <div className="flex justify-between items-center mb-3 text-xs text-gray-500">

              <span className="break-all">
                {order._id}
              </span>

              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                {order.orderStatus}
              </span>

            </div>


            {/* Info Grid */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">

              <div>
                <p className="text-gray-500">
                  Total
                </p>
                <p className="font-semibold">
                  ₹{order.totalAmount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Payment
                </p>
                <p>
                  {order.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Advance
                </p>
                <p>
                  ₹{order.advanceAmount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Remaining
                </p>
                <p>
                  ₹{order.remainingAmount}
                </p>
              </div>

            </div>


            {/* Actions */}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border rounded-md px-3 py-2 text-sm"
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
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Request Remaining Payment
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}