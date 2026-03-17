"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: {
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  address: string;
  trackingId?: string;
}

interface AuthStore {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  wishlist: number[];
  login: (email: string, password: string) => boolean;
  loginWithPhone: (phone: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  registerWithPhone: (name: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleWishlist: (productId: number) => void;
  addOrder: (order: Omit<Order, "id" | "date">) => string;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      orders: [],
      wishlist: [],

      login: (email: string, _password: string) => {
        set({
          user: {
            id: "usr_" + Math.random().toString(36).slice(2, 10),
            name: email.split("@")[0],
            email,
            phone: "",
          },
        });
        return true;
      },

      loginWithPhone: (phone: string) => {
        set({
          user: {
            id: "usr_" + Math.random().toString(36).slice(2, 10),
            name: "User",
            email: "",
            phone,
          },
        });
        return true;
      },

      register: (name: string, email: string, phone: string, _password: string) => {
        const userId = "usr_" + Math.random().toString(36).slice(2, 10);
        set({
          user: { id: userId, name, email, phone },
        });
        // Sync to admin store
        try {
          const { addCustomerFromStorefront } = require("./admin-store").useAdminStore.getState();
          addCustomerFromStorefront({
            id: userId, name, email, phone,
            joinedAt: new Date().toISOString().split("T")[0],
            totalSpent: 0, orderCount: 0,
          });
        } catch { /* admin store may not be loaded */ }
        return true;
      },

      registerWithPhone: (name: string, phone: string) => {
        const userId = "usr_" + Math.random().toString(36).slice(2, 10);
        set({
          user: { id: userId, name, email: "", phone },
        });
        try {
          const { addCustomerFromStorefront } = require("./admin-store").useAdminStore.getState();
          addCustomerFromStorefront({
            id: userId, name, email: "", phone,
            joinedAt: new Date().toISOString().split("T")[0],
            totalSpent: 0, orderCount: 0,
          });
        } catch { /* admin store may not be loaded */ }
        return true;
      },

      logout: () => set({ user: null }),

      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses.map((a) =>
              address.isDefault ? { ...a, isDefault: false } : a
            ),
            { ...address, id: "addr_" + Math.random().toString(36).slice(2, 10) },
          ],
        })),

      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),

      addOrder: (order) => {
        const id = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
        const date = new Date().toISOString();
        const fullOrder = { ...order, id, date };
        set((state) => ({
          orders: [fullOrder, ...state.orders],
        }));
        // Sync to admin store
        try {
          const user = get().user;
          const adminStore = require("./admin-store").useAdminStore.getState();
          adminStore.addOrderFromStorefront({
            ...fullOrder,
            customerId: user?.id || "",
            customerName: user?.name || "",
            customerEmail: user?.email || "",
          });
          if (user) {
            adminStore.addCustomerFromStorefront({
              id: user.id, name: user.name, email: user.email, phone: user.phone,
              joinedAt: new Date().toISOString().split("T")[0],
              totalSpent: order.total, orderCount: 1,
            });
          }
        } catch { /* admin store may not be loaded */ }
        return id;
      },
    }),
    { name: "airweave-auth" }
  )
);
