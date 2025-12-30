"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Research", href: "/research" },
];

const NavigationSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      if (pathname !== '/') {
        window.location.href = href;
      } else {
        const element = document.querySelector(href.replace('/', ''));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[hsl(213,16%,12%)]/80 border-b border-white/10 shadow-sm"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">Native</span>
            <span className="text-2xl font-bold text-gradient">∀i</span>
          </Link>

          {/* Desktop nav - Centered */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.label}
                  href={link.href as any}
                  className="nav-link-hover text-muted-foreground transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('/#')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="nav-link-hover text-muted-foreground transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* CTA - Right aligned */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <Link href="/login">
              <Button variant="ghost" size="small">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="small">
                Build My BLM
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 justify-self-end"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={link.label}
                    href={link.href as any}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium py-2"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/login">
                  <Button variant="ghost" className="justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary">
                    Build My BLM
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationSection;
