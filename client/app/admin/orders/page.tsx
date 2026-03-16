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
     Status Badge
  -------------------------- */

  const badge = (status: string) => {

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
     Filtered Orders
  -------------------------- */

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  /* --------------------------
     Loading State
  -------------------------- */

  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading orders...
      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Orders
        </h1>

        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>

      </div>


      {/* Filter Bar */}

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">

        {[
          "all",
          "processing",
          "ready-for-shipping",
          "delivered",
          "cancelled",
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

      {filteredOrders.length === 0 ? (

        <div className="text-center py-20 border rounded-xl bg-gray-50">
          No orders found
        </div>

      ) : (

        <div className="grid gap-5">

          {filteredOrders.map((order) => (

            <div
              key={order._id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >

              {/* Top Row */}

              <div className="flex justify-between items-start mb-4">

                <div>

                  <p className="text-xs text-gray-400">
                    Order ID
                  </p>

                  <p className="font-mono text-sm text-gray-700 break-all">
                    {order._id}
                  </p>

                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${badge(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus.replaceAll("-", " ")}
                </span>

              </div>


              {/* Info Grid */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 text-sm">

                <div>
                  <p className="text-gray-400">
                    Total
                  </p>
                  <p className="font-semibold text-base">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Payment
                  </p>
                  <p className="font-semibold">
                    {order.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Advance
                  </p>
                  <p className="font-semibold">
                    ₹{order.advanceAmount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">
                    Remaining
                  </p>
                  <p className="font-semibold">
                    ₹{order.remainingAmount}
                  </p>
                </div>

              </div>


              {/* Actions */}

              <div className="flex flex-col md:flex-row gap-3">

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition"
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