import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true },
  });

  return <ProductsClient products={JSON.parse(JSON.stringify(products))} />;
}
