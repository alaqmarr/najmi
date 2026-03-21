import { PageHeader } from "@/components/ui/PageHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Factory, Award, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <FadeIn duration={1.2}>
        <PageHeader 
          title="About Our Heritage" 
          subtitle="Three decades of unwavering commitment to industrial excellence and precision engineering."
        />
      </FadeIn>
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <FadeIn direction="up">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-medium font-serif italic text-center mb-16">
                "Established in 1990, Najmi Industrial Corporation has grown from a specialized local supplier to a globally recognized name in precision hardware, built entirely on the foundation of trust and quality."
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn delay={0.1} direction="left">
              <div className="bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Factory className="h-32 w-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-foreground">Our Infrastructure</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium">
                    We possess fully-equipped warehousing and processing facilities utilizing modern inventory management to ensure just-in-time delivery of Fasteners, Flanges, and Pipe Fittings across continents.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <div className="bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="h-32 w-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-foreground">Quality Mandate</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium">
                    As an ISO certified distributor, every product batch undergoes rigorous metallurgical and tensile testing before it reaches your factory floor. No compromises.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="left">
              <div className="bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="h-32 w-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-foreground">Global Reach</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium">
                    Our logistics network stretches across the Middle East, Europe, and Asia, proudly flying the banner of Indian manufacturing excellence worldwide.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="right">
              <div className="bg-card p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden group border-primary/30">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users className="h-32 w-32 text-primary" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 text-primary">The Najmi Promise</h3>
                  <p className="text-foreground/80 leading-relaxed font-bold">
                    Whether you are building a skyscraper or a machine component, we promise hardware that holds together generations of engineering.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
