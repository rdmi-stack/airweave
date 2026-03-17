"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { useAdminStore } from "@/lib/admin-store";

type Step = "address" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, addresses, addAddress, addOrder } = useAuthStore();
  const { settings, applyCoupon, incrementCouponUsage } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("address");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponError, setCouponError] = useState("");

  // Address form
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPincode, setAddrPincode] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !user) router.push("/login");
  }, [mounted, user, router]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const def = addresses.find((a) => a.isDefault);
      setSelectedAddress(def?.id || addresses[0].id);
    }
  }, [addresses, selectedAddress]);

  if (!mounted || !user) {
    return (
      <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6 text-center py-24">
        <h1 className="text-2xl font-light mb-3">Your cart is empty</h1>
        <Link href="/products" className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-xl text-sm font-medium">
          Continue Shopping
        </Link>
      </main>
    );
  }

  const shipping = totalPrice() >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const total = totalPrice() + shipping - couponDiscount;

  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode, totalPrice());
    if (result.valid) {
      setCouponDiscount(result.discount);
      setCouponApplied(couponCode.toUpperCase());
      setCouponError("");
    } else {
      setCouponDiscount(0);
      setCouponApplied("");
      setCouponError(result.error || "Invalid coupon");
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponApplied("");
    setCouponError("");
  };
  const selectedAddr = addresses.find((a) => a.id === selectedAddress);

  const steps: { key: Step; label: string; num: number }[] = [
    { key: "address", label: "Address", num: 1 },
    { key: "payment", label: "Payment", num: 2 },
    { key: "review", label: "Review", num: 3 },
  ];
  const stepIndex = steps.findIndex((s) => s.key === step);

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      name: addrName, phone: addrPhone, line1: addrLine1, line2: addrLine2,
      city: addrCity, state: addrState, pincode: addrPincode,
      isDefault: addresses.length === 0,
    });
    setShowNewAddr(false);
    setAddrName(""); setAddrPhone(""); setAddrLine1(""); setAddrLine2("");
    setAddrCity(""); setAddrState(""); setAddrPincode("");
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = addOrder({
        status: "processing",
        items: items.map((i) => ({
          name: i.name, size: i.size, color: i.color,
          quantity: i.quantity, price: i.price, image: i.image,
        })),
        total: Math.max(0, total),
        address: selectedAddr
          ? `${selectedAddr.name}, ${selectedAddr.line1}, ${selectedAddr.city} — ${selectedAddr.pincode}`
          : "",
      });
      if (couponApplied) incrementCouponUsage(couponApplied);
      clearCart();
      router.push(`/order-success?id=${orderId}`);
    }, 1500);
  };

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extralight mb-2"
        >
          Check<span className="font-semibold italic">out</span>
        </motion.h1>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 mt-6">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <button
                onClick={() => i <= stepIndex && setStep(s.key)}
                className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${
                  i <= stepIndex ? "text-neutral-900" : "text-neutral-300"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    i < stepIndex
                      ? "bg-emerald-600 text-white"
                      : i === stepIndex
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-200 text-neutral-400"
                  }`}
                >
                  {i < stepIndex ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-12 h-px ${i < stepIndex ? "bg-emerald-600" : "bg-neutral-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-10">
          {/* Left — Steps */}
          <div>
            <AnimatePresence mode="wait">
              {/* ── ADDRESS STEP ── */}
              {step === "address" && (
                <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-medium mb-6">Delivery Address</h2>

                  {addresses.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`block rounded-2xl p-5 cursor-pointer border-2 transition-colors ${
                            selectedAddress === addr.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-100 hover:border-neutral-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddress === addr.id}
                              onChange={() => setSelectedAddress(addr.id)}
                              className="mt-1 accent-neutral-900"
                            />
                            <div>
                              <p className="font-medium">{addr.name} <span className="text-neutral-400 font-normal text-sm">({addr.phone})</span></p>
                              <p className="text-sm text-neutral-600 mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                              <p className="text-sm text-neutral-600">{addr.city}, {addr.state} — {addr.pincode}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {showNewAddr ? (
                    <form onSubmit={handleSaveNewAddress} className="bg-neutral-50 rounded-2xl p-6 space-y-4 mb-6">
                      <h3 className="font-medium">New Address</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <input value={addrName} onChange={(e) => setAddrName(e.target.value)} placeholder="Full Name *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                        <input value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} placeholder="Phone *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      </div>
                      <input value={addrLine1} onChange={(e) => setAddrLine1(e.target.value)} placeholder="Address Line 1 *" required className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      <input value={addrLine2} onChange={(e) => setAddrLine2(e.target.value)} placeholder="Address Line 2" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      <div className="grid grid-cols-3 gap-3">
                        <input value={addrCity} onChange={(e) => setAddrCity(e.target.value)} placeholder="City *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                        <input value={addrState} onChange={(e) => setAddrState(e.target.value)} placeholder="State *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                        <input value={addrPincode} onChange={(e) => setAddrPincode(e.target.value)} placeholder="Pincode *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      </div>
                      <div className="flex gap-3">
                        <button type="submit" className="bg-neutral-900 text-white px-6 py-3 rounded-xl text-sm font-medium cursor-pointer">Save</button>
                        <button type="button" onClick={() => setShowNewAddr(false)} className="text-sm text-neutral-500 cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setShowNewAddr(true)} className="text-sm text-neutral-500 hover:text-neutral-900 underline underline-offset-4 cursor-pointer mb-6 block">
                      + Add new address
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (!selectedAddress && addresses.length === 0) return;
                      setStep("payment");
                    }}
                    disabled={!selectedAddress && addresses.length === 0}
                    className="bg-neutral-900 text-white px-8 py-4 rounded-xl text-sm font-medium cursor-pointer disabled:opacity-40 hover:bg-neutral-800 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* ── PAYMENT STEP ── */}
              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-medium mb-6">Payment Method</h2>

                  <div className="space-y-3 mb-8">
                    {[
                      { id: "upi", label: "UPI (GPay, PhonePe, Paytm)", icon: "📱", desc: "Pay instantly via UPI" },
                      { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Rupay" },
                      { id: "netbanking", label: "Net Banking", icon: "🏦", desc: "All major banks supported" },
                      { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 rounded-2xl p-5 cursor-pointer border-2 transition-colors ${
                          paymentMethod === method.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-100 hover:border-neutral-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="accent-neutral-900"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{method.label}</p>
                          <p className="text-xs text-neutral-500">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="bg-neutral-50 rounded-2xl p-6 space-y-4 mb-6">
                      <input placeholder="Card Number" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM/YY" className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                        <input placeholder="CVV" className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                      </div>
                      <input placeholder="Name on Card" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep("address")} className="px-6 py-4 rounded-xl text-sm text-neutral-500 cursor-pointer">Back</button>
                    <button onClick={() => setStep("review")} className="bg-neutral-900 text-white px-8 py-4 rounded-xl text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors">
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── REVIEW STEP ── */}
              {step === "review" && (
                <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-xl font-medium mb-6">Review Your Order</h2>

                  {/* Address summary */}
                  <div className="bg-neutral-50 rounded-2xl p-5 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Deliver to</p>
                        {selectedAddr && (
                          <>
                            <p className="font-medium">{selectedAddr.name}</p>
                            <p className="text-sm text-neutral-600">{selectedAddr.line1}, {selectedAddr.city} — {selectedAddr.pincode}</p>
                          </>
                        )}
                      </div>
                      <button onClick={() => setStep("address")} className="text-xs underline text-neutral-500 cursor-pointer">Change</button>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-neutral-50 rounded-2xl p-5 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Payment</p>
                        <p className="font-medium capitalize">{paymentMethod === "upi" ? "UPI" : paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "netbanking" ? "Net Banking" : "Credit/Debit Card"}</p>
                      </div>
                      <button onClick={() => setStep("payment")} className="text-xs underline text-neutral-500 cursor-pointer">Change</button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 bg-neutral-50 rounded-xl p-4">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-neutral-500">{item.color} / {item.size} × {item.quantity}</p>
                        </div>
                        <p className="font-medium text-sm">&#8377;{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep("payment")} className="px-6 py-4 rounded-xl text-sm text-neutral-500 cursor-pointer">Back</button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Placing Order...
                        </span>
                      ) : (
                        `Place Order — ₹${total.toLocaleString("en-IN")}`
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order Summary (sticky) */}
          <div>
            <div className="bg-neutral-50 rounded-2xl p-6 lg:sticky lg:top-28">
              <h3 className="font-medium mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-neutral-400">{item.size} × {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium shrink-0">&#8377;{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
              {/* Coupon */}
              <div className="border-t pt-4 mb-4">
                {couponApplied ? (
                  <div className="flex items-center justify-between bg-emerald-50 rounded-lg px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      <span className="text-sm font-medium text-emerald-700">{couponApplied}</span>
                      <span className="text-xs text-emerald-600">-&#8377;{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-xs text-neutral-400 hover:text-red-500 cursor-pointer">Remove</button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                        placeholder="Coupon code"
                        className="flex-1 bg-neutral-100 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-neutral-400"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2.5 bg-neutral-900 text-white text-sm rounded-lg font-medium cursor-pointer hover:bg-neutral-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
                    <p className="text-[11px] text-neutral-400 mt-1.5">Try: WELCOME10, FLAT500</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>&#8377;{totalPrice().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-600" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({couponApplied})</span>
                    <span>-&#8377;{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>&#8377;{Math.max(0, total).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                SSL encrypted & secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
