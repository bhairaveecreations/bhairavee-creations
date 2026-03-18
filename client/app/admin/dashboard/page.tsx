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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const topProducts = stats.topProducts || [];
  const recentOrders = stats.recentOrders || [];
  const latestCustomOrders = stats.latestCustomOrders || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1B14]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Track your store performance
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Revenue" value={`₹${stats.totalRevenue || 0}`} />
        <Card title="Orders" value={stats.totalOrders || 0} />
        <Card title="Pending" value={stats.pendingOrders || 0} />
        <Card title="Custom" value={stats.customOrders || 0} />
      </div>

      {/* TOP PRODUCTS */}
      <Section title="Top Selling Products">
        {topProducts.length === 0 ? (
          <Empty text="No product data yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="py-3 text-left">Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p: any) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium">{p.title}</td>
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="py-3 text-left">Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium">
                      #{order._id.slice(-6)}
                    </td>
                    <td>₹{order.totalAmount}</td>
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
                className="p-4 border rounded-xl hover:shadow-md hover:-translate-y-1 transition bg-gradient-to-br from-white to-gray-50"
              >
                <p className="font-semibold text-[#2B1B14]">
                  {c.productType}
                </p>
                <p className="text-sm text-gray-500">
                  Budget: ₹{c.budget}
                </p>
                <p className="text-sm text-gray-600 mt-1">
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

/* 🔹 CARD */
function Card({ title, value }: any) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
      <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      <p className="text-xl sm:text-2xl font-bold mt-1 text-[#2B1B14]">
        {value}
      </p>
    </div>
  );
}

/* 🔹 SECTION WRAPPER */
function Section({ title, children }: any) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-[#2B1B14]">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* 🔹 EMPTY STATE */
function Empty({ text }: any) {
  return (
    <p className="text-gray-400 text-sm">{text}</p>
  );
}

/* 🔹 STATUS BADGE */
function StatusBadge({ status }: any) {
  const colors: any = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colors[status?.toLowerCase()] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}