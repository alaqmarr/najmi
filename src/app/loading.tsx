import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute h-24 w-24 rounded-full border-t-2 border-primary animate-spin"></div>
        {/* Inner static branding or icon */}
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-widest text-primary animate-pulse uppercase">Najmi</h2>
      <p className="mt-2 text-sm text-foreground/60 tracking-wider">LOADING EXPERIENCE</p>
    </div>
  );
}
