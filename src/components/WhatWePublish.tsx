import { TrendingUp, BarChart3, Globe, Briefcase } from "lucide-react";

const categories = [
  {
    icon: TrendingUp,
    title: "Markets & Macro",
    description: "Analysis of global markets, monetary policy, and macroeconomic trends shaping the financial landscape.",
  },
  {
    icon: BarChart3,
    title: "Investing & Valuation",
    description: "Deep dives into equity research, valuation frameworks, and investment thesis development.",
  },
  {
    icon: Globe,
    title: "Economics & Policy",
    description: "Exploration of economic theory, fiscal policy, and their real-world implications.",
  },
  {
    icon: Briefcase,
    title: "Business & Strategy",
    description: "Case studies and analysis of corporate strategy, M&A, and industry dynamics.",
  },
];

const WhatWePublish = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="editorial-container">
        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
          What We Publish
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
          Rigorous analysis across the core domains of finance and economics.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group p-8 border border-border bg-card hover:shadow-card transition-all duration-300 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <category.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-serif mb-3 text-foreground group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWePublish;
