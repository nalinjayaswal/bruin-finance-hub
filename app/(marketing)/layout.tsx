import BFJHeader from "@/components/landing/BFJHeader";
import FooterSection from "@/components/landing/FooterSection";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[hsl(216,24%,5%)]">
      <BFJHeader />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}

