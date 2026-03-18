"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

/* ================= TYPES ================= */

interface TopProduct {
  _id: string;
  title: string;
  totalSold: number;
  revenue: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
}

interface CustomOrder {
  _id: string;
  productType: string;
  budget: number;
  message: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  customOrders: number;
  topProducts: TopProduct[];
  recentOrders: Order[];
  latestCustomOrders: CustomOrder[];
}

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get<DashboardStats>("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Something went wrong."}
      </div>
    );
  }

  /* ================= DATA ================= */

  const {
    totalRevenue,
    totalOrders,
    pendingOrders,
    customOrders,
    topProducts,
    recentOrders,
    latestCustomOrders,
  } = stats;

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">

      {/* HEADER */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1B14]">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Monitor your business performance
        </p>
      </header>

      {/* METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Revenue" value={formatCurrency(totalRevenue)} />
        <MetricCard title="Orders" value={totalOrders} />
        <MetricCard title="Pending" value={pendingOrders} />
        <MetricCard title="Custom" value={customOrders} />
      </section>

      {/* TOP PRODUCTS */}
      <Section title="Top Selling Products">
        {topProducts.length === 0 ? (
          <EmptyState text="No product data available." />
        ) : (
          <TableWrapper>
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b text-gray-400">
                  <th className="py-3 text-left">Product</th>
                  <th>Units</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 font-medium">{p.title}</td>
                    <td>{p.totalSold}</td>
                    <td className="font-semibold text-[#2B1B14]">
                      {formatCurrency(p.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        )}
      </Section>

      {/* RECENT ORDERS */}
      <Section title="Recent Orders">
        {recentOrders.length === 0 ? (
          <EmptyState text="No orders found." />
        ) : (
          <TableWrapper>
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr className="border-b text-gray-400">
                  <th className="py-3 text-left">Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 font-medium">
                      #{order._id.slice(-6)}
                    </td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td>
                      <StatusBadge status={order.orderStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        )}
      </Section>

      {/* CUSTOM ORDERS */}
      <Section title="Custom Requests">
        {latestCustomOrders.length === 0 ? (
          <EmptyState text="No custom requests yet." />
        ) : (
          <div className="space-y-3">
            {latestCustomOrders.map((c) => (
              <div
                key={c._id}
                className="p-4 border rounded-xl bg-white hover:shadow-md transition"
              >
                <p className="font-semibold text-[#2B1B14]">
                  {c.productType}
                </p>
                <p className="text-sm text-gray-500">
                  Budget: {formatCurrency(c.budget)}
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

/* ================= COMPONENTS ================= */

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border shadow-sm hover:shadow-md transition">
      <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      <p className="text-xl sm:text-2xl font-bold mt-1 text-[#2B1B14]">
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border rounded-2xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-[#2B1B14]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-gray-400 text-sm">{text}</p>;
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colorMap[normalized] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

/* ================= HELPERS ================= */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}