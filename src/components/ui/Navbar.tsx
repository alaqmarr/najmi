"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Hexagon, ArrowRight, ChevronDown, ChevronRight, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface SubCat {
  id: string;
  slug: string;
  name: string;
}

interface NavCategory {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  subCategories: SubCat[];
}

const staticLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
];

const afterCategoryLinks = [
  { name: "Brands", href: "/brands" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch categories for mega menu
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  const allLinks = [...staticLinks, { name: "Categories", href: "/categories" }, ...afterCategoryLinks];

  const renderNavLink = (link: { name: string; href: string }) => {
    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    
    if (link.name === "Categories") {
      return (
        <div
          key={link.href}
          className="relative"
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        >
          <Link
            href={link.href}
            className={`text-sm font-bold tracking-widest uppercase transition-all relative py-2 flex items-center gap-1 ${
              isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {link.name}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
            {isActive && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
              />
            )}
          </Link>

          {/* Mega Menu */}
          <AnimatePresence>
            {megaOpen && categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden z-50"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <div className="p-5 grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                  {categories.map((cat) => (
                    <div key={cat.id} className="group">
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors"
                      >
                        {cat.image ? (
                          <div className="h-10 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Layers className="h-5 w-5 text-primary" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors block truncate">{cat.name}</span>
                          {cat.subCategories.length > 0 && (
                            <span className="text-[10px] text-foreground/40">{cat.subCategories.length} subcategories</span>
                          )}
                        </div>
                      </Link>
                      {cat.subCategories.length > 0 && (
                        <div className="ml-12 pl-3 border-l border-border/50 space-y-0.5 mb-2">
                          {cat.subCategories.slice(0, 4).map((sc) => (
                            <Link
                              key={sc.id}
                              href={`/categories/${cat.slug}?sub=${sc.slug}`}
                              className="block text-xs font-medium text-foreground/50 hover:text-primary transition-colors py-0.5 truncate"
                            >
                              {sc.name}
                            </Link>
                          ))}
                          {cat.subCategories.length > 4 && (
                            <Link href={`/categories/${cat.slug}`} className="text-[10px] font-bold text-primary">
                              +{cat.subCategories.length - 4} more
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 p-3 bg-muted/30">
                  <Link href="/categories" className="flex items-center justify-center gap-2 text-sm font-bold text-primary hover:underline">
                    View All Categories <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`text-sm font-bold tracking-widest uppercase transition-all relative py-2 ${
          isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
        }`}
      >
        {link.name}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-[#064e3b] text-emerald-50 text-xs font-semibold tracking-widest relative z-[60]">
        <div className="container mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-8 opacity-90">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary"/> 4-4-120, Mahakali Street, Hyderabad</span>
            <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Mail className="h-3.5 w-3.5 text-primary"/> contact@najmionline.com</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary"/> +91 93981 90254</span>
            <a href="https://wa.me/919398190254" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-emerald-500/20 px-4 py-1 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
              <FaWhatsapp className="h-4 w-4"/> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 py-3 bg-white/95 backdrop-blur-2xl shadow-[0_4px_30px_rgb(0,0,0,0.04)]"
            : "top-0 lg:top-10 py-4 lg:py-0 bg-background lg:bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "" : "lg:bg-white/90 lg:backdrop-blur-xl lg:px-6 lg:rounded-3xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"}`}>

            <Link href="/" className={`flex items-center space-x-3 group ${scrolled ? "" : "lg:py-3"}`}>
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Hexagon className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-foreground leading-none">Najmi Industrial</span>
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest mt-0.5">Corporation</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {[...staticLinks, { name: "Categories", href: "/categories" }, ...afterCategoryLinks].map(renderNavLink)}
              <Link href="/contact" className="ml-4 bg-foreground text-background px-6 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary transition-colors hover:shadow-lg hover:shadow-primary/30">
                Get Quote
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative z-[60] p-2 -mr-2 text-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-3xl flex flex-col pt-28 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mb-auto">
              {allLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                const hasSubs = link.name === "Categories" && categories.length > 0;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    key={link.href}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => !hasSubs && setIsOpen(false)}
                        className={`text-2xl font-black tracking-tight ${isActive ? "text-primary" : "text-foreground"}`}
                      >
                        {link.name}
                      </Link>
                      {hasSubs && (
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === "categories" ? null : "categories")}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <ChevronRight className={`h-5 w-5 transition-transform ${mobileExpanded === "categories" ? "rotate-90" : ""}`} />
                        </button>
                      )}
                      {!hasSubs && isActive && <ArrowRight className="h-5 w-5 text-primary" />}
                    </div>

                    {/* Mobile subcategories */}
                    {hasSubs && mobileExpanded === "categories" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-2 ml-4 pl-4 border-l-2 border-primary/20 space-y-1 overflow-hidden"
                      >
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="block py-1.5 text-base font-bold text-foreground/70 hover:text-primary transition-colors"
                            >
                              {cat.name}
                            </Link>
                            {cat.subCategories.length > 0 && (
                              <div className="ml-4 space-y-0.5">
                                {cat.subCategories.map((sc) => (
                                  <Link
                                    key={sc.id}
                                    href={`/categories/${cat.slug}?sub=${sc.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-0.5 text-sm font-medium text-foreground/40 hover:text-primary transition-colors"
                                  >
                                    {sc.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col gap-4"
            >
              <div className="h-px w-full bg-border mb-4"></div>
              <a href="https://wa.me/919398190254" className="flex items-center gap-3 text-lg font-bold text-foreground">
                <FaWhatsapp className="h-6 w-6 text-emerald-500"/> WhatsApp Support
              </a>
              <div className="flex items-center gap-3 text-lg font-bold text-foreground">
                <Phone className="h-6 w-6 text-primary"/> +91 93981 90254
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
