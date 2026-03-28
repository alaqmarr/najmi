"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

// --- Categories ---
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  if (!name) return { error: "Name is required" };
  
  const slug = slugify(name, { lower: true, strict: true });
  
  try {
    await prisma.category.create({
      data: {
        id: slug,
        name,
        slug,
        image: image || null,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateCategory(id: string, data: { name: string; image?: string | null }) {
  try {
    await prisma.category.update({
      where: { id },
      data: { name: data.name, image: data.image || null },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- SubCategories ---
export async function createSubCategories(categoryId: string, names: string[]) {
  if (!categoryId || names.length === 0) return { error: "Category and at least one name required" };

  try {
    const data = names.map((name) => ({
      id: slugify(name, { lower: true, strict: true }) + "-" + Date.now().toString(36).slice(-4),
      slug: slugify(name, { lower: true, strict: true }) + "-" + Date.now().toString(36).slice(-4),
      name: name.trim(),
      categoryId,
    }));

    await prisma.subCategory.createMany({ data });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteSubCategory(id: string) {
  try {
    await prisma.subCategory.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- Brands ---
export async function createBrand(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  
  if (!name) return { error: "Name is required" };
  
  const slug = slugify(name, { lower: true, strict: true });
  
  try {
    await prisma.brand.create({
      data: {
        id: slug,
        name,
        slug,
        image: image || null,
      },
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({ where: { id } });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateBrand(id: string, data: { name: string; image?: string | null }) {
  try {
    await prisma.brand.update({
      where: { id },
      data: { name: data.name, image: data.image || null },
    });
    revalidatePath("/admin/brands");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- Products ---
export async function createProduct(data: any) {
  const { name, description, image, categoryId, brandId, subCategoryId, status } = data;
  
  if (!name || !categoryId || !brandId) return { error: "Missing required fields" };
  
  const slug = slugify(name, { lower: true, strict: true });
  
  try {
    await prisma.product.create({
      data: {
        id: slug,
        name,
        slug,
        description,
        image,
        categoryId,
        brandId,
        subCategoryId: subCategoryId || null,
        status: status || "PUBLISHED"
      },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  const { name, description, image, categoryId, brandId, subCategoryId, status } = data;
  if (!name || !categoryId || !brandId) return { error: "Missing required fields" };

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        image,
        categoryId,
        brandId,
        subCategoryId: subCategoryId || null,
        status: status || "PUBLISHED",
      },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
