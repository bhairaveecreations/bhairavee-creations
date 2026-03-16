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

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading orders...
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-xl font-bold">
          Orders
        </h1>

        <span className="text-sm text-gray-500">
          {orders.length}
        </span>

      </div>

      {/* Filter */}

      <div className="flex gap-2 overflow-x-auto pb-3 mb-5">

        {["all","processing","ready-for-shipping","delivered","cancelled"].map((status)=>(
          <button
            key={status}
            onClick={()=>setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
            ${filter===status ? "bg-black text-white" : "bg-gray-100"}`}
          >
            {status.replaceAll("-"," ")}
          </button>
        ))}

      </div>

      {/* Orders */}

      <div className="space-y-4">

        {filteredOrders.map((order)=>(
          
          <div
            key={order._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >

            {/* Top */}

            <div className="flex justify-between items-start mb-3">

              <div className="text-xs text-gray-500 break-all">
                {order._id}
              </div>

              <span className={`text-xs px-3 py-1 rounded-full ${badge(order.orderStatus)}`}>
                {order.orderStatus.replaceAll("-"," ")}
              </span>

            </div>


            {/* Info rows */}

            <div className="space-y-2 text-sm mb-4">

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold">₹{order.totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span>{order.paymentStatus}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Advance</span>
                <span>₹{order.advanceAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Remaining</span>
                <span>₹{order.remainingAmount}</span>
              </div>

            </div>


            {/* Actions */}

            <div className="flex flex-col gap-3">

              <select
                value={order.orderStatus}
                onChange={(e)=>updateStatus(order._id,e.target.value)}
                className="border rounded-lg px-3 py-2"
              >

                <option value="processing">Processing</option>
                <option value="ready-for-shipping">Ready For Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>

              </select>

              {order.orderStatus === "ready-for-shipping" &&
               order.paymentStatus === "advance-paid" && (

                <button
                  onClick={()=>requestRemainingPayment(order._id)}
                  className="bg-orange-500 text-white py-2 rounded-lg"
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