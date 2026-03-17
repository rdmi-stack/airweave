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
  register: (name: string, email: string, phone: string, password: string) => boolean;
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
        // Simulated login — in production, call your API
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

      register: (name: string, email: string, phone: string, _password: string) => {
        set({
          user: {
            id: "usr_" + Math.random().toString(36).slice(2, 10),
            name,
            email,
            phone,
          },
        });
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
        set((state) => ({
          orders: [
            { ...order, id, date: new Date().toISOString() },
            ...state.orders,
          ],
        }));
        return id;
      },
    }),
    { name: "airweave-auth" }
  )
);
