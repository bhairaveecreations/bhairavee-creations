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
      <div className="flex items-center justify-center h-[60vh] text-[#6b5c4c]">
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
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#2B1B14] font-serif">
          Dashboard
        </h1>
        <p className="text-sm text-[#7a6a58]">
          Your divine business overview
        </p>
      </div>

      {/* METRICS */}
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
    <>
      {/* 📱 MOBILE CARD SCROLL */}
      <div className="flex gap-4 overflow-x-auto pb-2 sm:hidden">

        {topProducts.map((p: any) => (
          <div
            key={p._id}
            className="min-w-[220px] p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20"
          >
            <p className="font-medium text-[#2B1B14]">
              {p.title}
            </p>

            <p className="text-xs text-[#7a6a58] mt-1">
              Sold: {p.totalSold}
            </p>

            <p className="text-sm font-semibold mt-1 text-[#2B1B14]">
              ₹{p.revenue}
            </p>
          </div>
        ))}

      </div>

      {/* 💻 DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto">

        <table className="w-full min-w-[600px] text-sm table-fixed">

          <thead>
            <tr className="border-b text-[#8a7a65]">
              <th className="text-left py-3 w-1/3">Product</th>
              <th className="text-left w-1/3">Sold</th>
              <th className="text-left w-1/3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((p: any) => (
              <tr key={p._id} className="border-b hover:bg-white/20">
                <td className="py-3">{p.title}</td>
                <td>{p.totalSold}</td>
                <td>₹{p.revenue}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  )}

</Section>

      {/* RECENT ORDERS */}
     <Section title="Recent Orders">

  {recentOrders.length === 0 ? (
    <Empty text="No orders yet" />
  ) : (
    <>
      {/* 📱 MOBILE CARDS */}
      <div className="flex gap-4 overflow-x-auto pb-2 sm:hidden">

        {recentOrders.map((order: any) => (
          <div
            key={order._id}
            className="min-w-[220px] p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20"
          >
            <p className="text-sm font-medium text-[#2B1B14]">
              #{order._id.slice(-6)}
            </p>

            <p className="text-xs text-[#7a6a58]">
              ₹{order.totalAmount}
            </p>

            <div className="mt-2">
              <StatusBadge status={order.orderStatus} />
            </div>
          </div>
        ))}

      </div>

      {/* 💻 DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto">

        <table className="w-full min-w-[600px] text-sm table-fixed">

          <thead>
            <tr className="border-b text-[#8a7a65]">
              <th className="text-left py-3 w-1/3">Order</th>
              <th className="text-left w-1/3">Total</th>
              <th className="text-left w-1/3">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order: any) => (
              <tr key={order._id} className="border-b hover:bg-white/20">
                <td className="py-3">#{order._id.slice(-6)}</td>
                <td>₹{order.totalAmount}</td>
                <td><StatusBadge status={order.orderStatus} /></td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
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
                className="
                  p-4 rounded-2xl
                  bg-white/30 backdrop-blur-xl
                  border border-white/20
                  shadow-sm hover:shadow-md
                  transition hover:-translate-y-1
                "
              >
                <p className="font-medium text-[#2B1B14]">
                  {c.productType}
                </p>

                <p className="text-xs text-[#7a6a58]">
                  Budget: ₹{c.budget}
                </p>

                <p className="text-sm text-[#5c4d3d] mt-1 break-words">
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

/* 💎 CARD */
function Card({ title, value }: any) {
  return (
    <div className="
      relative w-full p-4 rounded-2xl
      bg-white/30 backdrop-blur-xl
      border border-white/20
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      transition hover:-translate-y-1
    ">

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37]/10 to-transparent" />

      <p className="text-xs text-[#7a6a58]">{title}</p>

      <p className="text-xl sm:text-2xl font-semibold text-[#2B1B14] mt-1">
        {value}
      </p>

    </div>
  );
}

/* 💎 SECTION */
function Section({ title, children }: any) {
  return (
    <div className="
      relative rounded-2xl p-4 sm:p-6
      bg-white/25 backdrop-blur-xl
      border border-white/20
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    ">

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37]/5 to-transparent" />

      <h2 className="text-lg font-semibold text-[#2B1B14] mb-4 font-serif">
        {title}
      </h2>

      {children}
    </div>
  );
}

/* EMPTY */
function Empty({ text }: any) {
  return <p className="text-[#8a7a65] text-sm">{text}</p>;
}

/* 💎 STATUS BADGE */
function StatusBadge({ status }: any) {

  const map: any = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    "ready-for-shipping": "bg-[#f5e6c8] text-[#8a6d3b]"
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