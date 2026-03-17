"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function CustomersPage() {
  const { customers } = useAdminStore();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Customers</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Email</th>
              <th className="text-left px-5 py-3 font-medium">Phone</th>
              <th className="text-left px-5 py-3 font-medium">Orders</th>
              <th className="text-left px-5 py-3 font-medium">Total Spent</th>
              <th className="text-left px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-neutral-50 cursor-pointer">
                <td className="px-5 py-3">
                  <Link href={`/admin/customers/${customer.id}`} className="font-medium text-neutral-900 hover:underline">
                    {customer.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-neutral-600">{customer.email}</td>
                <td className="px-5 py-3 text-neutral-600">{customer.phone}</td>
                <td className="px-5 py-3 text-neutral-600">{customer.orderCount}</td>
                <td className="px-5 py-3 font-medium">{fmt(customer.totalSpent)}</td>
                <td className="px-5 py-3 text-neutral-500">
                  {new Date(customer.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
