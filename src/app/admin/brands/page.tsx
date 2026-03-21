import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Tags, Pencil, Trash2, Search, Star } from "lucide-react";


export const revalidate = 0;

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-[2rem] border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Partner Brands</h1>
          <p className="text-foreground/70 font-medium text-lg">Manage brand partnerships and OEM logos.</p>
        </div>
        
        <Link 
          href="/admin/brands/new" 
          className="relative z-10 inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-105 hover:bg-indigo-700 transition-all gap-2"
        >
          <Plus className="h-5 w-5" /> Add Brand Partner
        </Link>
      </div>

      <div className="bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden relative">
        <div className="p-6 border-b border-border/50 bg-muted/30 flex justify-between items-center">
           <h2 className="text-xl font-bold flex items-center gap-2"><Tags className="text-indigo-500"/> Associated OEMs</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input type="text" placeholder="Search brands..." className="pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium w-64 transition-all" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground/60 text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-5">Brand Name & Logo</th>
                <th className="px-6 py-5">System ID (Slug)</th>
                <th className="px-6 py-5">Products Supplied</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {brand.image ? (
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center border border-border p-1">
                          <img src={brand.image} alt={brand.name} width={40} height={40} className="object-contain" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                           <Tags className="h-6 w-6" />
                        </div>
                      )}
                      <span className="font-bold text-base text-foreground group-hover:text-indigo-600 transition-colors">{brand.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-bold text-foreground/50 bg-muted/50 rounded-lg px-3 py-1 border border-border/50">{brand.slug}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 font-bold text-sm gap-1">
                      <Star className="h-3 w-3" /> {brand._count.products} Assigned
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                         <Pencil className="h-4 w-4" />
                       </button>
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground font-medium text-lg">
                     No brand partners registered. Ensure OEMs are added correctly.
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
