import { prisma } from "@/lib/prisma";
import BrandsClient from "./BrandsClient";

export const revalidate = 0;

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });

  return <BrandsClient brands={JSON.parse(JSON.stringify(brands))} />;
}
