"use client";

import { ArrowRight } from "lucide-react";
import { CTABlock } from "./shared";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            <span className="text-gradient">Build Your BLM.</span>
            <br />
            <span className="text-foreground">
              Your Business <br /> Language Model.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Native ∀i helps you build and own your own AI co-founder — trained on how your business works.
          </p>

          <div className="pt-6">
            <CTABlock
              size="large"
              buttons={[
                { text: "Build My BLM", href: "/signup", variant: "primary", icon: ArrowRight },
                {
                  text: "View Demo",
                  variant: "outline",
                  onClick: () => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' }),
                },
              ]}
              trustLine="Free 14-day trial • No credit card • Setup in under 5 minutes"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
