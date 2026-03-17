"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useAuthStore } from "@/lib/auth-store";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { wishlist, toggleWishlist } = useAuthStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Wishlist heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-20 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:scale-110 transition-transform"
      >
        <svg
          className={`w-4.5 h-4.5 transition-colors ${isWishlisted ? "text-red-500" : "text-neutral-400"}`}
          fill={isWishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Secondary image on hover */}
          <Image
            src={product.images[1] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full z-10">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] tracking-wider uppercase px-2.5 py-1.5 rounded-full z-10">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <span className="bg-white text-neutral-900 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
            <div className="bg-white/95 backdrop-blur-sm text-center py-3.5 rounded-full text-sm font-medium shadow-lg">
              View Product →
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] text-neutral-400 tracking-[0.2em] uppercase">
            {product.category}
          </p>
          <h3 className="font-medium text-[15px] group-hover:underline underline-offset-4 decoration-neutral-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[15px]">
              &#8377;{product.price.toLocaleString("en-IN")}
            </p>
            {product.originalPrice && (
              <p className="text-neutral-400 line-through text-sm">
                &#8377;{product.originalPrice.toLocaleString("en-IN")}
              </p>
            )}
          </div>
          {/* Color dots */}
          <div className="flex gap-1.5 pt-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color}
                className="w-3 h-3 rounded-full border border-neutral-200"
                style={{
                  backgroundColor:
                    color === "White" || color === "Ivory" || color === "Off-White" || color === "Pearl" || color === "Cream"
                      ? "#f5f5f0"
                      : color === "Beige" || color === "Sand" || color === "Tan"
                      ? "#d4b896"
                      : color === "Olive" || color === "Sage"
                      ? "#6b7c3e"
                      : color === "Forest"
                      ? "#2d4a22"
                      : color === "Navy"
                      ? "#1a2744"
                      : color === "Charcoal" || color === "Slate" || color === "Graphite"
                      ? "#4a4a4a"
                      : color === "Black"
                      ? "#111"
                      : color === "Rust" || color === "Terracotta" || color === "Burnt Orange"
                      ? "#b7523c"
                      : "#d4d4d4",
                }}
                title={color}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
