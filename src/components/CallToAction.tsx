import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="editorial-container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
            Interested in writing or editing?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We're always looking for thoughtful writers who want to develop their finance thinking through publication.
          </p>
          <Button variant="editorial" size="lg" className="group">
            Apply to Write
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
