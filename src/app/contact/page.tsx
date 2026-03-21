import { PageHeader } from "@/components/ui/PageHeader";
import { FadeIn, Breathing } from "@/components/ui/FadeIn";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export default function ContactPage() {
  const whatsappLink = generateWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919849012345", "Hello Najmi Industrial Corporation!");

  return (
    <div className="bg-background min-h-screen pb-24">
      <FadeIn duration={1}>
        <PageHeader 
          title="Connect With Us" 
          subtitle="Reach out to our technical sales team for quotations, bulk orders, and custom fabrications."
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 mt-[-4rem] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          <div className="lg:col-span-5 space-y-8">
            <FadeIn delay={0.1} direction="up">
              <div className="bg-primary text-primary-foreground rounded-3xl p-10 shadow-2xl relative overflow-hidden h-full">
                <div className="absolute bottom-0 right-0 -mr-10 -mb-10 opacity-10">
                  <GlobeIcon className="h-64 w-64" />
                </div>
                <h3 className="text-2xl font-black mb-8 relative z-10">Corporate Headquarters</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Registered Address</h4>
                      <p className="text-primary-foreground/70 font-medium leading-relaxed">
                        Najmi Industrial Corporation<br />
                        4-4-120, Mahakali Street<br />
                        Hyderabad - 500003, Telangana, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Direct Lines</h4>
                      <p className="text-primary-foreground/70 font-medium leading-relaxed">+91 98490 12345 <br/> +91 40 2345 6789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Electronic Mail</h4>
                      <p className="text-primary-foreground/70 font-medium leading-relaxed">info@najmiindustrial.com <br/> sales@najmiindustrial.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Operating Hours</h4>
                      <p className="text-primary-foreground/70 font-medium leading-relaxed">Monday - Saturday <br/> 10:00 AM - 7:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.2} direction="up" className="h-full">
              <div className="bg-card rounded-3xl shadow-xl border border-border p-10 h-full flex flex-col justify-center">
                <Breathing className="w-16 h-1 bg-primary rounded-full mb-8"></Breathing>
                <h3 className="text-4xl font-black mb-4 text-foreground tracking-tight">Send a Direct Message</h3>
                <p className="text-foreground/60 font-medium mb-10 text-lg">Our hardware sales experts promise to revert within 24 working hours.</p>
                
                {/* For layout purposes we show the UI. A generic message form can be plugged in or users can use WhatsApp */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Full Name</label>
                      <input type="text" className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Company Name</label>
                      <input type="text" className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium" placeholder="Acme Logistics" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium" placeholder="john@acme.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Your Enquiry</label>
                    <textarea rows={4} className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium resize-none" placeholder="I am looking for SS304 Hex Bolts in bulk..."></textarea>
                  </div>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button type="button" className="flex-1 bg-foreground text-background font-bold py-4 rounded-xl hover:bg-primary transition-all shadow-lg hover:-translate-y-1">
                      Send Secure Message
                    </button>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#1ebd5a] transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2">
                       <FaWhatsapp className="h-6 w-6" /> Live WhatsApp Chat
                    </a>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
)
