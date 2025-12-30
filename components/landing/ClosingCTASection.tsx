import { ArrowRight, Calendar } from "lucide-react";
import { Section, CTABlock } from "./shared";

const ClosingCTASection = () => {
  return (
    <Section spacing="large" maxWidth="md">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="text-center space-y-10">
        <div className="text-8xl font-bold text-gradient">∀i</div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Every great business deserves{" "}
          <span className="text-gradient">its own brain.</span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Build your BLM ∀i. Own your intelligence.
        </p>

        <div className="pt-6">
          <CTABlock
            size="large"
            buttons={[
              { text: "Start Free Trial", href: "/signup", variant: "primary", icon: ArrowRight },
              { text: "Schedule Demo", href: "mailto:hello@native.ai?subject=Schedule Demo", variant: "outline", icon: Calendar },
            ]}
            trustLine="Free 14-day trial • No credit card • 5-minute setup"
          />
        </div>
      </div>
    </Section>
  );
};

export default ClosingCTASection;
