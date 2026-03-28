import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BrandEditForm from "./BrandEditForm";

export const dynamic = "force-dynamic";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-foreground tracking-tight mb-6">Edit Brand</h1>
      <BrandEditForm brand={JSON.parse(JSON.stringify(brand))} />
    </div>
  );
}
