import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#121417] text-white pt-20 pb-10 border-t-4 border-primary relative overflow-hidden">
      {/* Decorative large N in background */}
      <div className="absolute -bottom-24 -right-24 text-[300px] font-black pointer-events-none text-white/5 z-0 select-none">
        N
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter leading-none text-white">Najmi Industrial</span>
              <span className="text-sm uppercase font-bold text-primary tracking-[0.2em] mt-1">Corporation</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Established in 1990. Specialists in providing absolute precision Fasteners, Flanges, Pipe Fittings, and General Hardware with uncompromised quality standards for over 30 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-400 hover:text-white"><FaFacebook size={18} /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-400 hover:text-white"><FaLinkedin size={18} /></a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-400 hover:text-white"><FaTwitter size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">Navigation</h4>
            <ul className="space-y-3 font-medium text-gray-400">
              <li><Link href="/" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">About Our Company</Link></li>
              <li><Link href="/products" className="hover:text-primary hover:translate-x-1 inline-block transition-all">All Products</Link></li>
              <li><Link href="/brands" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Partner Brands</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">Product Categories</h4>
            <ul className="space-y-3 font-medium text-gray-400">
              <li><Link href="/categories/fasteners" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Precision Fasteners</Link></li>
              <li><Link href="/categories/flanges" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Industrial Flanges</Link></li>
              <li><Link href="/categories/pipe-fittings" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Pipe Fittings</Link></li>
              <li><Link href="/categories/hardware" className="hover:text-primary hover:translate-x-1 inline-block transition-all">General Hardware</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">Get In Touch</h4>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Najmi Industrial Corporation<br />
                  4-4-120, Mahakali Street<br />
                  Hyderabad - 500003, Telangana
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+919849012345" className="group-hover:text-white transition-colors font-medium">
                  +91 98490 12345
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@najmiindustrial.com" className="group-hover:text-white transition-colors font-medium">
                  info@najmiindustrial.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Najmi Industrial Corporation. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
