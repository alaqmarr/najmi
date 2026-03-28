import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoryEditForm from "./CategoryEditForm";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-foreground tracking-tight mb-6">Edit Category</h1>
      <CategoryEditForm category={JSON.parse(JSON.stringify(category))} />
    </div>
  );
}
