"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager";
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface MockCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  totalSpent: number;
  orderCount: number;
}

export interface MockOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; size: string; color: string; quantity: number; price: number; image: string }[];
  total: number;
  address: string;
  trackingId?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: string;
  freeShippingThreshold: number;
  shippingFee: number;
  contactEmail: string;
  contactPhone: string;
  instagram: string;
  twitter: string;
}

/* ── seed data ── */
const seedCustomers: MockCustomer[] = [
  { id: "cust_1", name: "Arjun Mehta", email: "arjun@example.com", phone: "+91 98765 43210", joinedAt: "2025-11-15", totalSpent: 12497, orderCount: 3 },
  { id: "cust_2", name: "Priya Sharma", email: "priya@example.com", phone: "+91 87654 32109", joinedAt: "2025-12-02", totalSpent: 5999, orderCount: 1 },
  { id: "cust_3", name: "Rahul Verma", email: "rahul@example.com", phone: "+91 76543 21098", joinedAt: "2026-01-10", totalSpent: 8298, orderCount: 2 },
  { id: "cust_4", name: "Sneha Patel", email: "sneha@example.com", phone: "+91 65432 10987", joinedAt: "2026-01-22", totalSpent: 3499, orderCount: 1 },
  { id: "cust_5", name: "Karthik Nair", email: "karthik@example.com", phone: "+91 54321 09876", joinedAt: "2026-02-05", totalSpent: 7798, orderCount: 2 },
  { id: "cust_6", name: "Ananya Reddy", email: "ananya@example.com", phone: "+91 43210 98765", joinedAt: "2026-02-14", totalSpent: 4299, orderCount: 1 },
  { id: "cust_7", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 32109 87654", joinedAt: "2026-02-28", totalSpent: 9498, orderCount: 2 },
  { id: "cust_8", name: "Meera Iyer", email: "meera@example.com", phone: "+91 21098 76543", joinedAt: "2026-03-01", totalSpent: 6398, orderCount: 2 },
];

const seedOrders: MockOrder[] = [
  { id: "ORD-A1B2C3", customerId: "cust_1", customerName: "Arjun Mehta", customerEmail: "arjun@example.com", date: "2026-03-15T10:30:00Z", status: "processing", items: [{ name: "Beige Linen Shirt", size: "L", color: "Beige", quantity: 1, price: 3499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" }], total: 3499, address: "Arjun Mehta, 12 Marine Drive, Mumbai — 400020" },
  { id: "ORD-D4E5F6", customerId: "cust_2", customerName: "Priya Sharma", customerEmail: "priya@example.com", date: "2026-03-14T14:20:00Z", status: "shipped", items: [{ name: "Sand Linen Co-ord Set", size: "M", color: "Sand", quantity: 1, price: 5999, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" }], total: 5999, address: "Priya Sharma, 45 Connaught Place, Delhi — 110001", trackingId: "DELHIVERY-98765" },
  { id: "ORD-G7H8I9", customerId: "cust_3", customerName: "Rahul Verma", customerEmail: "rahul@example.com", date: "2026-03-13T09:15:00Z", status: "delivered", items: [{ name: "Olive Linen Shirt", size: "XL", color: "Olive", quantity: 1, price: 3799, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80" }, { name: "Navy Linen Trousers", size: "XL", color: "Navy", quantity: 1, price: 4299, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80" }], total: 8098, address: "Rahul Verma, 78 MG Road, Bangalore — 560001", trackingId: "BLUEDART-12345" },
  { id: "ORD-J1K2L3", customerId: "cust_4", customerName: "Sneha Patel", customerEmail: "sneha@example.com", date: "2026-03-12T16:45:00Z", status: "delivered", items: [{ name: "White Linen Shirt", size: "S", color: "White", quantity: 1, price: 3199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80" }], total: 3199, address: "Sneha Patel, 23 SG Highway, Ahmedabad — 380015", trackingId: "DTDC-56789" },
  { id: "ORD-M4N5O6", customerId: "cust_5", customerName: "Karthik Nair", customerEmail: "karthik@example.com", date: "2026-03-11T11:00:00Z", status: "shipped", items: [{ name: "Charcoal Linen Overshirt", size: "L", color: "Charcoal", quantity: 1, price: 4499, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80" }], total: 4499, address: "Karthik Nair, 56 Infopark, Kochi — 682030", trackingId: "ECOM-33445" },
  { id: "ORD-P7Q8R9", customerId: "cust_1", customerName: "Arjun Mehta", customerEmail: "arjun@example.com", date: "2026-03-10T08:30:00Z", status: "delivered", items: [{ name: "Sand Linen Co-ord Set", size: "L", color: "Sand", quantity: 1, price: 5999, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" }], total: 5999, address: "Arjun Mehta, 12 Marine Drive, Mumbai — 400020", trackingId: "DELHIVERY-44556" },
  { id: "ORD-S1T2U3", customerId: "cust_6", customerName: "Ananya Reddy", customerEmail: "ananya@example.com", date: "2026-03-09T13:15:00Z", status: "processing", items: [{ name: "Navy Linen Trousers", size: "M", color: "Navy", quantity: 1, price: 4299, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80" }], total: 4299, address: "Ananya Reddy, 89 Jubilee Hills, Hyderabad — 500033" },
  { id: "ORD-V4W5X6", customerId: "cust_7", customerName: "Vikram Singh", customerEmail: "vikram@example.com", date: "2026-03-08T17:00:00Z", status: "delivered", items: [{ name: "Ivory Linen Kurta", size: "L", color: "Ivory", quantity: 1, price: 3999, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80" }, { name: "Beige Linen Shirt", size: "L", color: "Beige", quantity: 1, price: 3499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" }], total: 7498, address: "Vikram Singh, 34 Sector 17, Chandigarh — 160017", trackingId: "BLUEDART-67890" },
  { id: "ORD-Y7Z8A1", customerId: "cust_5", customerName: "Karthik Nair", customerEmail: "karthik@example.com", date: "2026-03-07T10:00:00Z", status: "cancelled", items: [{ name: "Rust Linen Shorts", size: "M", color: "Rust", quantity: 1, price: 2499, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" }], total: 2499, address: "Karthik Nair, 56 Infopark, Kochi — 682030" },
  { id: "ORD-B2C3D4", customerId: "cust_8", customerName: "Meera Iyer", customerEmail: "meera@example.com", date: "2026-03-06T15:30:00Z", status: "delivered", items: [{ name: "White Linen Shirt", size: "M", color: "White", quantity: 2, price: 3199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80" }], total: 6398, address: "Meera Iyer, 67 Anna Nagar, Chennai — 600040", trackingId: "DTDC-11223" },
  { id: "ORD-E5F6G7", customerId: "cust_3", customerName: "Rahul Verma", customerEmail: "rahul@example.com", date: "2026-03-05T12:00:00Z", status: "processing", items: [{ name: "Olive Linen Shirt", size: "XL", color: "Sage", quantity: 1, price: 3799, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80" }], total: 3799, address: "Rahul Verma, 78 MG Road, Bangalore — 560001" },
  { id: "ORD-H8I9J1", customerId: "cust_7", customerName: "Vikram Singh", customerEmail: "vikram@example.com", date: "2026-03-04T09:45:00Z", status: "shipped", items: [{ name: "Rust Linen Shorts", size: "L", color: "Terracotta", quantity: 1, price: 2499, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80" }], total: 2499, address: "Vikram Singh, 34 Sector 17, Chandigarh — 160017", trackingId: "ECOM-78901" },
  { id: "ORD-K2L3M4", customerId: "cust_8", customerName: "Meera Iyer", customerEmail: "meera@example.com", date: "2026-03-03T14:00:00Z", status: "delivered", items: [{ name: "Beige Linen Shirt", size: "S", color: "Sand", quantity: 1, price: 3499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80" }], total: 3499, address: "Meera Iyer, 67 Anna Nagar, Chennai — 600040", trackingId: "DELHIVERY-99887" },
  { id: "ORD-N5O6P7", customerId: "cust_1", customerName: "Arjun Mehta", customerEmail: "arjun@example.com", date: "2026-03-02T11:30:00Z", status: "delivered", items: [{ name: "White Linen Shirt", size: "L", color: "Off-White", quantity: 1, price: 3199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80" }], total: 3199, address: "Arjun Mehta, 12 Marine Drive, Mumbai — 400020", trackingId: "BLUEDART-55443" },
];

const seedCoupons: Coupon[] = [
  { id: "cpn_1", code: "WELCOME10", type: "percentage", value: 10, minOrderValue: 2000, maxDiscount: 500, usageLimit: 100, usedCount: 34, isActive: true, expiresAt: "2026-06-30", createdAt: "2026-01-01" },
  { id: "cpn_2", code: "FLAT500", type: "fixed", value: 500, minOrderValue: 3999, usageLimit: 50, usedCount: 12, isActive: true, expiresAt: "2026-04-30", createdAt: "2026-02-15" },
  { id: "cpn_3", code: "SUMMER20", type: "percentage", value: 20, minOrderValue: 4999, maxDiscount: 1500, usageLimit: 200, usedCount: 0, isActive: false, expiresAt: "2026-09-30", createdAt: "2026-03-01" },
];

const defaultSettings: StoreSettings = {
  storeName: "Airweave",
  tagline: "Premium Linen Clothing",
  currency: "INR",
  freeShippingThreshold: 2999,
  shippingFee: 199,
  contactEmail: "hello@airweave.in",
  contactPhone: "+91 98765 43210",
  instagram: "@airweave.in",
  twitter: "@airweave",
};

interface AdminStore {
  adminUser: AdminUser | null;
  customers: MockCustomer[];
  orders: MockOrder[];
  coupons: Coupon[];
  settings: StoreSettings;

  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;

  updateOrderStatus: (id: string, status: MockOrder["status"], trackingId?: string) => void;

  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount" | "createdAt">) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponActive: (id: string) => void;

  updateSettings: (data: Partial<StoreSettings>) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminUser: null,
      customers: seedCustomers,
      orders: seedOrders,
      coupons: seedCoupons,
      settings: defaultSettings,

      adminLogin: (email, password) => {
        if (email === "admin@airweave.in" && password === "admin123") {
          set({
            adminUser: { id: "adm_1", name: "Admin", email, role: "admin" },
          });
          return true;
        }
        return false;
      },

      adminLogout: () => set({ adminUser: null }),

      updateOrderStatus: (id, status, trackingId) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status, ...(trackingId !== undefined ? { trackingId } : {}) } : o
          ),
        })),

      addCoupon: (coupon) =>
        set((s) => ({
          coupons: [
            ...s.coupons,
            {
              ...coupon,
              id: "cpn_" + Math.random().toString(36).slice(2, 8),
              usedCount: 0,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ],
        })),

      updateCoupon: (id, updates) =>
        set((s) => ({
          coupons: s.coupons.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCoupon: (id) =>
        set((s) => ({ coupons: s.coupons.filter((c) => c.id !== id) })),

      toggleCouponActive: (id) =>
        set((s) => ({
          coupons: s.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        })),

      updateSettings: (data) =>
        set((s) => ({ settings: { ...s.settings, ...data } })),
    }),
    { name: "airweave-admin" }
  )
);
