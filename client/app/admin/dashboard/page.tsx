"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function AdminDashboard() {

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {

    api.get("/admin/dashboard").then((res) => {
      setStats(res.data);
    });

  }, []);

  if (!stats) {
    return (
      <div className="p-10 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const monthlyRevenue = stats.monthlyRevenue || [];
  const orderStatusStats = stats.orderStatusStats || [];
  const topProducts = stats.topProducts || [];
  const recentOrders = stats.recentOrders || [];
  const latestCustomOrders = stats.latestCustomOrders || [];

  return (

    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-bold text-[#2B1B14]">
        Admin Dashboard
      </h1>

      {/* METRIC CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card title="Total Revenue" value={`₹${stats.totalRevenue || 0}`} />

        <Card title="Total Orders" value={stats.totalOrders || 0} />

        <Card title="Pending Orders" value={stats.pendingOrders || 0} />

        <Card title="Custom Requests" value={stats.customOrders || 0} />

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Revenue Chart */}

        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue (₹)
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={monthlyRevenue}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#D4AF37"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Order Status Donut */}

        <div className="bg-white rounded-xl border shadow-sm p-6">

          <h2 className="text-lg font-semibold mb-4">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={orderStatusStats}
                dataKey="count"
                nameKey="_id"
                innerRadius={60}
                outerRadius={100}
              >

                {orderStatusStats.map((entry: any, index: number) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP PRODUCTS */}

      <div className="bg-white border rounded-xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Top Selling Products
        </h2>

        {topProducts.length === 0 ? (
          <p className="text-gray-500">No product data yet</p>
        ) : (

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b text-gray-500 text-left">

                <th className="py-3">Product</th>
                <th>Units Sold</th>
                <th>Revenue (₹)</th>

              </tr>

            </thead>

            <tbody>

              {topProducts.map((p: any) => (

                <tr key={p._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">{p.title}</td>
                  <td>{p.totalSold}</td>
                  <td>₹{p.revenue}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* RECENT ORDERS */}

      <div className="bg-white border rounded-xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b text-gray-500 text-left">

                <th className="py-3">Order ID</th>
                <th>Total</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order: any) => (

                <tr key={order._id} className="border-b hover:bg-gray-50">

                  <td className="py-3">{order._id}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.orderStatus}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* CUSTOM REQUESTS */}

      <div className="bg-white border rounded-xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Latest Custom Requests
        </h2>

        {latestCustomOrders.length === 0 ? (
          <p className="text-gray-500">No custom requests yet</p>
        ) : (

          latestCustomOrders.map((c: any) => (

            <div
              key={c._id}
              className="border rounded-lg p-4 mb-3 hover:bg-gray-50"
            >

              <p className="font-medium">
                {c.productType}
              </p>

              <p className="text-sm text-gray-500">
                Budget: ₹{c.budget}
              </p>

              <p className="text-sm text-gray-500">
                {c.message}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

/* CARD COMPONENT */

function Card({ title, value }: any) {

  return (

    <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2 text-[#2B1B14]">
        {value}
      </p>

    </div>
g
  );

}