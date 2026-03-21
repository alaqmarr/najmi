import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } }
    }
  });

  return (
    <div className="min-h-screen">
      <FadeIn duration={1}>
        <PageHeader 
          title="Product Categories" 
          subtitle="A vibrant catalog of our precision engineered structural groups."
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {categories.map((category, idx) => (
            <FadeIn key={category.id} delay={idx * 0.1} direction="up" className="h-full">
              <Link 
                href={`/categories/${category.slug}`}
                className="group flex flex-col justify-center p-6 rounded-[2rem] relative overflow-hidden h-40 shadow-md hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Colorful Vibrant Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-500 to-green-400 opacity-90 group-hover:opacity-100 transition-opacity z-0"></div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl z-0 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex items-center justify-between text-white flex-1">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <Layers className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black leading-tight drop-shadow-sm">{category.name}</h3>
                      <p className="text-white/80 font-bold text-xs tracking-widest uppercase mt-1">{category._count.products} SKUs Available</p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex h-10 w-10 bg-white/10 rounded-full border border-white/20 items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
          
          {categories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-primary/20 rounded-[3rem] bg-card/50 backdrop-blur-md">
              <Layers className="h-16 w-16 mb-6 opacity-40 text-primary" />
              <p className="text-3xl font-black text-primary">No categories defined yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
