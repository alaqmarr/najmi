import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Activity, Boxes, FolderOpen, Tags } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; 
  }

  const [productsCount, categoriesCount, brandsCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.brand.count(),
  ]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">Platform Overview</h1>
        <p className="text-foreground/60 text-lg font-medium">Welcome back, <span className="text-primary">{session.user?.name || 'Administrator'}</span>. Here's your current catalog status.</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-32 w-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Boxes className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground/80">Total Catalog</h3>
          </div>
          <div className="text-5xl font-black text-foreground mb-2">{productsCount}</div>
          <p className="text-sm font-medium text-primary flex items-center gap-2"><Activity className="h-4 w-4"/> Published & active</p>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-32 w-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <FolderOpen className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground/80">Categories</h3>
          </div>
          <div className="text-5xl font-black text-foreground mb-2">{categoriesCount}</div>
          <p className="text-sm font-medium text-blue-500 flex items-center gap-2"><Activity className="h-4 w-4"/> Structural groups</p>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-32 w-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Tags className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground/80">Partnerships</h3>
          </div>
          <div className="text-5xl font-black text-foreground mb-2">{brandsCount}</div>
          <p className="text-sm font-medium text-purple-500 flex items-center gap-2"><Activity className="h-4 w-4"/> Associated brands</p>
        </div>
      </div>
      
      <div className="p-8 bg-foreground text-background border border-border/10 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-black mb-4">Command Center Instructions</h2>
          <p className="text-background/70 leading-relaxed font-medium text-lg">
            Use the secure navigation menu on the left to modify inventory records, add new partner associations, or adjust category structures. All changes propagate to the Next.js edge-network instantly via Incremental Static Regeneration.
          </p>
        </div>
      </div>
    </div>
  );
}
