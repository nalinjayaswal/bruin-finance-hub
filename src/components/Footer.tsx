const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Bruin Finance Journal is a publication of{" "}
              <span className="text-foreground">Bruin Finance Society</span> at UCLA.
            </p>
          </div>
          
          <nav className="flex items-center gap-8">
            <a
              href="#journal"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Journal
            </a>
            <a
              href="#apply"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Apply
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bruin Finance Journal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
