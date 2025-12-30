import { Lock, DollarSign, Zap, Users } from "lucide-react";
import { Section, SectionHeader, FeatureGrid } from "./shared";

const features = [
  { icon: Lock, text: "Your data stays private" },
  { icon: DollarSign, text: "Priced for SMBs" },
  { icon: Zap, text: "Setup in minutes" },
  { icon: Users, text: "No AI team needed" },
];

const BuiltForSMBSection = () => {
  return (
    <Section maxWidth="md">
      <div className="text-center space-y-12">
        <SectionHeader
          title={
            <>
              Built for businesses <span className="text-gradient">like yours.</span>
            </>
          }
        />

        <FeatureGrid features={features} columns={4} />

        <div className="pt-8">
          <div className="glass-strong rounded-2xl p-8 inline-block">
            <p className="text-lg md:text-xl">
              If you can run WhatsApp, you can run{" "}
              <span className="text-gradient font-bold">Native ∀i</span>.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BuiltForSMBSection;
