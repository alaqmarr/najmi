"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, Hexagon, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Categories", href: "/categories" },
  { name: "Brands", href: "/brands" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Ultra sleek */}
      <div className="hidden lg:block bg-[#064e3b] text-emerald-50 text-xs font-semibold tracking-widest relative z-[60]">
        <div className="container mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-8 opacity-90">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary"/> 4-4-120, Mahakali Street, Hyderabad</span>
            <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Mail className="h-3.5 w-3.5 text-primary"/> info@najmiindustrial.com</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary"/> +91 98490 12345</span>
            <a href="https://wa.me/919849012345" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-emerald-500/20 px-4 py-1 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
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
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-bold tracking-widest uppercase transition-all relative py-2 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/60 hover:text-foreground"
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
              })}
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
            className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-3xl flex flex-col pt-32 px-6 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mb-auto">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.href}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between text-3xl font-black tracking-tight ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.name}
                      {isActive && <ArrowRight className="h-6 w-6 text-primary" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col gap-4"
            >
              <div className="h-px w-full bg-border mb-4"></div>
              <a href="https://wa.me/919849012345" className="flex items-center gap-3 text-lg font-bold text-foreground">
                <FaWhatsapp className="h-6 w-6 text-emerald-500"/> WhatsApp Support
              </a>
              <div className="flex items-center gap-3 text-lg font-bold text-foreground">
                <Phone className="h-6 w-6 text-primary"/> +91 98490 12345
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
