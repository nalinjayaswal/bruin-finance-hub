import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatWePublish from "@/components/WhatWePublish";
import WhyWrite from "@/components/WhyWrite";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <About />
      <WhatWePublish />
      <WhyWrite />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
