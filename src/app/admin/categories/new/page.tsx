"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "../../actions";

export default function NewCategoryPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    startTransition(async () => {
      const result = await createCategory(formData);
      if (result.success) {
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
