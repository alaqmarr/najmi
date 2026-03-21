"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { EnquiryDialog } from "./EnquiryDialog";

export const HomeProductList = ({ products }: { products: any[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (!products || products.length === 0) return null;

  return (
    <>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEnquire={(p) => setSelectedProduct(p)} 
        />
      ))}
      <EnquiryDialog 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
};
