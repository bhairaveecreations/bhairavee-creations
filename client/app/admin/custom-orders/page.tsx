"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CustomOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/custom-orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {

    await api.put(`/custom-orders/${id}`, { status });

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Custom Orders
      </h1>

      <div className="space-y-4">

        {orders.map((order) => (

          <div
            key={order._id}
            className="border p-4 rounded-lg"
          >

            <p>
              Product Type: {order.productType}
            </p>

            <p>
              Budget: ₹{order.budget}
            </p>

            <p>
              Status: {order.status}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="border mt-2 p-2"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>

          </div>

        ))}

      </div>

    </div>
  );
}