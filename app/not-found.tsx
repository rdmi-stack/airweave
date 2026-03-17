"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {/* Animated 404 illustration */}
      <div className="relative mb-10 select-none" aria-hidden="true">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* First 4 */}
          <motion.span
            className="text-[8rem] sm:text-[12rem] font-extralight leading-none text-neutral-900"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            4
          </motion.span>

          {/* Floating zero */}
          <motion.span
            className="text-[8rem] sm:text-[12rem] font-extralight leading-none text-neutral-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              scale: { duration: 0.6, delay: 0.2, ease: "easeOut" },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
            }}
          >
            0
          </motion.span>

          {/* Second 4 */}
          <motion.span
            className="text-[8rem] sm:text-[12rem] font-extralight leading-none text-neutral-900"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            4
          </motion.span>
        </div>

        {/* Subtle decorative line beneath the numbers */}
        <motion.div
          className="mx-auto mt-4 h-px bg-neutral-200"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Text content */}
      <motion.h1
        className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-900 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="text-neutral-500 text-sm sm:text-base max-w-md mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-neutral-900 text-white text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors duration-300 min-w-[180px]"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-8 py-3 border border-neutral-900 text-neutral-900 text-sm tracking-widest uppercase hover:bg-neutral-50 transition-colors duration-300 min-w-[180px]"
        >
          Browse Products
        </Link>
      </motion.div>
    </div>
  );
}
