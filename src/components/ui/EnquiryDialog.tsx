"use client";

import { useState } from "react";
import { Button } from "./button";
import { X, CheckCircle2, Factory } from "lucide-react";

interface EnquiryDialogProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryDialog = ({ product, isOpen, onClose }: EnquiryDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      productId: product.id,
      productName: product.name,
    };

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send enquiry.");
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 sm:p-6 opacity-100 transition-opacity">
      <div className="bg-card w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden relative border border-border/50 transform scale-100 transition-transform">
        
        {/* Premium Decorative Header Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-green-400 to-primary"></div>
        
        <div className="px-8 py-6 flex items-center justify-between border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Factory className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight leading-none text-foreground">Request Quote</h3>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Enquiry Portal</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-background hover:bg-muted border border-border rounded-full transition-all text-foreground/70 hover:text-foreground shadow-sm hover:shadow-md hover:-rotate-90">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8 bg-background border border-border/50 shadow-sm p-4 rounded-2xl flex gap-5 items-center">
            {product.image ? (
              <div className="h-20 w-20 relative rounded-xl overflow-hidden bg-white shrink-0 p-2 border border-border">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
              </div>
            ) : (
              <div className="h-20 w-20 relative rounded-xl bg-muted shrink-0 flex items-center justify-center border border-border">
                <Factory className="h-6 w-6 text-muted-foreground/50" />
              </div>
            )}
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-sm">{product.category?.name || "Product"}</span>
              <h4 className="font-bold text-lg leading-tight mt-1 mb-1">{product.name}</h4>
              <p className="text-xs font-medium text-foreground/50">Ref ID: {product.id}</p>
            </div>
          </div>

          {success ? (
            <div className="py-12 text-center space-y-5 flex flex-col items-center">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner relative">
                <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20"></div>
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-foreground">Enquiry Dispatched!</h4>
                <p className="text-foreground/70 font-medium max-w-sm mx-auto mt-2">Your request has been prioritized in our system. An industrial specialist will contact you shortly.</p>
              </div>
              <Button onClick={onClose} size="lg" className="mt-4 w-full sm:w-auto px-12 rounded-xl text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform">Done</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-800/50 flex items-center gap-2"><X className="h-4 w-4" /> {error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2">Company / Your Name <span className="text-red-500">*</span></label>
                  <input required name="name" type="text" className="w-full border border-input rounded-xl p-3.5 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm" placeholder="e.g. Acme Corp / John Doe" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required name="email" type="email" className="w-full border border-input rounded-xl p-3.5 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm" placeholder="john@acme.com" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2">Phone Number</label>
                  <input name="phone" type="tel" className="w-full border border-input rounded-xl p-3.5 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all font-medium text-sm" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12 font-bold text-foreground/70 hover:text-foreground">Cancel</Button>
                <Button type="submit" disabled={loading} className="flex-[2] rounded-xl h-12 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  {loading ? "Transmitting..." : "Submit Official Enquiry"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
