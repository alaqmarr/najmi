"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../actions";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";
import { Repeat, CheckCircle2, Plus } from "lucide-react";

export default function ProductForm({ categories, brands }: { categories: any[], brands: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  
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
        if (bulkMode) {
          // Clear only product-specific fields, retain category/brand/subcategory
          setSavedCount((prev) => prev + 1);
          setImage("");
          if (formRef.current) {
            const nameInput = formRef.current.querySelector<HTMLInputElement>('input[name="name"]');
            const descInput = formRef.current.querySelector<HTMLTextAreaElement>('textarea[name="description"]');
            if (nameInput) { nameInput.value = ""; nameInput.focus(); }
            if (descInput) descInput.value = "";
          }
        } else {
          router.push("/admin/products");
        }
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Bulk Mode Toggle */}
      <div className="flex items-center justify-between bg-muted/50 border border-border rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Repeat className={`h-5 w-5 ${bulkMode ? "text-primary" : "text-foreground/30"}`} />
          <div>
            <span className="font-bold text-sm">Bulk Mode</span>
            <p className="text-[11px] text-foreground/50">After saving, clears name/image but keeps category, brand & subcategory.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setBulkMode(!bulkMode)}
          className={`relative w-12 h-7 rounded-full transition-colors ${bulkMode ? "bg-primary" : "bg-border"}`}
        >
          <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${bulkMode ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </div>

      {/* Saved counter */}
      {bulkMode && savedCount > 0 && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-700 font-bold text-sm">
          <CheckCircle2 className="h-4 w-4" />
          {savedCount} product{savedCount > 1 ? "s" : ""} saved this session. Keep adding!
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 shadow-lg rounded-2xl border border-border">
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
              onChange={(e) => { setSelectedCategoryId(e.target.value); setSelectedSubCategoryId(""); }}
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
                value={selectedSubCategoryId}
                onChange={(e) => setSelectedSubCategoryId(e.target.value)}
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
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
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
              rows={3}
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
          <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isPending ? "Saving..." : bulkMode ? <><Plus className="h-4 w-4" /> Save & Add Next</> : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
