"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";
import StatusBadge from "@/app/components/admin/StatusBadge";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

type StatusFilter = "all" | "processing" | "shipped" | "delivered" | "cancelled";

export default function OrdersPage() {
  const { orders } = useAdminStore();
  const [filter, setFilter] = useState<StatusFilter>("all");

  const counts = {
    all: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Orders</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              filter === tab.key
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300"
            }`}
          >
            {tab.label} ({counts[tab.key]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Items</th>
              <th className="text-left px-5 py-3 font-medium">Total</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sorted.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50 cursor-pointer">
                <td className="px-5 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs text-neutral-900 hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="px-5 py-3">{order.customerName}</td>
                <td className="px-5 py-3 text-neutral-500">
                  {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-5 py-3 text-neutral-600">{order.items.length}</td>
                <td className="px-5 py-3 font-medium">{fmt(order.total)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3 text-xs text-neutral-500 font-mono">
                  {order.trackingId || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="text-center py-12 text-neutral-400 text-sm">No orders found.</div>
        )}
      </div>
    </motion.div>
  );
}
