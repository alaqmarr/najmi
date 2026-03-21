import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Boxes, Pencil, Trash2, Search, CheckCircle2, Factory } from "lucide-react";


export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 p-8 rounded-[2rem] border border-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-green-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Master Inventory</h1>
          <p className="text-foreground/70 font-medium text-lg">Manage full product lifecycle and visibility.</p>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="relative z-10 inline-flex items-center justify-center bg-green-600 text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-green-600/30 hover:scale-105 hover:bg-green-700 transition-all gap-2"
        >
          <Plus className="h-5 w-5" /> Add New Inventory
        </Link>
      </div>

      <div className="bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden relative">
        <div className="p-6 border-b border-border/50 bg-muted/30 flex justify-between items-center">
           <h2 className="text-xl font-bold flex items-center gap-2"><Boxes className="text-green-600"/> Hardware Catalog</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input type="text" placeholder="Search sku, name..." className="pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-green-600 outline-none text-sm font-medium w-64 transition-all" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground/60 text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-5">Product Details</th>
                <th className="px-6 py-5">Classification</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-green-500/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {product.image ? (
                        <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center border border-border p-1 shrink-0">
                          <img src={product.image} alt={product.name} width={50} height={50} className="object-contain" />
                        </div>
                      ) : (
                        <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                           <Factory className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-base text-foreground group-hover:text-green-600 transition-colors leading-tight mb-1">{product.name}</div>
                        <div className="text-xs font-bold text-foreground/40 bg-muted rounded-md px-2 py-0.5 inline-block">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5 items-start">
                      {product.category && (
                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 px-2.5 py-1 rounded-md">{product.category.name}</span>
                      )}
                      {product.brand && (
                        <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-600 px-2.5 py-1 rounded-md">{product.brand.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {product.status === "PUBLISHED" ? (
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 font-bold text-xs gap-1.5 border border-green-500/20">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-bold text-xs gap-1.5 border border-orange-500/20">
                        Drafted
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm">
                         <Pencil className="h-4 w-4" />
                       </button>
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground font-medium text-lg">
                     Master inventory is currently empty.
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
