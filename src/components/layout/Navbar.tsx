"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
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
          <Link
            href="/"
            className="text-text font-wordmark font-bold text-xl tracking-tight hover:text-accent transition-colors duration-200"
          >
            {siteName}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links
              .filter((l) => l.href !== "/")
              .map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-sm transition-colors duration-200 relative",
                        "after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300",
                        active
                          ? "text-text after:w-full"
                          : "text-text-muted hover:text-text after:w-0 hover:after:w-full"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            <li>
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-accent text-bg rounded-full hover:bg-accent-hover transition-colors duration-200"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ── Mobile Floating Menu Button (bottom-right FAB) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 active:scale-90"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{
          backgroundColor: "var(--text)",
          color: "var(--bg)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </div>
      </button>

      {/* ── Mobile Full-Screen Menu Overlay ── */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-[55] md:hidden flex flex-col",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none translate-y-4"
        )}
        style={{ backgroundColor: "var(--surface)" }}
      >
        {/* Top bar with logo */}
        <div className="flex items-center px-6 h-18">
          <Link
            href="/"
            className="text-text font-wordmark font-bold text-xl tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            {siteName}
          </Link>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col items-start gap-1 px-6 pt-4 flex-1">
          {links.map((link, i) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="w-full overflow-hidden">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block py-3 text-2xl font-display transition-colors duration-200 border-b border-border-light",
                    active ? "text-accent" : "text-text hover:text-accent"
                  )}
                  style={{
                    transform: isOpen ? "translateY(0)" : "translateY(100%)",
                    opacity: isOpen ? 1 : 0,
                    transition: `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${
                      isOpen ? i * 0.05 + 0.1 : 0
                    }s, opacity 0.4s ease ${isOpen ? i * 0.05 + 0.1 : 0}s`,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom CTA — padded to clear the FAB */}
        <div className="px-6 pb-24">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-medium bg-accent text-bg rounded-full hover:bg-accent-hover transition-colors duration-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
