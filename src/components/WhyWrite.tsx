import { Check } from "lucide-react";

const reasons = [
  "Build structured finance thinking through deliberate practice",
  "Publish polished, public-facing work for your professional portfolio",
  "Learn to articulate complex ideas with clarity and precision",
  "Join a serious community of student finance writers and thinkers",
  "Receive editorial feedback and mentorship from peers",
];

const WhyWrite = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="editorial-container">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
            Why Write for BFJ
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Writing is thinking. Publishing sharpens both.
          </p>
          
          <ul className="space-y-5">
            {reasons.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-4 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                </span>
                <span className="text-foreground leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyWrite;
