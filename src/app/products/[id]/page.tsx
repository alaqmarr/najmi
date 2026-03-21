import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { ProductDetailClient } from "./ProductDetailClient";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";
import { ChevronRight, ShieldCheck, Factory, Zap } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ id: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.id },
    include: { category: true, brand: true },
  });

  if (!product) return notFound();

  return (
    <div className="bg-background min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumbs */}
        <FadeIn direction="down" duration={0.6}>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 mb-12">
            <Link href="/products" className="hover:text-primary transition-colors">Catalog</Link>
            <ChevronRight className="h-4 w-4" />
            {product.category && (
              <>
                <Link href={`/categories/${product.category.slug}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-primary truncate max-w-[200px]">{product.name}</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Showcase (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 relative">
            <FadeIn direction="up" duration={1}>
              <div className="aspect-square relative group">
                {/* Subtle soft highlight behind the image to elevate it off the page */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white rounded-full blur-[100px] z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-primary/20">
                      <Zap className="h-32 w-32 mb-6 opacity-30" />
                      <span className="text-2xl font-black tracking-widest uppercase">Industrial Standard</span>
                    </div>
                  )}
                </div>

                {/* Badges floating gracefully */}
                <div className="absolute lg:-left-8 top-0 z-20 flex flex-col gap-3">
                   {product.brand && (
                     <div className="bg-white text-foreground text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg border border-border/50">
                       OEM: {product.brand.name}
                     </div>
                   )}
                   <Breathing>
                     <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 w-max">
                       <ShieldCheck className="h-4 w-4" /> Quality Assured
                     </div>
                   </Breathing>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Details & Action Area */}
          <div className="flex flex-col">
            <FadeIn direction="up" delay={0.2} duration={0.8}>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-6 drop-shadow-sm">
                {product.name}
              </h1>
              
              <div className="text-xl lg:text-2xl text-foreground/60 font-medium leading-relaxed mb-12">
                {product.description || "Premium industrial grade hardware engineered for maximum durability and precision under extreme structural stress."}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} duration={0.8}>
              <div className="mb-12">
                 <ProductDetailClient product={product} />
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.5} duration={0.8}>
              <div className="mt-16 bg-gradient-to-br from-muted to-background border border-border p-8 rounded-[2rem] shadow-inner">
                <h4 className="font-black text-lg mb-3">The Najmi Promise</h4>
                <p className="text-foreground/70 font-medium leading-relaxed">
                  All components listed in the Master Catalog undergo rigorous metallurgical and structural compliance testing before dispatch. We guarantee origin authenticity and strict adherence to global engineering standard tolerances.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
