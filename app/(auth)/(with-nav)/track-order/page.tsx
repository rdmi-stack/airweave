"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminStore, type MockOrder } from "@/lib/admin-store";
import { useAuthStore, type Order } from "@/lib/auth-store";

type UnifiedOrder = {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; size: string; color: string; quantity: number; price: number; image: string }[];
  total: number;
  address: string;
  trackingId?: string;
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Delivered"] as const;

function getStepIndex(status: UnifiedOrder["status"]): number {
  switch (status) {
    case "processing":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    case "cancelled":
      return -1;
    default:
      return 0;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<UnifiedOrder | null>(null);

  const adminOrders = useAdminStore((s) => s.orders);
  const authOrders = useAuthStore((s) => s.orders);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) return;

    // Search admin orders first
    const adminMatch = adminOrders.find((o) => o.id.toUpperCase() === trimmed);
    if (adminMatch) {
      setOrder({
        id: adminMatch.id,
        date: adminMatch.date,
        status: adminMatch.status,
        items: adminMatch.items,
        total: adminMatch.total,
        address: adminMatch.address,
        trackingId: adminMatch.trackingId,
      });
      setSearched(true);
      return;
    }

    // Then search auth orders
    const authMatch = authOrders.find((o) => o.id.toUpperCase() === trimmed);
    if (authMatch) {
      setOrder({
        id: authMatch.id,
        date: authMatch.date,
        status: authMatch.status,
        items: authMatch.items,
        total: authMatch.total,
        address: authMatch.address,
        trackingId: authMatch.trackingId,
      });
      setSearched(true);
      return;
    }

    setOrder(null);
    setSearched(true);
  };

  const activeStep = order ? getStepIndex(order.status) : -1;
  const isCancelled = order?.status === "cancelled";

  return (
    <main className="pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-extralight mb-2">
            Track your <span className="font-semibold italic">Order</span>
          </h1>
          <p className="text-neutral-500 text-sm">
            Enter your order ID to see the latest status
          </p>
        </motion.div>

        {/* Search */}
        <motion.form
          onSubmit={handleTrack}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 mb-10"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. ORD-A1B2C3"
            className="flex-1 border-2 border-neutral-200 rounded-xl px-5 py-4 text-sm placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-colors"
          />
          <button
            type="submit"
            className="bg-neutral-900 text-white px-8 py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors shrink-0"
          >
            Track
          </button>
        </motion.form>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && !order && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="font-medium text-red-800 mb-1">Order not found</h3>
              <p className="text-sm text-red-600">
                We couldn&apos;t find an order with that ID. Please check and try again.
              </p>
            </motion.div>
          )}

          {searched && order && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Order summary card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-50 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="font-semibold text-lg">{order.id}</h2>
                    <p className="text-sm text-neutral-500">Placed on {formatDate(order.date)}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                    order.status === "delivered" ? "bg-emerald-100 text-emerald-700" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                    order.status === "processing" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-2xl font-light">{formatCurrency(order.total)}</p>
              </motion.div>

              {/* Timeline stepper */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-neutral-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-medium mb-6">Order Progress</h3>

                {isCancelled ? (
                  <div className="flex items-center gap-3 bg-red-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-800">Order Cancelled</p>
                      <p className="text-xs text-red-600">This order has been cancelled</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {STEPS.map((step, i) => {
                      const isCompleted = i <= activeStep;
                      const isCurrent = i === activeStep;

                      return (
                        <div key={step} className="flex items-start gap-4 relative">
                          {/* Vertical line */}
                          {i < STEPS.length - 1 && (
                            <div
                              className={`absolute left-[15px] top-8 w-0.5 h-10 ${
                                i < activeStep ? "bg-emerald-500" : "bg-neutral-200"
                              }`}
                            />
                          )}

                          {/* Circle / checkmark */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                              isCompleted
                                ? "bg-emerald-500 text-white"
                                : "bg-neutral-100 text-neutral-400"
                            } ${isCurrent ? "ring-4 ring-emerald-100" : ""}`}
                          >
                            {isCompleted ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            ) : (
                              <span className="text-xs font-medium">{i + 1}</span>
                            )}
                          </motion.div>

                          {/* Label */}
                          <div className={`pb-10 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                            <p className={`text-sm font-medium ${isCompleted ? "text-neutral-900" : "text-neutral-400"}`}>
                              {step}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {i === 0 && "Order received"}
                              {i === 1 && "Preparing your items"}
                              {i === 2 && "On the way to you"}
                              {i === 3 && "Package delivered"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Tracking ID */}
              {order.trackingId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-2.25h5.25c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-5.25c-.621 0-1.125.504-1.125 1.125v5.25c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-0.5">Tracking ID</p>
                    <p className="text-sm font-semibold text-blue-900">{order.trackingId}</p>
                  </div>
                </motion.div>
              )}

              {/* Items list */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white border border-neutral-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-medium mb-4">
                  Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-16 h-20 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {item.color} / {item.size} / Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">{formatCurrency(item.price)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Shipping address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-white border border-neutral-100 rounded-2xl p-6"
              >
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{order.address}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
