"use client";

import { useState } from "react";
import { EnquiryDialog } from "@/components/ui/EnquiryDialog";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, ArrowRight } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const ProductDetailClient = ({ product }: { product: any }) => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const defaultMessage = `Hello Najmi Industrial Corporation, I am enquiring about the product: ${product.name} (ID: ${product.id}).`;
  const whatsappLink = generateWhatsAppLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918000000000",
    defaultMessage
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={() => setIsEnquiryOpen(true)}
          className="flex-1 bg-foreground text-background hover:bg-primary font-black tracking-widest uppercase text-sm py-6 px-8 rounded-3xl transition-all duration-300 shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-3 group"
        >
          <Mail className="h-5 w-5 opacity-70 group-hover:opacity-100" />
          Request Quotation
          <ArrowRight className="h-5 w-5 transform opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        </button>
        
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gradient-to-r from-[#25D366] to-[#1ebd5a] text-white hover:opacity-90 font-black tracking-widest uppercase text-sm py-6 px-8 rounded-3xl transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:-translate-y-1 flex items-center justify-center gap-3 group"
        >
          <FaWhatsapp className="h-6 w-6 group-hover:scale-110 transition-transform" />
          Instant Chat
        </a>
      </div>

      <EnquiryDialog
        product={product}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};
