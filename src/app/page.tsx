import { HeroSection } from "@/components/ui/HeroSection";
import { InfiniteBrandScroller } from "@/components/ui/InfiniteBrandScroller";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeProductList } from "@/components/ui/HomeProductList";

export const revalidate = 60; // ISR revalidation 60s

export default async function Home() {
  const [brands, categories, products] = await Promise.all([
    prisma.brand.findMany({ take: 10, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ take: 4, orderBy: { createdAt: "desc" }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ 
      where: { status: "PUBLISHED" },
      take: 4, 
      orderBy: { createdAt: "desc" },
      include: { category: true, brand: true }
    }),
  ]);

  return (
    <div>
      <FadeIn duration={1.2}>
        <HeroSection />
      </FadeIn>
      
      {brands.length > 0 && (
        <FadeIn delay={0.2} direction="up">
          <InfiniteBrandScroller brands={brands} />
        </FadeIn>
      )}

      {/* Categories Showcase */}
      {categories.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Subtle Decorative Circle */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <FadeIn direction="up">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
                <div className="max-w-3xl">
                  <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">Our Categories</h2>
                  <p className="text-foreground/70 text-lg md:text-xl font-medium">Explore our wide range of industrial products classified for your convenience.</p>
                </div>
                <Link href="/categories" className="hidden md:inline-flex items-center text-primary font-bold tracking-wide uppercase text-sm hover:underline group">
                  View All Categories <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, idx) => (
                <FadeIn key={category.id} delay={0.1 * idx} direction="up">
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="group block rounded-2xl relative overflow-hidden h-40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Background Image or Fallback */}
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-500 to-green-400"></div>
                    )}
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Text content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white relative z-10">
                      <h3 className="text-lg font-black leading-tight drop-shadow-md truncate">{category.name}</h3>
                      <p className="text-white/80 font-bold text-xs mt-0.5">{category._count.products} Products</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
            
            <Link href="/categories" className="mt-10 inline-flex md:hidden items-center justify-center text-primary font-bold w-full uppercase text-sm hover:bg-primary hover:text-white transition-colors py-4 border border-primary/20 rounded-xl">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Featured Products Showcase */}
      {products.length > 0 && (
        <section className="py-24 bg-card relative">
          <div className="absolute left-0 bottom-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <FadeIn direction="up">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
                <div className="max-w-3xl">
                  <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">Featured Products</h2>
                  <p className="text-foreground/70 text-lg md:text-xl font-medium">Discover some of our highest quality products ready for dispatch.</p>
                </div>
                <Link href="/products" className="hidden md:inline-flex items-center text-primary font-bold tracking-wide uppercase text-sm hover:underline group">
                  View Full Catalog <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 <HomeProductList products={products} />
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  );
}
