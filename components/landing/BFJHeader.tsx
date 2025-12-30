"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Journal", href: "#journal" },
  { label: "About", href: "#about" },
  { label: "Apply", href: "#apply" },
  { label: "Contact", href: "#contact" },
];

const BFJHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(var(--background))]/95 shadow-md"
          : "bg-transparent"
      }`}
      style={{
        backdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px) saturate(180%)" : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
              Bruin Finance Journal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#apply");
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] text-sm font-semibold tracking-wide uppercase rounded-none hover:bg-[hsl(var(--foreground))]/90 transition-colors"
            >
              Write With Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[hsl(var(--foreground))]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-[hsl(var(--border))] animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors text-sm font-medium tracking-wide uppercase py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#apply");
                }}
                className="mt-4 inline-flex items-center justify-center px-5 py-3 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] text-sm font-semibold tracking-wide uppercase"
              >
                Write With Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default BFJHeader;
