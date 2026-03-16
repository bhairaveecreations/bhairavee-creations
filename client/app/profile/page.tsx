"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Sparkles, User } from "lucide-react";

export default function ProfilePage() {

  const { user, fetchProfile,logout } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [customOrders, setCustomOrders] = useState<any[]>([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        if (!user) {
          await fetchProfile();
        }

        const ordersRes = await api.get("/orders/my");
        const customRes = await api.get("/custom-orders/my");

        setOrders(ordersRes.data);
        setCustomOrders(customRes.data);

      } catch (error) {

        router.push("/login");

      }

      setLoading(false);

    };

    loadData();

  }, [user]);

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }

  }, [user, loading]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );

  }

  return (

    <main className="bg-[#F8F6F2] min-h-screen py-20 px-6">

      <div className="max-w-6xl mx-auto space-y-16">

        {/* PROFILE HEADER */}

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

  <div className="flex items-center gap-4">

    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
      <User size={22} className="text-[#2B1B14]" />
    </div>

    <div>

      <h1 className="text-2xl md:text-3xl font-serif text-[#2B1B14] leading-tight">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-500 text-sm md:text-base mt-1 break-all">
        {user?.email}
      </p>

    </div>

  </div>

  <button
    onClick={async () => {
  await api.post("/auth/logout");
  logout();
  router.push("/login");
}}
    className="w-full md:w-auto border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition"
  >
    Logout
  </button>

</div>

        {/* ADMIN CONTROLS */}

        {user?.role === "admin" && (

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-xl font-semibold mb-8">
              Admin Controls
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                href="/admin/dashboard"
                className="bg-[#D4AF37] text-black p-6 rounded-2xl hover:shadow-lg transition"
              >
                <p className="font-semibold text-lg">
                  Dashboard
                </p>
                <p className="text-sm mt-2 opacity-80">
                  Overview of store performance
                </p>
              </Link>

              <Link
                href="/admin/products"
                className="border p-6 rounded-2xl hover:bg-gray-50 transition"
              >
                <p className="font-semibold text-lg">
                  Manage Products
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  Add, edit or remove items
                </p>
              </Link>

              <Link
                href="/admin/orders"
                className="border p-6 rounded-2xl hover:bg-gray-50 transition"
              >
                <p className="font-semibold text-lg">
                  View Orders
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  Manage customer purchases
                </p>
              </Link>

            </div>

          </div>

        )}


        {/* ORDER HISTORY */}

        {user?.role !== "admin" && (

          <>
            <div>

              <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <Package size={20}/> Order History
              </h2>

              {orders.length === 0 ? (

                <div className="bg-white rounded-3xl shadow p-10 text-center">

                  <p className="text-gray-500 mb-5">
                    You haven't placed any orders yet.
                  </p>

                  <Link
                    href="/shop"
                    className="bg-[#D4AF37] px-7 py-3 rounded-full text-black hover:shadow-md"
                  >
                    Explore Creations
                  </Link>

                </div>

              ) : (

                <div className="grid md:grid-cols-2 gap-6">

                  {orders.map((order) => (

                    <div
                      key={order._id}
                      className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
                    >

                      <p className="text-xs text-gray-400">
                        Order ID
                      </p>

                      <p className="font-medium mb-3">
                        {order._id}
                      </p>

                      <p className="text-gray-600">
                        Total: ₹{order.totalAmount}
                      </p>

                      <p className="text-gray-600 mb-4">
                        Status: {order.orderStatus}
                      </p>

                      <button
                        onClick={() =>
                          router.push(`/pay-remaining/${order._id}`)
                        }
                        className="text-sm text-blue-600 underline"
                      >
                        View Order
                      </button>

                      {order.orderStatus === "ready-for-shipping" &&
                       order.paymentStatus === "advance-paid" && (

                        <button
                          onClick={() =>
                            router.push(`/pay-remaining/${order._id}`)
                          }
                          className="block mt-4 bg-black text-white px-5 py-2 rounded hover:opacity-80"
                        >
                          Pay Remaining Amount
                        </button>

                      )}

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* CUSTOM ORDERS */}

            <div>

              <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <Sparkles size={20}/> My Custom Requests
              </h2>

              {customOrders.length === 0 ? (

                <div className="bg-white rounded-3xl shadow p-10 text-center">

                  <p className="text-gray-500 mb-5">
                    No custom requests yet.
                  </p>

                  <Link
                    href="/custom-order"
                    className="bg-[#D4AF37] px-7 py-3 rounded-full text-black hover:shadow-md"
                  >
                    Create Custom Piece
                  </Link>

                </div>

              ) : (

                <div className="grid md:grid-cols-2 gap-6">

                  {customOrders.map((order) => (

                    <div
                      key={order._id}
                      className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
                    >

                      <p className="font-medium mb-1">
                        {order.productType}
                      </p>

                      <p className="text-gray-600">
                        Budget: ₹{order.budget}
                      </p>

                      <p className="text-gray-600">
                        Status: {order.status}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>

        )}

      </div>

    </main>

  );

}