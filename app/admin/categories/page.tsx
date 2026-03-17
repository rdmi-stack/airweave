"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductStore } from "@/lib/product-store";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

export default function CategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProductStore();

  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const getCategoryProductCount = (name: string) =>
    products.filter((p) => p.category === name).length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addCategory({ name: newName.trim(), image: newImage.trim() });
    setNewName("");
    setNewImage("");
  };

  const handleEdit = (name: string) => {
    updateCategory(name, { name: editName.trim() || name, image: editImage });
    setEditingName(null);
  };

  const startEdit = (name: string, image: string) => {
    setEditingName(name);
    setEditName(name);
    setEditImage(image);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Categories</h1>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex gap-3 items-end flex-wrap">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name"
            className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
          />
        </div>
        <div className="flex-1 min-w-[240px]">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL</label>
          <input
            type="url"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Add Category
        </button>
      </form>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Image</th>
              <th className="text-left px-5 py-3 font-medium">Name</th>
              <th className="text-left px-5 py-3 font-medium">Products</th>
              <th className="text-right px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {categories.map((cat) => {
              const count = getCategoryProductCount(cat.name);
              const isEditing = editingName === cat.name;

              return (
                <tr key={cat.name} className="hover:bg-neutral-50">
                  <td className="px-5 py-3">
                    {cat.image ? (
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-neutral-100">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-neutral-100" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 border border-neutral-200 rounded-lg text-sm w-32"
                        />
                        <input
                          type="url"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          className="px-2 py-1 border border-neutral-200 rounded-lg text-sm w-48"
                          placeholder="Image URL"
                        />
                      </div>
                    ) : (
                      <span className="font-medium text-neutral-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{count}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleEdit(cat.name)}
                            className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingName(null)}
                            className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(cat.name, cat.image)}
                            className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (count > 0) return;
                              setDeleteTarget(cat.name);
                            }}
                            disabled={count > 0}
                            className={`px-3 py-1.5 text-xs font-medium border rounded-lg ${
                              count > 0
                                ? "text-neutral-300 border-neutral-100 cursor-not-allowed"
                                : "text-red-600 border-red-200 hover:bg-red-50"
                            }`}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteCategory(deleteTarget);
        }}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
      />
    </motion.div>
  );
}
