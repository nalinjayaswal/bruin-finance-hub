const About = () => {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              About
            </h2>
          </div>
          
          <div className="md:col-span-8">
            <div className="max-w-2xl">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Bruin Finance Journal publishes student-written articles, research notes, 
                opinion pieces, and market analysis from UCLA's finance community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that writing is the ultimate test of understanding. Our mission 
                is to provide a platform where students can develop their thinking through 
                rigorous, public-facing work—emphasizing clarity, depth, and intellectual 
                honesty above all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
