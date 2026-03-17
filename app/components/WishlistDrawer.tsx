"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";
import { useProductStore } from "@/lib/product-store";
import { useCartStore } from "@/lib/cart-store";

export default function WishlistDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { wishlist, toggleWishlist } = useAuthStore();
  const products = useProductStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
    toggleWishlist(product.id);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <h2 className="text-lg font-semibold">
                  Wishlist
                  <span className="text-neutral-400 font-normal text-sm ml-1.5">
                    ({wishlisted.length})
                  </span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {wishlisted.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <svg className="w-16 h-16 text-neutral-200 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Your wishlist is empty</h3>
                  <p className="text-neutral-500 text-sm mb-6">
                    Tap the heart on products you love
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {wishlisted.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 bg-neutral-50 rounded-xl p-3"
                      >
                        <Link
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <Link
                              href={`/product/${product.id}`}
                              onClick={onClose}
                              className="font-medium text-sm hover:underline line-clamp-1"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {product.category}
                            </p>
                            <p className="font-semibold text-sm mt-1">
                              &#8377;{product.price.toLocaleString("en-IN")}
                              {product.originalPrice && (
                                <span className="text-neutral-400 line-through text-xs ml-1.5 font-normal">
                                  &#8377;{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 bg-neutral-900 text-white py-2 rounded-lg text-xs font-medium cursor-pointer hover:bg-neutral-800 transition-colors"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="w-9 h-9 border border-neutral-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-red-300 hover:bg-red-50 transition-colors shrink-0"
                            >
                              <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlisted.length > 0 && (
              <div className="border-t px-6 py-4">
                <Link
                  href="/products"
                  onClick={onClose}
                  className="block text-center text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
