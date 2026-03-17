"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, categories as seedCategories, type Product } from "./products";

export type { Product } from "./products";

export interface Category {
  name: string;
  image: string;
  count: number;
}

interface ProductStore {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, "id">) => number;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (cat: Omit<Category, "count">) => void;
  updateCategory: (name: string, updates: Partial<Category>) => void;
  deleteCategory: (name: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      categories: seedCategories,

      addProduct: (product) => {
        const id = Math.max(0, ...get().products.map((p) => p.id)) + 1;
        set((s) => ({ products: [...s.products, { ...product, id }] }));
        return id;
      },

      updateProduct: (id, updates) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      addCategory: (cat) =>
        set((s) => ({ categories: [...s.categories, { ...cat, count: 0 }] })),

      updateCategory: (name, updates) =>
        set((s) => ({
          categories: s.categories.map((c) =>
            c.name === name ? { ...c, ...updates } : c
          ),
        })),

      deleteCategory: (name) =>
        set((s) => ({ categories: s.categories.filter((c) => c.name !== name) })),
    }),
    { name: "airweave-products" }
  )
);
