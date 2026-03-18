"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const topProducts = stats.topProducts || [];
  const recentOrders = stats.recentOrders || [];
  const latestCustomOrders = stats.latestCustomOrders || [];

  return (
    <div className="space-y-6 w-full">

      {/* HEADER */}
      <div>
        <h1 className="text-xl sm:text-3xl font-bold text-[#2B1B14]">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Your business at a glance
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card title="Revenue" value={`₹${stats.totalRevenue || 0}`} />
        <Card title="Orders" value={stats.totalOrders || 0} />
        <Card title="Pending" value={stats.pendingOrders || 0} />
        <Card title="Custom" value={stats.customOrders || 0} />

      </div>

      {/* TOP PRODUCTS */}
      <Section title="Top Products">

        {topProducts.length === 0 ? (
          <Empty text="No product data yet" />
        ) : (

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[600px] text-sm table-fixed">

              <thead>
                <tr className="border-b text-gray-400">
                  <th className="text-left py-3 w-1/3">Product</th>
                  <th className="text-left w-1/3">Sold</th>
                  <th className="text-left w-1/3">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {topProducts.map((p: any) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 whitespace-nowrap">{p.title}</td>
                    <td>{p.totalSold}</td>
                    <td className="font-semibold text-[#2B1B14]">
                      ₹{p.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        )}

      </Section>

      {/* RECENT ORDERS */}
      <Section title="Recent Orders">

        {recentOrders.length === 0 ? (
          <Empty text="No orders yet" />
        ) : (

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[600px] text-sm table-fixed">

              <thead>
                <tr className="border-b text-gray-400">
                  <th className="text-left py-3 w-1/3">Order</th>
                  <th className="text-left w-1/3">Total</th>
                  <th className="text-left w-1/3">Status</th>
                </tr>
              </thead>

              <tbody>

                {recentOrders.map((order: any) => (

                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">

                    <td className="py-3 whitespace-nowrap">
                      #{order._id.slice(-6)}
                    </td>

                    <td>
                      ₹{order.totalAmount}
                    </td>

                    <td>
                      <StatusBadge status={order.orderStatus} />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </Section>

      {/* CUSTOM REQUESTS */}
      <Section title="Custom Requests">

        {latestCustomOrders.length === 0 ? (
          <Empty text="No custom requests yet" />
        ) : (

          <div className="space-y-3">

            {latestCustomOrders.map((c: any) => (

              <div
                key={c._id}
                className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-[#2B1B14]">
                  {c.productType}
                </p>

                <p className="text-xs text-gray-500">
                  Budget: ₹{c.budget}
                </p>

                <p className="text-sm text-gray-600 mt-1 break-words">
                  {c.message}
                </p>
              </div>

            ))}

          </div>

        )}

      </Section>

    </div>
  );
}

/* CARD */
function Card({ title, value }: any) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white shadow-sm border hover:shadow-md transition">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-[#2B1B14] mt-1 break-words">
        {value}
      </p>
    </div>
  );
}

/* SECTION */
function Section({ title, children }: any) {
  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-sm sm:text-lg font-semibold text-[#2B1B14] mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* EMPTY */
function Empty({ text }: any) {
  return <p className="text-gray-400 text-sm">{text}</p>;
}

/* STATUS BADGE */
function StatusBadge({ status }: any) {

  const map: any = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    "ready-for-shipping": "bg-blue-100 text-blue-700"
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
        map[status?.toLowerCase()] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}