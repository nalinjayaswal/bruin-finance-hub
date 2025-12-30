import NavigationSection from "@/components/landing/NavigationSection";
import FooterSection from "@/components/landing/FooterSection";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[hsl(216,24%,5%)]">
      <NavigationSection />
      <main className="pt-16">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}

