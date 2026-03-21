import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { HomeProductList } from "@/components/ui/HomeProductList";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";
import { Layers, Sparkles } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } });
  return categories.map((category) => ({
    id: category.slug,
  }));
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: id },
    include: {
      products: {
        where: { status: "PUBLISHED" },
        include: { brand: true, category: true }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <FadeIn duration={1}>
        <PageHeader 
          title={category.name} 
          subtitle={`Browse our extensive catalog of ${category.name} engineered for precision.`}
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-16 max-w-7xl mx-auto">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
               <Layers className="h-8 w-8" />
            </div>
            <div>
               <h2 className="text-3xl font-black text-foreground">{category.products.length} Items Available</h2>
               <p className="text-foreground/50 font-medium">Filtered by category: {category.name}</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
           {category.products.length > 0 ? (
             <FadeIn delay={0.2} direction="up" className="col-span-full">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 <HomeProductList products={category.products} />
               </div>
             </FadeIn>
           ) : (
             <FadeIn direction="up" className="col-span-full">
               <div className="flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-primary/20 rounded-[3rem] bg-card/50 backdrop-blur-md shadow-xl">
                 <Breathing>
                   <Sparkles className="h-20 w-20 mb-6 opacity-30 text-primary" />
                 </Breathing>
                 <p className="text-3xl font-black text-primary">Inventory Check</p>
                 <p className="text-lg font-medium text-foreground/50 mt-4 max-w-md text-center">We are currently updating our database for {category.name}. Check back soon!</p>
               </div>
             </FadeIn>
           )}
        </div>
      </div>
    </div>
  );
}
