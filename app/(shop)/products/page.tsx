"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/app/components/ProductCard";
import { useProductStore } from "@/lib/product-store";

const allCategories = ["All", "Shirts", "Trousers", "Co-ords", "Ethnic", "Shorts"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export default function Products() {
  return (
    <Suspense fallback={<div className="pt-24 px-6 max-w-7xl mx-auto"><div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" /></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const products = useProductStore((s) => s.products);
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result =
      activeCategory === "All"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") result.reverse();

    return result;
  }, [activeCategory, sortBy]);

  return (
    <main className="pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            All <span className="font-semibold">Products</span>
          </h1>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-100 px-4 py-2.5 rounded-full text-sm focus:outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm text-neutral-500 mb-8">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
