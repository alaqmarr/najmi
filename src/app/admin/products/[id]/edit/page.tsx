import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-black text-foreground tracking-tight mb-6">Edit Product</h1>
      <ProductEditForm
        product={JSON.parse(JSON.stringify(product))}
        categories={JSON.parse(JSON.stringify(categories))}
        brands={JSON.parse(JSON.stringify(brands))}
      />
    </div>
  );
}
