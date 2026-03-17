"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";
import StatusBadge from "@/app/components/admin/StatusBadge";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { customers, orders } = useAdminStore();
  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter((o) => o.customerId === id);

  if (!customer) {
    return <div className="text-center py-20 text-neutral-400">Customer not found.</div>;
  }

  const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Customer Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-xl font-bold text-neutral-400 mb-4">
            {customer.name.charAt(0)}
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">{customer.name}</h2>
          <p className="text-sm text-neutral-500 mt-1">{customer.email}</p>
          <p className="text-sm text-neutral-500">{customer.phone}</p>
          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Joined</span>
              <span className="text-neutral-900">
                {new Date(customer.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Orders</span>
              <span className="text-neutral-900">{customerOrders.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Total Spent</span>
              <span className="font-semibold text-neutral-900">{fmt(totalSpent)}</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100">
              <h2 className="text-base font-semibold text-neutral-900">Order History</h2>
            </div>
            {customerOrders.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm">No orders yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Order ID</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-left px-5 py-3 font-medium">Total</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {customerOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-neutral-500">
                        {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </td>
                      <td className="px-5 py-3 font-medium">{fmt(order.total)}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
