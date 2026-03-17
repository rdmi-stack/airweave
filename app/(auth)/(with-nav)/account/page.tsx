"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";
import { useProductStore } from "@/lib/product-store";

const tabs = ["Orders", "Addresses", "Wishlist", "Profile"] as const;
type Tab = (typeof tabs)[number];

export default function AccountPage() {
  const router = useRouter();
  const { user, orders, addresses, wishlist, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Orders");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Address form
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPincode, setAddrPincode] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) router.push("/login");
  }, [mounted, user, router]);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditEmail(user.email);
      setEditPhone(user.phone);
    }
  }, [user]);

  if (!mounted || !user) {
    return (
      <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </main>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({ name: editName, email: editEmail, phone: editPhone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      name: addrName, phone: addrPhone, line1: addrLine1, line2: addrLine2,
      city: addrCity, state: addrState, pincode: addrPincode,
      isDefault: addresses.length === 0,
    });
    setShowAddAddress(false);
    setAddrName(""); setAddrPhone(""); setAddrLine1(""); setAddrLine2("");
    setAddrCity(""); setAddrState(""); setAddrPincode("");
  };

  const statusColor = (s: string) =>
    s === "delivered" ? "bg-emerald-100 text-emerald-700" :
    s === "shipped" ? "bg-blue-100 text-blue-700" :
    s === "processing" ? "bg-amber-100 text-amber-700" :
    "bg-red-100 text-red-700";

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-1">My Account</p>
            <h1 className="text-3xl font-extralight">
              Hello, <span className="font-semibold italic">{user.name}</span>
            </h1>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="text-sm text-neutral-500 hover:text-red-500 transition-colors cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap px-4 ${
                activeTab === tab ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── ORDERS TAB ── */}
        {activeTab === "Orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-neutral-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-neutral-500 mb-6">When you place an order, it will appear here.</p>
                <Link href="/products" className="inline-block bg-neutral-900 text-white px-8 py-3.5 rounded-xl text-sm font-medium">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <div
                      key={order.id}
                      className="bg-neutral-50 rounded-2xl p-6 cursor-pointer hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-neutral-500">
                            {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="font-semibold">&#8377;{order.total.toLocaleString("en-IN")}</span>
                          <svg
                            className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex gap-3 overflow-x-auto">
                        {order.items.map((item, i) => (
                          <div key={i} className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                          </div>
                        ))}
                      </div>

                      {/* Expanded Order Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-5 pt-5 border-t border-neutral-200"
                        >
                          <div className="space-y-3">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-4">
                                <div className="relative w-14 h-16 rounded-lg overflow-hidden shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-neutral-500">
                                    Size: {item.size} &middot; Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-sm font-medium shrink-0">
                                  &#8377;{(item.price * item.quantity).toLocaleString("en-IN")}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap justify-between gap-4 text-sm">
                            <div className="space-y-1 text-neutral-500">
                              <p>Items: {order.items.reduce((sum, it) => sum + it.quantity, 0)}</p>
                              <p>Payment: COD</p>
                            </div>
                            <div className="text-right">
                              <p className="text-neutral-500">Total</p>
                              <p className="text-lg font-semibold">&#8377;{order.total.toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ── ADDRESSES TAB ── */}
        {activeTab === "Addresses" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {addresses.map((addr) => (
                <div key={addr.id} className={`relative bg-neutral-50 rounded-2xl p-6 border-2 ${addr.isDefault ? "border-neutral-900" : "border-transparent"}`}>
                  {addr.isDefault && (
                    <span className="absolute top-4 right-4 text-[10px] tracking-wider uppercase bg-neutral-900 text-white px-2.5 py-1 rounded-full">Default</span>
                  )}
                  <p className="font-medium">{addr.name}</p>
                  <p className="text-sm text-neutral-500 mt-1">{addr.phone}</p>
                  <p className="text-sm text-neutral-600 mt-2">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                  <p className="text-sm text-neutral-600">{addr.city}, {addr.state} — {addr.pincode}</p>
                  <div className="flex gap-3 mt-4">
                    {!addr.isDefault && (
                      <button onClick={() => setDefaultAddress(addr.id)} className="text-xs text-neutral-500 hover:text-neutral-900 cursor-pointer">Set as default</button>
                    )}
                    <button onClick={() => removeAddress(addr.id)} className="text-xs text-red-400 hover:text-red-600 cursor-pointer">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {showAddAddress ? (
              <form onSubmit={handleAddAddress} className="bg-neutral-50 rounded-2xl p-6 space-y-4">
                <h3 className="font-medium mb-2">Add New Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input value={addrName} onChange={(e) => setAddrName(e.target.value)} placeholder="Full Name *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                  <input value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} placeholder="Phone *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                </div>
                <input value={addrLine1} onChange={(e) => setAddrLine1(e.target.value)} placeholder="Address Line 1 *" required className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                <input value={addrLine2} onChange={(e) => setAddrLine2(e.target.value)} placeholder="Address Line 2" className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                <div className="grid grid-cols-3 gap-4">
                  <input value={addrCity} onChange={(e) => setAddrCity(e.target.value)} placeholder="City *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                  <input value={addrState} onChange={(e) => setAddrState(e.target.value)} placeholder="State *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                  <input value={addrPincode} onChange={(e) => setAddrPincode(e.target.value)} placeholder="Pincode *" required className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-neutral-900 text-white px-6 py-3 rounded-xl text-sm font-medium cursor-pointer">Save Address</button>
                  <button type="button" onClick={() => setShowAddAddress(false)} className="px-6 py-3 rounded-xl text-sm text-neutral-500 cursor-pointer">Cancel</button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddAddress(true)}
                className="w-full border-2 border-dashed border-neutral-200 rounded-2xl py-8 text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Address
              </button>
            )}
          </motion.div>
        )}

        {/* ── WISHLIST TAB ── */}
        {activeTab === "Wishlist" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-neutral-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">Wishlist is empty</h3>
                <p className="text-neutral-500 mb-6">Save items you love for later.</p>
                <Link href="/products" className="inline-block bg-neutral-900 text-white px-8 py-3.5 rounded-xl text-sm font-medium">
                  Browse Products
                </Link>
              </div>
            ) : (
              <WishlistGrid wishlist={wishlist} />
            )}
          </motion.div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === "Profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium block mb-2">Full Name</label>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Email</label>
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} type="email" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Phone</label>
                <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} type="tel" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400" />
              </div>
              <button
                onClick={handleSaveProfile}
                className={`px-8 py-3.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                  profileSaved ? "bg-emerald-600 text-white" : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                {profileSaved ? "Saved ✓" : "Save Changes"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function WishlistGrid({ wishlist }: { wishlist: number[] }) {
  const products = useProductStore((s) => s.products);
  const { toggleWishlist } = useAuthStore();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {wishlisted.map((product) => (
        <div key={product.id} className="group relative">
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-3">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
            <p className="text-xs text-neutral-400 tracking-wider uppercase">{product.category}</p>
            <h3 className="font-medium text-sm">{product.name}</h3>
            <p className="font-semibold text-sm">&#8377;{product.price.toLocaleString("en-IN")}</p>
          </Link>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
