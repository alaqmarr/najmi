"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Tags, Plus, Star } from "lucide-react";
import { useState } from "react";

export default function BrandsClient({ brands }: { brands: any[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete brand");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 sm:p-8 rounded-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">Partner Brands</h1>
          <p className="text-foreground/60 font-medium text-sm">Manage brand partnerships and OEM logos.</p>
        </div>
        <Link 
          href="/admin/brands/new" 
          className="relative z-10 inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 hover:scale-105 hover:bg-indigo-700 transition-all gap-2 text-sm"
        >
          <Plus className="h-4 w-4" /> Add Brand
        </Link>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-muted/50 text-foreground/60 text-xs uppercase tracking-widest font-bold">
                <th className="px-5 py-4">Brand</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Products</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {brand.image ? (
                        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center border border-border p-1 shrink-0">
                          <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                           <Tags className="h-5 w-5" />
                        </div>
                      )}
                      <span className="font-bold text-sm text-foreground group-hover:text-indigo-600 transition-colors">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-foreground/50 bg-muted/50 rounded-md px-2 py-0.5">{brand.slug}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 font-bold text-xs">
                      <Star className="h-3 w-3" /> {brand._count.products}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/admin/brands/${brand.id}/edit`} className="h-9 w-9 rounded-lg bg-muted text-foreground/70 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all" title="Edit">
                         <Pencil className="h-4 w-4" />
                       </Link>
                       <button 
                         onClick={() => handleDelete(brand.id, brand.name)}
                         disabled={deleting === brand.id}
                         className="h-9 w-9 rounded-lg bg-muted text-foreground/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                         title="Delete"
                       >
                         <Trash2 className={`h-4 w-4 ${deleting === brand.id ? "animate-spin" : ""}`} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-muted-foreground font-medium">
                     No brands registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
