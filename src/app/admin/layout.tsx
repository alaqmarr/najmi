"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tags, Boxes, FolderOpen, LogOut, Hexagon, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useState, useEffect } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Brands", href: "/admin/brands", icon: Tags },
  { name: "Products", href: "/admin/products", icon: Boxes },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Do not show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-muted/20 font-sans overflow-hidden">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-background border-b border-border/50 p-4 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <Hexagon className="h-4 w-4 text-white" />
          </div>
          <span className="font-black text-lg tracking-tight">Najmi Portal</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 border border-border rounded-md bg-card">
          <Menu className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Mobile Overlay Background */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Premium Dark */}
      <aside className={`fixed md:relative z-50 w-72 h-full bg-[#121417] text-white flex flex-col border-r border-white/5 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <button 
          className="md:hidden absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>

        <div className="p-8 border-b border-white/5 relative z-10 pt-12 md:pt-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Hexagon className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-white">Najmi Portal</span>
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest mt-0.5">Control Center</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-3 relative z-10">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 pl-3">Main Menu</div>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-white/40"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-white/5 relative z-10">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background relative h-[calc(100vh-65px)] md:h-screen w-full overflow-x-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="p-4 md:p-10 max-w-7xl mx-auto relative z-10">
          <FadeIn duration={0.6}>
            {children}
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
