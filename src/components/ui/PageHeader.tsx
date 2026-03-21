export const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="relative bg-[#090a0b] overflow-hidden py-24 lg:py-32 border-b-4 border-primary">
      {/* Premium Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent z-10"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwdjIwSDIwVjIwem0tMjAgMFYwaDIwdjIwSDB6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] z-0 opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-wide">
            {subtitle}
          </p>
        )}
        <div className="mt-10 h-1.5 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
      </div>
    </div>
  );
};
