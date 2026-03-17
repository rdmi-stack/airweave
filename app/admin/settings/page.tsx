"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminStore();

  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900">Store Settings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Store Name</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => set("storeName", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Currency</label>
            <input
              type="text"
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={form.freeShippingThreshold}
              onChange={(e) => set("freeShippingThreshold", Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Shipping Fee (₹)</label>
            <input
              type="number"
              value={form.shippingFee}
              onChange={(e) => set("shippingFee", Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => set("contactEmail", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={form.contactPhone}
              onChange={(e) => set("contactPhone", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Instagram</label>
            <input
              type="text"
              value={form.instagram}
              onChange={(e) => set("instagram", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Twitter</label>
            <input
              type="text"
              value={form.twitter}
              onChange={(e) => set("twitter", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Save Settings
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 font-medium">Settings saved successfully.</span>
          )}
        </div>
      </form>
    </motion.div>
  );
}
