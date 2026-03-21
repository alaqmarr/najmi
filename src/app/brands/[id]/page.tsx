import { PageHeader } from "@/components/ui/PageHeader";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { HomeProductList } from "@/components/ui/HomeProductList";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";
import { Tags, ShieldCheck } from "lucide-react";


export const revalidate = 60;

export async function generateStaticParams() {
  const brands = await prisma.brand.findMany({ select: { slug: true } });
  return brands.map((brand) => ({
    id: brand.slug,
  }));
}

export default async function BrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({
    where: { slug: id },
    include: {
      products: {
        where: { status: "PUBLISHED" },
        include: { brand: true, category: true }
      }
    }
  });

  if (!brand) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <FadeIn duration={1}>
        <PageHeader 
          title={`OEM: ${brand.name}`} 
          subtitle={`Discover premium high-quality products officially distributed from ${brand.name}.`}
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <FadeIn direction="up">
          <div className="flex items-center justify-between gap-4 mb-16 max-w-7xl mx-auto bg-card p-8 rounded-[2rem] border border-border shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
             
             <div className="flex items-center gap-6 relative z-10">
               {brand.image ? (
                 <div className="h-24 w-32 rounded-2xl bg-white border border-border flex items-center justify-center p-4 shadow-sm">
                   <img src={brand.image} alt={brand.name} width={100} height={60} className="object-contain" />
                 </div>
               ) : (
                 <div className="h-24 w-24 rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                    <Tags className="h-10 w-10" />
                 </div>
               )}
               <div>
                  <h2 className="text-3xl font-black text-foreground">{brand.name} Inventory</h2>
                  <p className="text-foreground/60 font-medium text-lg flex items-center gap-2 mt-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" /> Authorized Supplier
                  </p>
               </div>
             </div>
             
             <div className="hidden md:flex flex-col items-end relative z-10">
                <div className="text-5xl font-black text-indigo-500">{brand.products.length}</div>
                <div className="text-foreground/50 tracking-widest font-bold uppercase text-xs mt-1">Available SKUs</div>
             </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
           {brand.products.length > 0 ? (
             <FadeIn delay={0.2} direction="up" className="col-span-full">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 <HomeProductList products={brand.products} />
               </div>
             </FadeIn>
           ) : (
             <FadeIn direction="up" className="col-span-full">
               <div className="flex flex-col items-center justify-center py-32 text-muted-foreground border-4 border-dashed border-indigo-500/20 rounded-[3rem] bg-card/50 backdrop-blur-md shadow-xl flex-1">
                 <Breathing>
                   <Tags className="h-20 w-20 mb-6 opacity-30 text-indigo-500" />
                 </Breathing>
                 <p className="text-3xl font-black text-indigo-500 text-center">Awaiting Catalog Integration</p>
                 <p className="text-lg font-medium text-foreground/50 mt-4 max-w-md text-center">OEM products from {brand.name} are currently being processed into our database.</p>
               </div>
             </FadeIn>
           )}
        </div>
      </div>
    </div>
  );
}
