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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const result = await createProduct(data);
      if (result.success) {
        router.push("/admin/products");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 shadow rounded-lg border border-border">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Product Name *</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full rounded-md border border-input p-2.5 bg-background focus:ring-1 focus:ring-primary outline-none" 
            placeholder="E.g. Socket Weld Flange"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select 
            name="categoryId" 
            required 
            className="w-full rounded-md border border-input p-2.5 bg-background focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand *</label>
          <select 
            name="brandId" 
            required 
            className="w-full rounded-md border border-input p-2.5 bg-background focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select Brand</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select 
            name="status" 
            className="w-full rounded-md border border-input p-2.5 bg-background focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            rows={4}
            className="w-full rounded-md border border-input p-2.5 bg-background focus:ring-1 focus:ring-primary outline-none" 
            placeholder="Product detailed description..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <CloudinaryUpload
             value={image}
             onChange={(url) => setImage(url)}
             onRemove={() => setImage("")}
          />
        </div>
      </div>
      
      <div className="flex gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
