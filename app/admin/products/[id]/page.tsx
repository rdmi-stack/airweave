"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProductStore } from "@/lib/product-store";

const allSizes = ["S", "M", "L", "XL", "XXL"];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { products, categories, updateProduct } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice?.toString() || "");
  const [desc, setDesc] = useState(product?.desc || "");
  const [category, setCategory] = useState(product?.category || categories[0]?.name || "");
  const [colorsInput, setColorsInput] = useState(product?.colors?.join(", ") || "");
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [details, setDetails] = useState<string[]>(product?.details?.length ? product.details : [""]);
  const [images, setImages] = useState<string[]>(product?.images?.length ? product.images : [""]);
  const [badge, setBadge] = useState(product?.badge || "");
  const [stock, setStock] = useState(String(product?.stock ?? 20));

  if (!product) {
    return (
      <div className="text-center py-20 text-neutral-400">Product not found.</div>
    );
  }

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      desc,
      category,
      colors: colorsInput.split(",").map((c) => c.trim()).filter(Boolean),
      sizes,
      details: details.filter(Boolean),
      images: images.filter(Boolean),
      badge: badge || undefined,
      stock: Number(stock),
    });
    router.push("/admin/products");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Original Price (₹, optional)</label>
            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} required className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 bg-white">
            {categories.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Colors (comma-separated)</label>
          <input type="text" value={colorsInput} onChange={(e) => setColorsInput(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Sizes</label>
          <div className="flex gap-2">
            {allSizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  sizes.includes(s)
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Details</label>
          {details.map((d, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={d}
                onChange={(e) => { const copy = [...details]; copy[i] = e.target.value; setDetails(copy); }}
                className="flex-1 px-3 py-2 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
              {details.length > 1 && (
                <button type="button" onClick={() => setDetails(details.filter((_, j) => j !== i))} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setDetails([...details, ""])} className="text-sm text-neutral-500 hover:text-neutral-900">+ Add detail</button>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Image URLs</label>
          {images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="url"
                value={img}
                onChange={(e) => { const copy = [...images]; copy[i] = e.target.value; setImages(copy); }}
                className="flex-1 px-3 py-2 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
              />
              {images.length > 1 && (
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setImages([...images, ""])} className="text-sm text-neutral-500 hover:text-neutral-900">+ Add image</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Badge (optional)</label>
            <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min="0" className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors">
            Save Changes
          </button>
          <button type="button" onClick={() => router.push("/admin/products")} className="px-6 py-2.5 text-sm font-medium border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
