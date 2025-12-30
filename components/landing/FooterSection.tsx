import { Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/#demo" },
    { label: "Research", href: "/research" },
  ],
  Company: [
    { label: "About", href: "/#product" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "mailto:hello@native.ai" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const FooterSection = () => {
  return (
    <footer className="py-16 px-4 border-t border-border bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold">Native</span>
              <span className="text-3xl font-bold text-gradient">∀i</span>
            </div>
            <p className="text-muted-foreground">
              Intelligence, for all.
              <br />
              Built for small businesses with big ambitions.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/nativeai" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-card/80 transition-colors"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://linkedin.com/company/nativeai" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-card/80 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a 
                href="mailto:hello@native.ai"
                className="p-2 rounded-lg glass hover:bg-card/80 transition-colors"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") && link.href !== "#" ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : link.href === "#" ? (
                      <span className="text-muted-foreground/50 text-sm cursor-not-allowed">
                        {link.label}
                      </span>
                    ) : link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Native ∀i. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Native ∀i — Intelligence, for all.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
