"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory, createSubCategories } from "../../actions";
import { CategoryImageUpload } from "@/components/ui/CategoryImageUpload";

export default function NewCategoryPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [subCategoriesText, setSubCategoriesText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("image", image);

    startTransition(async () => {
      const result = await createCategory(formData);
      if (result.success) {
        // If we have subcategories, create them with the slug-based id
        const subNames = subCategoriesText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        if (subNames.length > 0) {
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          await createSubCategories(slug, subNames);
        }
        router.push("/admin/categories");
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-foreground tracking-tight mb-6">New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 shadow-lg rounded-2xl border border-border">
        <div>
          <label className="block text-sm font-bold mb-2">Category Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
            placeholder="e.g. Flanges"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Category Thumbnail (16:9)</label>
          <CategoryImageUpload
            value={image}
            onChange={(url) => setImage(url)}
            onRemove={() => setImage("")}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Subcategories (bulk — one per line)</label>
          <textarea
            value={subCategoriesText}
            onChange={(e) => setSubCategoriesText(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
            placeholder={"Socket Weld\nBlind Flange\nSlip-On Flange\nLap Joint"}
          />
          <p className="text-xs text-muted-foreground mt-1">Enter each subcategory name on a new line. They will all be created at once.</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50">
            {isPending ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
