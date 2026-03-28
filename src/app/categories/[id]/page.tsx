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
      subCategories: {
        orderBy: { name: "asc" },
        include: {
          products: {
            where: { status: "PUBLISHED" },
            include: { brand: true, category: true },
          },
        },
      },
      products: {
        where: { status: "PUBLISHED" },
        include: { brand: true, category: true, subCategory: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const hasSubCategories = category.subCategories.length > 0;
  
  // Products without a subcategory
  const uncategorizedProducts = category.products.filter((p) => !p.subCategoryId);
  
  // Subcategories that have products
  const subsWithProducts = category.subCategories.filter((sc) => sc.products.length > 0);

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
            {category.image ? (
              <div className="h-16 w-24 rounded-2xl overflow-hidden bg-muted border border-border shadow-sm shrink-0">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner shrink-0">
                 <Layers className="h-8 w-8" />
              </div>
            )}
            <div>
               <h2 className="text-3xl font-black text-foreground">{category.products.length} Items Available</h2>
               <p className="text-foreground/50 font-medium">
                 {hasSubCategories 
                   ? `Organized across ${category.subCategories.length} subcategories`
                   : `Filtered by category: ${category.name}`
                 }
               </p>
            </div>
          </div>
        </FadeIn>

        {/* Sectioned by SubCategory */}
        {hasSubCategories ? (
          <div className="max-w-7xl mx-auto space-y-20">
            {subsWithProducts.map((sub, idx) => (
              <FadeIn key={sub.id} delay={idx * 0.1} direction="up">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-1 w-8 bg-primary rounded-full"></div>
                    <h3 className="text-2xl font-black text-foreground">{sub.name}</h3>
                    <span className="text-sm font-bold text-foreground/40 bg-muted px-3 py-1 rounded-full">{sub.products.length}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <HomeProductList products={sub.products} />
                  </div>
                </section>
              </FadeIn>
            ))}

            {/* Uncategorized products */}
            {uncategorizedProducts.length > 0 && (
              <FadeIn delay={0.2} direction="up">
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-1 w-8 bg-foreground/20 rounded-full"></div>
                    <h3 className="text-2xl font-black text-foreground/60">Other</h3>
                    <span className="text-sm font-bold text-foreground/40 bg-muted px-3 py-1 rounded-full">{uncategorizedProducts.length}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <HomeProductList products={uncategorizedProducts} />
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Empty state */}
            {subsWithProducts.length === 0 && uncategorizedProducts.length === 0 && (
              <FadeIn direction="up">
                <div className="flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-primary/20 rounded-[3rem] bg-card/50 backdrop-blur-md shadow-xl">
                  <Breathing><Sparkles className="h-20 w-20 mb-6 opacity-30 text-primary" /></Breathing>
                  <p className="text-3xl font-black text-primary">Inventory Check</p>
                  <p className="text-lg font-medium text-foreground/50 mt-4 max-w-md text-center">We are currently updating our database for {category.name}.</p>
                </div>
              </FadeIn>
            )}
          </div>
        ) : (
          /* Flat list — no subcategories */
          <div className="max-w-7xl mx-auto">
            {category.products.length > 0 ? (
              <FadeIn delay={0.2} direction="up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  <HomeProductList products={category.products} />
                </div>
              </FadeIn>
            ) : (
              <FadeIn direction="up">
                <div className="flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-primary/20 rounded-[3rem] bg-card/50 backdrop-blur-md shadow-xl">
                  <Breathing><Sparkles className="h-20 w-20 mb-6 opacity-30 text-primary" /></Breathing>
                  <p className="text-3xl font-black text-primary">Inventory Check</p>
                  <p className="text-lg font-medium text-foreground/50 mt-4 max-w-md text-center">We are currently updating our database for {category.name}. Check back soon!</p>
                </div>
              </FadeIn>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
