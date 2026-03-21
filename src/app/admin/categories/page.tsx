import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, FolderOpen, Pencil, Trash2, Search } from "lucide-react";

export const revalidate = 0; // Ensure admin pages are not cached

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary/10 p-8 rounded-[2rem] border border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Category Management</h1>
          <p className="text-foreground/70 font-medium text-lg">Organize and structure your product inventory.</p>
        </div>
        
        {/* We use a form to add a new category securely here or link to a dedicated page */}
        <Link 
          href="/admin/categories/new" 
          className="relative z-10 inline-flex items-center justify-center bg-primary text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 hover:bg-emerald-600 transition-all gap-2"
        >
          <Plus className="h-5 w-5" /> Create New Lineup
        </Link>
      </div>

      <div className="bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden relative">
        <div className="p-6 border-b border-border/50 bg-muted/30 flex justify-between items-center">
           <h2 className="text-xl font-bold flex items-center gap-2"><FolderOpen className="text-primary"/> Active Categories</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <input type="text" placeholder="Search categories..." className="pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm font-medium w-64 transition-all" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground/60 text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-5">Classification Name</th>
                <th className="px-6 py-5">URL Slug Reference</th>
                <th className="px-6 py-5">Inventory Count</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                         <FolderOpen className="h-5 w-5" />
                      </div>
                      <span className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-foreground/50 bg-muted/20 my-2 rounded-lg inline-block px-3 py-1 mt-4">{cat.slug}</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 font-bold text-sm">
                      {cat._count.products} Items
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                         <Pencil className="h-4 w-4" />
                       </button>
                       <button className="h-10 w-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-muted-foreground font-medium text-lg">
                     No categories found. Create a new lineup to begin.
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
