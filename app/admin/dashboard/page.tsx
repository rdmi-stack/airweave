"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAdminStore } from "@/lib/admin-store";
import { useProductStore } from "@/lib/product-store";
import StatusBadge from "@/app/components/admin/StatusBadge";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function DashboardPage() {
  const { orders, customers } = useAdminStore();
  const { products } = useProductStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const statusCounts = {
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Mock last 7 days revenue data
  const barData = [
    { label: "Mon", value: 8500 },
    { label: "Tue", value: 12000 },
    { label: "Wed", value: 6800 },
    { label: "Thu", value: 15200 },
    { label: "Fri", value: 9400 },
    { label: "Sat", value: 18600 },
    { label: "Sun", value: 11300 },
  ];
  const maxBar = Math.max(...barData.map((d) => d.value));

  const stats = [
    {
      label: "Total Revenue",
      value: fmt(totalRevenue),
      change: "+12.5%",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      label: "Total Products",
      value: totalProducts.toString(),
      change: "+3",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      label: "Total Customers",
      value: totalCustomers.toString(),
      change: "+5.1%",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
  ];

  // Donut chart via conic-gradient
  const total = statusCounts.processing + statusCounts.shipped + statusCounts.delivered + statusCounts.cancelled;
  const pProcEnd = (statusCounts.processing / total) * 100;
  const pShipEnd = pProcEnd + (statusCounts.shipped / total) * 100;
  const pDelEnd = pShipEnd + (statusCounts.delivered / total) * 100;
  const donutGradient = `conic-gradient(#f59e0b 0% ${pProcEnd}%, #3b82f6 ${pProcEnd}% ${pShipEnd}%, #10b981 ${pShipEnd}% ${pDelEnd}%, #ef4444 ${pDelEnd}% 100%)`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-neutral-400">{stat.icon}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue bar chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Revenue (Last 7 Days)</h2>
          <div className="flex items-end gap-3 h-44">
            {barData.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-neutral-500">{fmt(d.value)}</span>
                <div
                  className="w-full bg-neutral-900 rounded-t-md transition-all"
                  style={{ height: `${(d.value / maxBar) * 130}px` }}
                />
                <span className="text-xs text-neutral-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Orders by Status</h2>
          <div className="flex justify-center mb-4">
            <div
              className="w-32 h-32 rounded-full relative"
              style={{ background: donutGradient }}
            >
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-neutral-900">{total}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-neutral-600">Processing ({statusCounts.processing})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-neutral-600">Shipped ({statusCounts.shipped})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-neutral-600">Delivered ({statusCounts.delivered})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-neutral-600">Cancelled ({statusCounts.cancelled})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {products.filter((p) => p.stock < 10).length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Low Stock Alerts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products
              .filter((p) => p.stock < 10)
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">{p.name}</p>
                    <p className="text-xs text-amber-700 mt-1">
                      {p.stock === 0 ? (
                        <span className="text-red-600 font-semibold">Out of Stock</span>
                      ) : (
                        <>Only <span className="font-semibold">{p.stock}</span> left in stock</>
                      )}
                    </p>
                  </div>
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-xs font-medium px-3 py-1.5 bg-white border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-neutral-500 hover:text-neutral-900">
            View all
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Total</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50">
                <td className="px-5 py-3 font-mono text-xs">{order.id}</td>
                <td className="px-5 py-3">{order.customerName}</td>
                <td className="px-5 py-3 font-medium">{fmt(order.total)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3 text-neutral-500">
                  {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
