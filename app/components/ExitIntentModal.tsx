"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5) {
      const dismissed = sessionStorage.getItem("airweave-exit-dismissed");
      if (!dismissed) {
        setShow(true);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("airweave-exit-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    sessionStorage.setItem("airweave-exit-dismissed", "true");
    setTimeout(() => setShow(false), 2500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl grid md:grid-cols-[200px,1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left image */}
            <div className="hidden md:block relative">
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80"
                alt="Airweave"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Right content */}
            <div className="p-8 relative">
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">You&apos;re in!</h3>
                  <p className="text-neutral-500 text-sm">
                    Check your inbox for your 10% discount code.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-1">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                      Wait — before you go
                    </span>
                  </div>
                  <h2 className="text-2xl font-extralight leading-tight mb-2">
                    Get <span className="font-bold">10% Off</span>
                    <br />Your First Order
                  </h2>
                  <p className="text-neutral-500 text-sm mb-6">
                    Join 10,000+ members. No spam, just early access to drops and exclusive deals.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-neutral-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Claim My 10% Off
                    </button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="w-full text-center text-xs text-neutral-400 mt-4 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
