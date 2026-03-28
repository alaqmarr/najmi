import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true, subCategories: true } },
      subCategories: { orderBy: { name: "asc" }, take: 5, select: { name: true, slug: true } },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {categories.map((category, idx) => (
            <FadeIn key={category.id} delay={idx * 0.08} direction="up" className="h-full">
              <Link 
                href={`/categories/${category.slug}`}
                className="group block rounded-2xl relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image or gradient bg */}
                {category.image ? (
                  <div className="h-44 w-full overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-primary via-emerald-500 to-green-400 relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="h-16 w-16 text-white/30" />
                    </div>
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-black leading-tight drop-shadow-sm mb-1">{category.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-white/80 font-bold text-xs tracking-wide">{category._count.products} products</span>
                    {category._count.subCategories > 0 && (
                      <span className="text-white/60 text-xs font-medium">· {category._count.subCategories} subcategories</span>
                    )}
                  </div>

                  {/* Subcategory preview tags */}
                  {category.subCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {category.subCategories.map((sc) => (
                        <span key={sc.slug} className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/90">
                          {sc.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 h-8 w-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors duration-300 text-white border border-white/20">
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
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
