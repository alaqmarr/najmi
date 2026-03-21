import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeProductList } from "@/components/ui/HomeProductList";
import { Boxes } from "lucide-react";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true },
  });

  return (
    <div className="bg-background min-h-screen">
      <FadeIn duration={1}>
        <PageHeader 
          title="Master Catalog" 
          subtitle="Explore our entire inventory of absolute precision hardware, engineered for endurance."
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24">
        {products.length > 0 ? (
          <FadeIn delay={0.1} direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <HomeProductList products={products} />
            </div>
          </FadeIn>
        ) : (
          <FadeIn direction="up">
            <div className="flex flex-col items-center justify-center py-32 text-muted-foreground border-2 border-dashed border-border rounded-3xl">
               <Boxes className="h-16 w-16 mb-6 opacity-20" />
               <p className="text-2xl font-bold text-foreground/50">Master catalog is currently being updated.</p>
               <p className="text-lg font-medium text-foreground/40 mt-2">Please check back shortly.</p>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
