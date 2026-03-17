"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore, type Product } from "@/lib/product-store";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDrawer({ open, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const products = useProductStore((s) => s.products);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, products]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Overlay panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto px-6 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium tracking-wide uppercase text-neutral-800">
                  Search Products
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search input */}
              <div className="relative mb-8">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, category, or description..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50"
                />
              </div>

              {/* Results */}
              {query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={onClose}
                          className="group block rounded-lg border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="relative aspect-[3/4] bg-neutral-100">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[11px] font-medium tracking-wide px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-medium text-neutral-900 truncate">
                              {product.name}
                            </h3>
                            <p className="text-sm text-neutral-500 mt-1">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg
                        className="w-12 h-12 text-neutral-300 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                      <p className="text-neutral-500 text-lg">
                        No results found
                      </p>
                      <p className="text-neutral-400 text-sm mt-1">
                        Try a different search term
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
