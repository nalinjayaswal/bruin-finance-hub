import { Settings, Navigation, Lightbulb, Brain, TrendingUp } from "lucide-react";
import { Section, SectionHeader, FeatureGrid } from "./shared";

const features = [
  {
    icon: Settings,
    title: "Automate the repetitive",
    description: "Let AI handle routine tasks so your team can focus on what matters.",
  },
  {
    icon: Navigation,
    title: "Orchestrate operations",
    description: "Seamless coordination across teams and workflows.",
  },
  {
    icon: Lightbulb,
    title: "Nudge strategy",
    description: "Proactive insights that keep you ahead of decisions.",
  },
  {
    icon: Brain,
    title: "Remember everything",
    description: "Institutional memory that never forgets context.",
  },
  {
    icon: TrendingUp,
    title: "Learn & improve daily",
    description: "Your BLM gets smarter with every interaction.",
  },
];

const FeaturesSection = () => {
  return (
    <Section id="features">
      <div className="text-center space-y-16">
        <SectionHeader
          eyebrow="Capabilities"
          title={
            <>
              What Your <span className="text-gradient">BLM</span> Does
            </>
          }
        />

        <FeatureGrid features={features} columns={5} variant="detailed" />

        <div className="pt-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prompts become tasks. Tasks become systems.{" "}
            <span className="text-gradient font-semibold">Systems become intelligence.</span>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default FeaturesSection;
