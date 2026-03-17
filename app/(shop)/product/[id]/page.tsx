"use client";

import { useState, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";
import { useProductStore } from "@/lib/product-store";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import ProductCard from "@/app/components/ProductCard";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── reviews data ── */
const reviews = [
  {
    name: "Vikram S.",
    location: "Mumbai",
    rating: 5,
    date: "2 weeks ago",
    size: "L",
    text: "Fits perfectly. The fabric is incredibly breathable — I wore it through a full day in 38°C heat and felt comfortable the entire time. The quality easily rivals brands 3x the price.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    verified: true,
  },
  {
    name: "Ananya R.",
    location: "Bangalore",
    rating: 5,
    date: "1 month ago",
    size: "M",
    text: "Bought this as a gift and the recipient loved it. The packaging is premium, the fabric feels luxurious, and the fit is spot on. Will definitely buy more colors.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    verified: true,
  },
  {
    name: "Karthik M.",
    location: "Delhi",
    rating: 4,
    date: "3 weeks ago",
    size: "XL",
    text: "Great shirt, excellent material. Only reason for 4 stars is I wish there were more color options. The linen gets softer with each wash as promised. Highly recommend.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    verified: true,
  },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const products = useProductStore((s) => s.products);
  const product = products.find((p) => p.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);
  const { wishlist, toggleWishlist } = useAuthStore();
  const isWishlisted = product ? wishlist.includes(product.id) : false;
  const [showShareToast, setShowShareToast] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!product) return notFound();

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const completeLook = products
    .filter((p) => p.category !== product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor || product.colors[0],
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <main className="pt-20 pb-20 overflow-x-hidden">
      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-5">
        <div className="flex items-center gap-2 text-xs text-neutral-400 tracking-wide">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/products" className="hover:text-neutral-900 transition-colors">
            Shop
          </Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-neutral-900 transition-colors"
          >
            {product.category}
          </Link>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-neutral-900">{product.name}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRODUCT MAIN
      ══════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── LEFT: IMAGE GALLERY ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            {/* Thumbnails — vertical strip */}
            <div className="hidden md:flex flex-col gap-3 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-[72px] h-[90px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === i
                      ? "ring-2 ring-neutral-900 ring-offset-2 opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              ))}
            </div>

            {/* Main image with zoom */}
            <div className="flex-1 flex flex-col gap-3">
              <div
                ref={imageRef}
                className="relative aspect-[4/5] max-h-[75vh] rounded-2xl overflow-hidden bg-neutral-100 cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-200"
                      style={{
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        transform: isZooming ? "scale(1.8)" : "scale(1)",
                      }}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badge && (
                    <span className="bg-black text-white text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-emerald-600 text-white text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full">
                      -{discount}% off
                    </span>
                  )}
                </div>

                {/* Zoom hint */}
                {!isZooming && (
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 z-10">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                )}

                {/* Nav arrows */}
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Mobile thumbnail dots */}
              <div className="flex md:hidden justify-center gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      selectedImage === i ? "bg-neutral-900 w-6" : "bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: PRODUCT DETAILS (STICKY) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:self-start"
          >
            {/* Category & title */}
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-[2.5rem] font-extralight leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {Array(5)
                  .fill(null)
                  .map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <span className="text-sm text-neutral-500">4.9 (127 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-semibold">
                &#8377;{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-neutral-400 line-through text-lg">
                    &#8377;{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                    Save &#8377;{(product.originalPrice - product.price).toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </div>

            <p className="text-neutral-500 leading-relaxed mb-8">
              {product.desc}
            </p>

            <div className="h-px bg-neutral-100 mb-6" />

            {/* ── COLOR SELECTOR ── */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                Color
                <span className="font-normal text-neutral-400">—</span>
                <span className="font-normal text-neutral-500">
                  {selectedColor || product.colors[0]}
                </span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => {
                  const active = (selectedColor || product.colors[0]) === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2.5 rounded-full text-sm border-2 transition-all cursor-pointer ${
                        active
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 hover:border-neutral-400 text-neutral-600"
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── SIZE SELECTOR ── */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium flex items-center gap-2">
                  Size
                  <span className="font-normal text-neutral-400">—</span>
                  <span className="font-normal text-neutral-500">
                    {selectedSize || "Select a size"}
                  </span>
                </p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-neutral-500 underline underline-offset-4 hover:text-neutral-900 cursor-pointer transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeError(false);
                    }}
                    className={`w-14 h-14 rounded-xl text-sm font-medium transition-all cursor-pointer border-2 ${
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {showSizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Please select a size to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* ── QUANTITY + ADD TO CART ── */}
            <div className="flex gap-3 mb-4">
              {/* Quantity */}
              <div className="flex items-center border-2 border-neutral-200 rounded-xl shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-14 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-14 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer overflow-hidden relative group ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      Add to Cart — &#8377;{(product.price * quantity).toLocaleString("en-IN")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => product && toggleWishlist(product.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 rounded-xl text-sm transition-all cursor-pointer ${
                  isWishlisted
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({ title: product?.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    setShowShareToast(true);
                    setTimeout(() => setShowShareToast(false), 2000);
                  }
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-neutral-200 rounded-xl text-sm text-neutral-600 hover:border-neutral-400 transition-colors cursor-pointer relative"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                {showShareToast ? "Copied!" : "Share"}
              </button>
            </div>

            {/* ── ACCORDION SECTIONS ── */}
            <div className="border-t border-neutral-100">
              {/* Product Details */}
              <AccordionItem
                title="Product Details"
                id="details"
                open={openAccordion}
                setOpen={setOpenAccordion}
              >
                <ul className="space-y-2.5">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              {/* Shipping */}
              <AccordionItem
                title="Shipping & Delivery"
                id="shipping"
                open={openAccordion}
                setOpen={setOpenAccordion}
              >
                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Free shipping on orders above ₹2,999</p>
                      <p>Standard delivery: 3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Same-day delivery in Mumbai</p>
                      <p>Order before 2 PM for same-day dispatch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Cash on Delivery available</p>
                      <p>Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Returns */}
              <AccordionItem
                title="Returns & Exchanges"
                id="returns"
                open={openAccordion}
                setOpen={setOpenAccordion}
              >
                <div className="space-y-3 text-sm text-neutral-600">
                  <p>
                    We offer hassle-free returns within <strong className="text-neutral-900">15 days</strong> of delivery.
                    Items must be unworn with original tags attached.
                  </p>
                  <p>
                    <strong className="text-neutral-900">Free return shipping</strong> — we&apos;ll send a pickup to your doorstep.
                    Refunds are processed within 5-7 business days.
                  </p>
                  <p>
                    <strong className="text-neutral-900">Exchanges:</strong> We&apos;ll ship your new size/color as soon as we receive the return.
                  </p>
                </div>
              </AccordionItem>

              {/* Care */}
              <AccordionItem
                title="Care Instructions"
                id="care"
                open={openAccordion}
                setOpen={setOpenAccordion}
              >
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "💧", text: "Machine wash cold" },
                    { icon: "🌡️", text: "Iron on medium heat" },
                    { icon: "🚫", text: "Do not bleach" },
                    { icon: "🪢", text: "Hang dry recommended" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-2 bg-neutral-50 rounded-lg px-3 py-2.5 text-sm text-neutral-600"
                    >
                      <span>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </div>

            {/* ── TRUST BADGES ── */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                {
                  icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
                  label: "Free Shipping",
                },
                {
                  icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182",
                  label: "15-Day Returns",
                },
                {
                  icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
                  label: "Secure Payment",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center gap-2 py-4 bg-neutral-50 rounded-xl"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          REVIEWS SECTION
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 mt-24">
        <div className="border-t pt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-[300px,1fr] gap-12"
          >
            {/* Rating summary */}
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl font-extralight mb-6">
                Customer <span className="font-semibold italic">Reviews</span>
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-semibold">4.9</span>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {Array(5)
                      .fill(null)
                      .map((_, j) => (
                        <svg key={j} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-sm text-neutral-500">Based on 127 reviews</p>
                </div>
              </div>

              {/* Star breakdown */}
              <div className="space-y-2">
                {[
                  { stars: 5, count: 108, pct: 85 },
                  { stars: 4, count: 14, pct: 11 },
                  { stars: 3, count: 3, pct: 2.5 },
                  { stars: 2, count: 1, pct: 0.8 },
                  { stars: 1, count: 1, pct: 0.7 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-neutral-500">{row.stars}</span>
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-neutral-400">{row.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Review cards */}
            <motion.div variants={fadeUp} className="space-y-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative">
                        <Image src={review.image} alt={review.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <p className="font-medium text-sm flex items-center gap-1.5">
                          {review.name}
                          {review.verified && (
                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                          )}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {review.location} · Size {review.size}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array(review.rating)
                      .fill(null)
                      .map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {review.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMPLETE THE LOOK
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-2"
          >
            Style It
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extralight"
          >
            Complete the <span className="font-semibold italic">Look</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {completeLook.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          YOU MAY ALSO LIKE
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-2"
          >
            More To Explore
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extralight"
          >
            You Might Also <span className="font-semibold italic">Like</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SIZE GUIDE MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-neutral-500 mb-6">
                Measurements are in inches. For the best fit, measure a similar garment you own.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Size</th>
                    <th className="text-center py-3 font-medium">Chest</th>
                    <th className="text-center py-3 font-medium">Length</th>
                    <th className="text-center py-3 font-medium">Shoulder</th>
                    <th className="text-center py-3 font-medium">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  {[
                    { size: "S", chest: "38", length: "27", shoulder: "17", sleeve: "24" },
                    { size: "M", chest: "40", length: "28", shoulder: "17.5", sleeve: "24.5" },
                    { size: "L", chest: "42", length: "29", shoulder: "18", sleeve: "25" },
                    { size: "XL", chest: "44", length: "30", shoulder: "18.5", sleeve: "25.5" },
                    { size: "XXL", chest: "46", length: "31", shoulder: "19", sleeve: "26" },
                  ].map((row) => (
                    <tr key={row.size} className="border-b border-neutral-100">
                      <td className="py-3 font-medium text-neutral-900">{row.size}</td>
                      <td className="py-3 text-center">{row.chest}&quot;</td>
                      <td className="py-3 text-center">{row.length}&quot;</td>
                      <td className="py-3 text-center">{row.shoulder}&quot;</td>
                      <td className="py-3 text-center">{row.sleeve}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 bg-neutral-50 rounded-xl p-4 text-sm text-neutral-500">
                <p className="font-medium text-neutral-900 mb-1">Tip:</p>
                <p>
                  Our linen shirts have a relaxed fit. If you prefer a more fitted look, we recommend
                  sizing down. For an oversized look, go one size up.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ── Accordion Component ── */
function AccordionItem({
  title,
  id,
  open,
  setOpen,
  children,
}: {
  title: string;
  id: string;
  open: string | null;
  setOpen: (id: string | null) => void;
  children: React.ReactNode;
}) {
  const isOpen = open === id;

  return (
    <div className="border-b border-neutral-100">
      <button
        onClick={() => setOpen(isOpen ? null : id)}
        className="w-full flex items-center justify-between py-5 text-sm font-medium cursor-pointer group"
      >
        {title}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
