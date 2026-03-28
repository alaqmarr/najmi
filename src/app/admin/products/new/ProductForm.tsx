"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../actions";
import { Button } from "@/components/ui/button";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export default function ProductForm({ categories, brands }: { categories: any[], brands: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  
  // Get subcategories from the selected category
  const selectedCategory = categories.find((c: any) => c.id === selectedCategoryId);
  const subCategories = selectedCategory?.subCategories || [];
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get("name"),
      categoryId: formData.get("categoryId"),
      subCategoryId: formData.get("subCategoryId") || null,
      brandId: formData.get("brandId"),
      description: formData.get("description"),
      status: formData.get("status"),
      image,
    };

    startTransition(async () => {
      const result = await createProduct(data);
      if (result.success) {
        router.push("/admin/products");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 shadow-lg rounded-2xl border border-border">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Product Name *</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium" 
            placeholder="E.g. Socket Weld Flange"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Category *</label>
          <select 
            name="categoryId" 
            required 
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          >
            <option value="">Select Category</option>
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {subCategories.length > 0 && (
          <div>
            <label className="block text-sm font-bold mb-2">Subcategory</label>
            <select 
              name="subCategoryId" 
              className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
            >
              <option value="">None</option>
              {subCategories.map((sc: any) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold mb-2">Brand *</label>
          <select 
            name="brandId" 
            required 
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
          >
            <option value="">Select Brand</option>
            {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold mb-2">Status</label>
          <select 
            name="status" 
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
            rows={4}
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium" 
            placeholder="Product detailed description..."
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
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">Cancel</button>
        <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
