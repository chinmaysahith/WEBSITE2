"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/data";

interface NavbarProps {
  links: NavLink[];
  siteName: string;
}

export default function Navbar({ links, siteName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-wide flex items-center justify-between h-18 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-text font-wordmark font-bold text-xl tracking-tight hover:text-accent transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          {siteName}
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links
            .filter((l) => l.href !== "/")
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200"
            >
              Get in touch
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text hover:text-accent transition-colors duration-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 top-18 bg-surface z-40 transition-all duration-300 md:hidden flex flex-col",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-start gap-1 p-6 pt-8">
          {links.map((link) => (
            <li key={link.href} className="w-full">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-2xl font-display text-text hover:text-accent transition-colors duration-200 border-b border-border-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-6 mt-auto">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
