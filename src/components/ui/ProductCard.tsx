"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowRight, Info, Zap } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: any;
  onEnquire: (product: any) => void;
}

export const ProductCard = ({ product, onEnquire }: ProductCardProps) => {
  const defaultMessage = `Hello Najmi Industrial Corporation, I am enquiring about the product: ${product.name} (ID: ${product.id}).`;
  const whatsappLink = generateWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918000000000",
    defaultMessage
  );

  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-[2rem] border border-primary/10 shadow-lg overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
      {/* Decorative colored glow behind image */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/10 via-emerald-400/5 to-transparent z-0 pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity"></div>
      
      <Link href={`/products/${product.slug}`} className="block relative h-64 overflow-hidden flex items-center justify-center bg-white z-10 border-b border-border/50">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground font-medium bg-muted/30">
             <Zap className="h-12 w-12 mb-3 opacity-30" />
             <span>Industrial Grade</span>
          </div>
        )}
        
        {/* Premium Action Overlay */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex justify-center">
          <div className="bg-foreground/90 backdrop-blur-md text-background text-xs font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2">
            Detailed Specs <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
      
      <div className="p-7 flex flex-col flex-1 relative z-10 bg-card">
         <div className="flex items-center justify-between mb-4">
           {product.category && (
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10 px-3 py-1 rounded-full shadow-inner">
               {product.category.name}
             </span>
           )}
           {product.status === "PUBLISHED" && (
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
           )}
         </div>
         
         <Link href={`/products/${product.slug}`} className="block mb-2">
           <h3 className="text-xl font-black line-clamp-2 text-foreground group-hover:text-primary transition-colors leading-tight drop-shadow-sm">{product.name}</h3>
         </Link>
         
         {product.brand && (
           <p className="text-sm font-bold text-foreground/40 mb-6 flex-1 tracking-wide">
             Mfg. by <span className="text-foreground/70">{product.brand.name}</span>
           </p>
         )}
         
         <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-border/50">
           <button 
             onClick={() => onEnquire(product)} 
             className="w-full bg-muted text-foreground hover:bg-foreground hover:text-background font-black tracking-wide py-3.5 rounded-2xl transition-all shadow-sm text-sm flex items-center justify-center gap-2 group/btn"
           >
             <Info className="h-4 w-4 text-primary group-hover/btn:text-background transition-colors" /> Enquire
           </button>
           <a 
             href={whatsappLink} 
             target="_blank" 
             rel="noopener noreferrer" 
             className="w-full bg-gradient-to-r from-[#25D366] to-[#1ebd5a] text-white hover:opacity-90 font-black tracking-wide py-3.5 rounded-2xl transition-all shadow-lg shadow-[#25D366]/30 text-sm flex items-center justify-center gap-2"
           >
             <FaWhatsapp className="h-5 w-5" /> Chat
           </a>
         </div>
      </div>
    </div>
  );
};
