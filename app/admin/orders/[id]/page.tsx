"use client";

import { useState, use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAdminStore, type MockOrder } from "@/lib/admin-store";
import StatusBadge from "@/app/components/admin/StatusBadge";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

const statuses: MockOrder["status"][] = ["processing", "shipped", "delivered", "cancelled"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders, updateOrderStatus } = useAdminStore();
  const order = orders.find((o) => o.id === id);

  const [status, setStatus] = useState<MockOrder["status"]>(order?.status || "processing");
  const [trackingId, setTrackingId] = useState(order?.trackingId || "");
  const [saved, setSaved] = useState(false);

  if (!order) {
    return <div className="text-center py-20 text-neutral-400">Order not found.</div>;
  }

  const handleSave = () => {
    updateOrderStatus(order.id, status, trackingId || undefined);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Order {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-neutral-900 mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{item.name}</p>
                    <p className="text-sm text-neutral-500">
                      Size: {item.size} / Color: {item.color} / Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-neutral-900">{fmt(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between">
              <span className="font-medium text-neutral-700">Total</span>
              <span className="text-lg font-bold text-neutral-900">{fmt(order.total)}</span>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-neutral-900 mb-2">Shipping Address</h2>
            <p className="text-sm text-neutral-600">{order.address}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-neutral-900 mb-3">Customer</h2>
            <p className="text-sm font-medium text-neutral-900">{order.customerName}</p>
            <p className="text-sm text-neutral-500">{order.customerEmail}</p>
            <p className="text-xs text-neutral-400 mt-2">
              Ordered on {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Update status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-neutral-900">Update Order</h2>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MockOrder["status"])}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 bg-white capitalize"
              >
                {statuses.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Tracking ID</label>
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="e.g. BLUEDART-12345"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Save Changes
            </button>

            {saved && (
              <p className="text-sm text-emerald-600 text-center">Order updated successfully.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
