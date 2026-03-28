"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "../../../actions";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export default function ProductEditForm({ product, categories, brands }: { product: any; categories: any[]; brands: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState(product.image || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      categoryId: formData.get("categoryId"),
      brandId: formData.get("brandId"),
      description: formData.get("description"),
      status: formData.get("status"),
      image,
    };

    startTransition(async () => {
      const result = await updateProduct(product.id, data);
      if (result.success) {
        router.push("/admin/products");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 shadow-lg rounded-2xl border border-border">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Product Name *</label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Category *</label>
          <select
            name="categoryId"
            defaultValue={product.categoryId}
            required
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Brand *</label>
          <select
            name="brandId"
            defaultValue={product.brandId}
            required
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            name="status"
            defaultValue={product.status}
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            defaultValue={product.description || ""}
            rows={4}
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Product Image</label>
          <CloudinaryUpload
            value={image}
            onChange={(url) => setImage(url)}
            onRemove={() => setImage("")}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
