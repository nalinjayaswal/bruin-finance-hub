import { MessageCircle, Brain, Bell, Lightbulb, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "./shared";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Chat Naturally",
    description: "Your team talks in Native's group chat.",
  },
  {
    icon: Brain,
    number: "02",
    title: "BLM Analyzes",
    description: "AI learns context, tasks, and patterns.",
  },
  {
    icon: Bell,
    number: "03",
    title: "Tasks & Nudges",
    description: "Work is auto-assigned with smart nudges.",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Intelligence Delivered",
    description: "Insights improve execution every day.",
  },
];

const HowItWorksSection = () => {
  return (
    <Section background="pattern">
      <div className="text-center space-y-16">
        <SectionHeader
          eyebrow="How It Works"
          title={
            <>
              From Chat to <span className="text-gradient">Intelligence</span>
            </>
          }
        />

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/3 -right-3 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/30" />
                </div>
              )}

              <div className="glass rounded-2xl p-6 h-full space-y-4 hover:shadow-glow-soft transition-all duration-300">
                <div className="text-primary/30 text-5xl font-bold">{step.number}</div>
                <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg text-muted-foreground">
          Every step makes your BLM <span className="text-primary font-semibold">smarter</span>.
        </p>
      </div>
    </Section>
  );
};

export default HowItWorksSection;
