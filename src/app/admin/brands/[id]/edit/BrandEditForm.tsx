"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBrand } from "../../../actions";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";

export default function BrandEditForm({ brand }: { brand: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(brand.name);
  const [image, setImage] = useState(brand.image || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateBrand(brand.id, { name, image: image || null });
      if (result.success) {
        router.push("/admin/brands");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 shadow-lg rounded-2xl border border-border">
      <div>
        <label className="block text-sm font-bold mb-2">Brand Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Brand Logo</label>
        <CloudinaryUpload
          value={image}
          onChange={(url) => setImage(url)}
          onRemove={() => setImage("")}
        />
      </div>
      <div className="flex gap-3 pt-4 border-t border-border">
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
