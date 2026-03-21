

export const InfiniteBrandScroller = ({ brands }: { brands: any[] }) => {
  // Ensure enough for infinite scroll
  const displayBrands = [...brands, ...brands, ...brands, ...brands]; 

  return (
    <div className="w-full relative overflow-hidden py-16 bg-card">
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground">Partnering with Industry Leaders</h3>
        <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative flex max-w-full overflow-hidden shrink-0 group">
        {/* Transparent fading edges for the scroller */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center py-4">
          {displayBrands.map((brand, idx) => (
            <div 
              key={`${brand.id}-${idx}`} 
              className="flex-shrink-0 w-48 h-24 relative flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-8"
            >
              {brand.image ? (
                <img 
                  src={brand.image} 
                  alt={brand.name} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-2xl font-black tracking-widest text-[#064e3b]/30">{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
