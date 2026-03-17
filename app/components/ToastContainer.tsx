"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/lib/toast-store";

const icons = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
};

const accentBorder = {
  success: "border-l-green-500",
  error: "border-l-red-500",
  info: "border-l-blue-500",
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  const visible = toasts.slice(-3);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {visible.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`pointer-events-auto flex items-center gap-3 bg-white rounded-xl shadow-lg border-l-4 ${accentBorder[toast.type]} px-4 py-3 min-w-[260px] max-w-sm`}
          >
            {icons[toast.type]}
            <span className="flex-1 text-sm font-medium text-neutral-800">
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center cursor-pointer transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
