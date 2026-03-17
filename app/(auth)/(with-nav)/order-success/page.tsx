"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "ORD-XXXXXX";

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-10 h-10 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-extralight mb-3">
            Order <span className="font-semibold italic">Confirmed!</span>
          </h1>
          <p className="text-neutral-500 mb-2">Thank you for shopping with Airweave.</p>
          <p className="text-sm text-neutral-400 mb-8">
            Your order <strong className="text-neutral-900">{orderId}</strong> has been placed
            successfully. You&apos;ll receive a confirmation email shortly.
          </p>

          {/* Timeline */}
          <div className="bg-neutral-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-sm font-medium mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { step: "Order Confirmed", desc: "We've received your order", done: true },
                { step: "Preparing", desc: "Your items are being packed", done: false },
                { step: "Shipped", desc: "On its way to you (3-5 days)", done: false },
                { step: "Delivered", desc: "Enjoy your Airweave!", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    item.done ? "bg-emerald-600 text-white" : "bg-neutral-200"
                  }`}>
                    {item.done ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <span className="text-[10px] text-neutral-400">{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${item.done ? "text-neutral-900" : "text-neutral-400"}`}>{item.step}</p>
                    <p className="text-xs text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/account"
              className="flex-1 bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium text-center hover:bg-neutral-800 transition-colors"
            >
              View Order
            </Link>
            <Link
              href="/products"
              className="flex-1 border-2 border-neutral-200 py-4 rounded-xl text-sm font-medium text-center hover:border-neutral-400 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" /></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
