import { prisma } from "@/lib/prisma";
import ProductForm from "./ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" }, include: { subCategories: { orderBy: { name: "asc" } } } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-black text-foreground tracking-tight mb-6">Add New Product</h1>
      <ProductForm categories={JSON.parse(JSON.stringify(categories))} brands={JSON.parse(JSON.stringify(brands))} />
    </div>
  );
}
