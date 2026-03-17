"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminStore, type Coupon } from "@/lib/admin-store";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

type CouponForm = {
  code: string;
  type: "percentage" | "fixed";
  value: string;
  minOrderValue: string;
  maxDiscount: string;
  usageLimit: string;
  expiresAt: string;
  isActive: boolean;
};

const emptyForm: CouponForm = {
  code: "",
  type: "percentage",
  value: "",
  minOrderValue: "",
  maxDiscount: "",
  usageLimit: "",
  expiresAt: "",
  isActive: true,
};

export default function CouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponActive } = useAdminStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CouponForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (coupon: Coupon) => {
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrderValue: coupon.minOrderValue.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || "",
      usageLimit: coupon.usageLimit.toString(),
      expiresAt: coupon.expiresAt,
      isActive: coupon.isActive,
    });
    setEditingId(coupon.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      code: form.code,
      type: form.type,
      value: Number(form.value),
      minOrderValue: Number(form.minOrderValue),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      usageLimit: Number(form.usageLimit),
      expiresAt: form.expiresAt,
      isActive: form.isActive,
    };

    if (editingId) {
      updateCoupon(editingId, data);
    } else {
      addCoupon(data);
    }
    resetForm();
  };

  const set = (key: keyof CouponForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Coupons</h1>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
            className="px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
          >
            + Add Coupon
          </button>
        )}
      </div>

      {/* Inline form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">
            {editingId ? "Edit Coupon" : "New Coupon"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                required
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 bg-white"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Value {form.type === "percentage" ? "(%)" : "(₹)"}
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                value={form.minOrderValue}
                onChange={(e) => set("minOrderValue", e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Max Discount (₹, optional)</label>
              <input
                type="number"
                value={form.maxDiscount}
                onChange={(e) => set("maxDiscount", e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Usage Limit</label>
              <input
                type="number"
                value={form.usageLimit}
                onChange={(e) => set("usageLimit", e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Expires At</label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => set("expiresAt", e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => set("isActive", e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300"
                />
                <span className="text-sm font-medium text-neutral-700">Active</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors">
              {editingId ? "Save Changes" : "Add Coupon"}
            </button>
            <button type="button" onClick={resetForm} className="px-5 py-2.5 text-sm font-medium border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Code</th>
              <th className="text-left px-5 py-3 font-medium">Type</th>
              <th className="text-left px-5 py-3 font-medium">Value</th>
              <th className="text-left px-5 py-3 font-medium">Min Order</th>
              <th className="text-left px-5 py-3 font-medium">Usage</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Expiry</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-neutral-50">
                <td className="px-5 py-3 font-mono font-medium text-neutral-900">{coupon.code}</td>
                <td className="px-5 py-3 text-neutral-600 capitalize">{coupon.type}</td>
                <td className="px-5 py-3 font-medium">
                  {coupon.type === "percentage" ? `${coupon.value}%` : fmt(coupon.value)}
                </td>
                <td className="px-5 py-3 text-neutral-600">{fmt(coupon.minOrderValue)}</td>
                <td className="px-5 py-3 text-neutral-600">
                  {coupon.usedCount}/{coupon.usageLimit}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleCouponActive(coupon.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      coupon.isActive ? "bg-emerald-500" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                        coupon.isActive ? "translate-x-4" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-5 py-3 text-neutral-500">{coupon.expiresAt}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => startEdit(coupon)}
                      className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(coupon.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {coupons.length === 0 && (
          <div className="text-center py-12 text-neutral-400 text-sm">No coupons yet.</div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteCoupon(deleteId);
        }}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
      />
    </motion.div>
  );
}
