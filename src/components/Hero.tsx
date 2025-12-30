import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center py-20">
      <div className="editorial-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subtle label */}
          <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans font-medium">
              UCLA's Student Finance Publication
            </span>
          </div>
          
          {/* Main headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 text-foreground opacity-0 animate-fade-in text-balance"
            style={{ animationDelay: "200ms" }}
          >
            Where UCLA Students Think About Finance.
          </h1>
          
          {/* Subtext */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            Bruin Finance Journal is UCLA's student-led platform for deep thinking on 
            markets, investing, economics, and business.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button variant="editorial" size="lg" className="group">
              Read the Journal
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="editorial-outline" size="lg">
              Write With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
