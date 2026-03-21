import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import { ArrowRight, Tags, ArrowUpRight } from "lucide-react";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";

export const revalidate = 60;

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } }
    }
  });

  return (
    <div className="min-h-screen">
      <FadeIn duration={1}>
        <PageHeader 
          title="Our OEM Partners" 
          subtitle="Discover the world-class global manufacturers we proudly represent."
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {brands.map((brand, idx) => (
            <FadeIn key={brand.id} delay={idx * 0.1} direction="up" className="h-full">
              <Link 
                href={`/brands/${brand.slug}`}
                className="group flex flex-col rounded-[2.5rem] relative overflow-hidden h-full shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-3 transition-all duration-500 bg-card border border-border"
              >
                {/* Brand specific subtle glowing aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl z-0 group-hover:scale-[3] group-hover:bg-indigo-500/10 transition-all duration-700 pointer-events-none"></div>
                
                {/* Edge-to-edge Image Container */}
                <div className="w-full h-56 bg-white flex items-center justify-center overflow-hidden relative border-b border-border/50 z-10 transition-colors duration-500">
                  {brand.image ? (
                    <img 
                      src={brand.image} 
                      alt={brand.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500 mix-blend-multiply"
                    />
                  ) : (
                    <Tags className="h-16 w-16 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors duration-500" />
                  )}
                </div>
                
                {/* Text Content */}
                <div className="relative z-10 flex flex-col flex-1 text-foreground p-8">
                  <h3 className="text-2xl font-black mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{brand.name}</h3>
                  <p className="text-foreground/50 font-bold mb-8 text-sm uppercase tracking-widest">{brand._count.products} Registered Components</p>
                  
                  <div className="flex justify-between items-center text-indigo-600 font-bold text-sm mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>View Inventory</span>
                    <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
          
          {brands.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-indigo-500/10 rounded-[3rem] bg-card/50 backdrop-blur-md">
              <Tags className="h-16 w-16 mb-6 opacity-30 text-indigo-500" />
              <p className="text-2xl font-black text-indigo-500">No brand partners defined yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
