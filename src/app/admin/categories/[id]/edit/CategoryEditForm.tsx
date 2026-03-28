"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCategory, createSubCategories, deleteSubCategory } from "../../../actions";
import { CategoryImageUpload } from "@/components/ui/CategoryImageUpload";
import { Trash2, Plus } from "lucide-react";

export default function CategoryEditForm({ category }: { category: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState(category.image || "");
  const [subCategoriesText, setSubCategoriesText] = useState("");
  const [existingSubs, setExistingSubs] = useState<any[]>(category.subCategories || []);
  const [deletingSub, setDeletingSub] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateCategory(category.id, { name, image: image || null });
      if (result.success) {
        // Create any new subcategories
        const newSubs = subCategoriesText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        if (newSubs.length > 0) {
          await createSubCategories(category.id, newSubs);
        }
        router.push("/admin/categories");
      } else {
        alert(result.error);
      }
    });
  };

  const handleDeleteSub = async (subId: string) => {
    if (!confirm("Delete this subcategory?")) return;
    setDeletingSub(subId);
    const result = await deleteSubCategory(subId);
    if (result.success) {
      setExistingSubs((prev) => prev.filter((s: any) => s.id !== subId));
    } else {
      alert(result.error);
    }
    setDeletingSub(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 shadow-lg rounded-2xl border border-border">
      <div>
        <label className="block text-sm font-bold mb-2">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium"
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

      {/* Existing Subcategories */}
      {existingSubs.length > 0 && (
        <div>
          <label className="block text-sm font-bold mb-3">Existing Subcategories</label>
          <div className="space-y-2">
            {existingSubs.map((sub: any) => (
              <div key={sub.id} className="flex items-center justify-between bg-muted/50 border border-border rounded-xl px-4 py-2.5">
                <span className="font-medium text-sm">{sub.name}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteSub(sub.id)}
                  disabled={deletingSub === sub.id}
                  className="p-1.5 rounded-lg text-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add new subcategories */}
      <div>
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary" /> Add Subcategories (one per line)
        </label>
        <textarea
          value={subCategoriesText}
          onChange={(e) => setSubCategoriesText(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-input p-3 bg-background focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
          placeholder={"Socket Weld\nBlind Flange\nSlip-On"}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
