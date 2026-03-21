import Link from "next/link";
import { ArrowRight, ShieldCheck, Factory, Settings } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
      <div className="absolute -left-40 top-40 h-96 w-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary mb-8 text-xs font-bold tracking-widest uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Heritage of Excellence Since 1990
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-foreground leading-[1.1]">
              Absolute Precision <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-green-400">Hardware & Fittings</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed font-medium max-w-2xl">
              Setting the industry benchmark for over 30 years. We engineer and supply uncompromising quality in Fasteners, Flanges, Pipe Fittings, and General Hardware for global industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/products" className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary p-4 px-8 font-bold text-white shadow-xl transition duration-300 ease-out hover:scale-105 hover:shadow-primary/30">
                <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20"></div>
                </span>
                <span className="flex items-center gap-2">Explore Catalog <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
              <Link href="/contact" className="group inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-border bg-transparent p-4 px-8 font-bold text-foreground shadow-sm transition duration-300 ease-out hover:border-primary hover:bg-primary/5">
                Request a Quote
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative h-full hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] transform rotate-3 scale-105 blur-2xl -z-10"></div>
            <div className="grid grid-cols-2 gap-6 h-full p-4">
              
              <div className="space-y-6 pt-12">
                <div className="glass p-8 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center aspect-square transition-transform duration-500 hover:-translate-y-2 group">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="font-extrabold text-xl mb-2 text-foreground">ISO Certified</h3>
                  <p className="text-sm text-foreground/60 font-medium">Unmatched quality</p>
                </div>
                <div className="bg-foreground text-background p-8 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center aspect-square transition-transform duration-500 hover:-translate-y-2">
                  <h3 className="font-black text-6xl mb-2 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">30+</h3>
                  <p className="font-bold tracking-widest uppercase text-xs text-primary">Years Legacy</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary text-primary-foreground p-8 rounded-[2rem] shadow-2xl shadow-primary/20 flex flex-col justify-end aspect-[4/5] relative overflow-hidden group transition-transform duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-overlay"></div>
                  <div className="relative z-20">
                    <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-black text-2xl mb-2 text-white">Modern Infra</h3>
                    <p className="text-sm text-white/80 font-medium">State of the art manufacturing</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
