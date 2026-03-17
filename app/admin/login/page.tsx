"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const adminLogin = useAdminStore((s) => s.adminLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = adminLogin(email, password);
    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Airweave</h1>
          <p className="text-neutral-500 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-2xl p-6 space-y-4 border border-white/10">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-800 border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="admin@airweave.in"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-800 border border-white/10 rounded-xl text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-white text-neutral-900 font-semibold rounded-xl text-sm hover:bg-neutral-100 transition-colors"
          >
            Sign In
          </button>

          <p className="text-xs text-neutral-600 text-center mt-4">
            Use <span className="text-neutral-400">admin@airweave.in</span> / <span className="text-neutral-400">admin123</span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
