"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Boxes, Plus, CheckCircle2, Factory } from "lucide-react";
import { useState } from "react";

export default function ProductsClient({ products }: { products: any[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 p-6 sm:p-8 rounded-2xl border border-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-1">Master Inventory</h1>
          <p className="text-foreground/60 font-medium text-sm">Manage full product lifecycle and visibility.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="relative z-10 inline-flex items-center justify-center bg-green-600 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-green-600/20 hover:scale-105 hover:bg-green-700 transition-all gap-2 text-sm"
        >
          <Plus className="h-4 w-4" /> New Product
        </Link>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-muted/50 text-foreground/60 text-xs uppercase tracking-widest font-bold">
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Classification</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-green-500/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <div className="h-11 w-11 rounded-lg bg-white flex items-center justify-center border border-border p-0.5 shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="h-11 w-11 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border">
                           <Factory className="h-5 w-5 text-muted-foreground/50" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm text-foreground group-hover:text-green-600 transition-colors leading-tight">{product.name}</div>
                        <div className="text-[10px] font-medium text-foreground/40 mt-0.5">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      {product.category && (
                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-md">{product.category.name}</span>
                      )}
                      {product.brand && (
                        <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-md">{product.brand.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {product.status === "PUBLISHED" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-bold text-xs border border-green-500/20">
                        <CheckCircle2 className="h-3 w-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-bold text-xs border border-orange-500/20">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/admin/products/${product.id}/edit`} className="h-9 w-9 rounded-lg bg-muted text-foreground/70 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all" title="Edit">
                         <Pencil className="h-4 w-4" />
                       </Link>
                       <button 
                         onClick={() => handleDelete(product.id, product.name)}
                         disabled={deleting === product.id}
                         className="h-9 w-9 rounded-lg bg-muted text-foreground/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                         title="Delete"
                       >
                         <Trash2 className={`h-4 w-4 ${deleting === product.id ? "animate-spin" : ""}`} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-muted-foreground font-medium">
                     Inventory is empty. Add your first product.
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
