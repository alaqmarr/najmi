"use client";

import { useTransition } from "react";
import { createBrand, deleteBrand } from "../actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";
import { useState } from "react";


export default function BrandsClient({ brands }: { brands: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState("");

  const handleCreate = async (formData: FormData) => {
    formData.append("image", image);
    startTransition(async () => {
      await createBrand(formData);
      setImage("");
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Manage Brands</h1>
      
      <div className="bg-card shadow rounded-lg p-6 mb-8 border border-border">
        <h2 className="text-xl font-semibold mb-4">Add New Brand</h2>
        <form action={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground/80">Brand Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full rounded-md border border-input p-2 bg-background focus:ring-1 focus:ring-primary outline-none" 
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Brand Logo</label>
            <CloudinaryUpload
               value={image}
               onChange={(url) => setImage(url)}
               onRemove={() => setImage("")}
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Brand"}
          </Button>
        </form>
      </div>

      <div className="bg-card shadow rounded-lg border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {brand.image ? (
                    <div className="relative h-10 w-20 bg-white rounded flex items-center justify-center overflow-hidden border">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-contain p-1" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">No image</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{brand.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <form action={async () => {
                    await deleteBrand(brand.id);
                  }}>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-muted-foreground">No brands found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
