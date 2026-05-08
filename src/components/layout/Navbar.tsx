"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Layers, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/data";

interface NavbarProps {
  links: NavLink[];
  siteName: string;
}

const expertiseItems = [
  {
    label: "Brand Foundations",
    description: "Name, voice, positioning — the backbone of every brand that lasts.",
    icon: Layers,
    href: "/expertise/brand-foundations",
  },
  {
    label: "Build & Innovation",
    description: "Websites and products built to perform, not just exist.",
    icon: Lightbulb,
    href: "/expertise/build-innovation",
  },
  {
    label: "Growth & Go-To-Market",
    description: "From launch to pipeline — strategy that turns interest into revenue.",
    icon: TrendingUp,
    href: "/expertise/growth-go-to-market",
  },
  {
    label: "Trust & Influence",
    description: "The authority that earns trust before the first meeting.",
    icon: ShieldCheck,
    href: "/expertise/trust-influence",
  },
];

export default function Navbar({ links, siteName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setExpertiseOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExpertiseOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const desktopLinks = links.filter((l) => l.href !== "/" && l.href !== "/contact");

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
            {desktopLinks.map((link) => {
              const active = isActive(link.href);

              if (link.href === "/expertise") {
                return (
                  <li key={link.href} ref={dropdownRef} className="relative">
                    <div className="flex items-center gap-0.5">
                      <Link
                        href="/expertise"
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
                      <button
                        onClick={() => setExpertiseOpen((v) => !v)}
                        aria-expanded={expertiseOpen}
                        aria-haspopup="true"
                        aria-label="Toggle expertise sub-categories"
                        className={cn(
                          "p-1 rounded transition-colors duration-200",
                          expertiseOpen ? "text-text" : "text-text-muted hover:text-text"
                        )}
                      >
                        <ChevronDown size={13} className={cn("transition-transform duration-200", expertiseOpen && "rotate-180")} />
                      </button>
                    </div>

                    {/* Dropdown Panel */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[480px] transition-all duration-200 origin-top",
                        expertiseOpen
                          ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
                          : "opacity-0 scale-y-95 pointer-events-none -translate-y-2"
                      )}
                    >
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-surface border-l border-t border-border rounded-sm" />

                      <div className="relative bg-surface border border-border rounded-2xl shadow-xl p-5 grid grid-cols-2 gap-3">
                        {expertiseItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setExpertiseOpen(false)}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-accent/5 transition-colors duration-150"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Icon size={16} className="text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-text leading-tight mb-1 group-hover:text-accent transition-colors duration-150">
                                  {item.label}
                                </p>
                                <p className="text-xs text-text-muted leading-snug">{item.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              }

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

      {/* ── Mobile Floating Menu Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 active:scale-90"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{ backgroundColor: "var(--text)", color: "var(--bg)", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
      >
        <div className="transition-transform duration-300" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
          {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </div>
      </button>

      {/* ── Mobile Full-Screen Menu Overlay ── */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-[55] md:hidden flex flex-col",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
        )}
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="flex items-center px-6 h-18">
          <Link href="/" className="text-text font-wordmark font-bold text-xl tracking-tight" onClick={() => setIsOpen(false)}>
            {siteName}
          </Link>
        </div>

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
                    transition: `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${isOpen ? i * 0.05 + 0.1 : 0}s, opacity 0.4s ease ${isOpen ? i * 0.05 + 0.1 : 0}s`,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

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
