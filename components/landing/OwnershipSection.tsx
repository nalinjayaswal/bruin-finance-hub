import { Shield, Fingerprint, TrendingUp } from "lucide-react";
import { Section, SectionHeader, FeatureGrid } from "./shared";

const statements = [
  { icon: Shield, text: "Your AI. Your data. Your edge." },
  { icon: Fingerprint, text: "A model no one else can copy." },
  { icon: TrendingUp, text: "An asset that compounds over time." },
];

const OwnershipSection = () => {
  return (
    <Section maxWidth="lg">
      <div className="text-center space-y-12">
        <SectionHeader
          title={
            <>
              Don't just use AI. <span className="text-gradient">Own it.</span>
            </>
          }
          subtitle="Everyone is becoming AI-friendly. The leaders will be AI-owned."
        />

        <FeatureGrid features={statements} columns={3} className="pt-8" />

        <div className="pt-8">
          <div className="inline-flex flex-col items-center gap-4 glass-strong rounded-2xl p-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gradient">∀i</span>
              <span className="text-lg font-semibold">Powered by Native ∀i</span>
            </div>
            <p className="text-muted-foreground italic">"We run on our own AI."</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OwnershipSection;
