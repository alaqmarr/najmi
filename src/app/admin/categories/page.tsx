import { prisma } from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true, subCategories: true } } },
  });

  return <CategoriesClient categories={JSON.parse(JSON.stringify(categories))} />;
}
