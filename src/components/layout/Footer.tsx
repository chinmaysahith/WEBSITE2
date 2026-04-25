import Link from "next/link";
import type { NavLink, ContactInfo } from "@/lib/data";

interface FooterProps {
  links: NavLink[];
  contactInfo: ContactInfo;
  siteName: string;
}

export default function Footer({ links, contactInfo, siteName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-bg" role="contentinfo">
      <div className="container-wide py-16 md:py-20 lg:py-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-wordmark font-bold tracking-tight text-bg hover:text-bg/70 transition-colors duration-200">
              {siteName}
            </Link>
            <p className="mt-4 text-bg/60 text-sm leading-relaxed max-w-xs">
              A strategic design and technology studio partnering with ambitious brands to drive real growth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-bg/40 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bg/70 hover:text-bg transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-bg/40 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Web Experiences",
                "Brand Strategy",
                "Growth Marketing",
                "Content & Editorial",
                "Design Systems",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/expertise"
                    className="text-sm text-bg/70 hover:text-bg transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-bg/40 mb-6">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-bg/70 hover:text-bg transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-sm text-bg/70 hover:text-bg transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="text-sm text-bg/70">{contactInfo.locationDetail}</li>
            </ul>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {contactInfo.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bg/50 hover:text-bg transition-colors duration-200"
                  aria-label={`Follow us on ${s.platform}`}
                >
                  <span className="text-sm">{s.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-bg/10 mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-bg/40">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-bg/40 hover:text-bg/70 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-bg/40 hover:text-bg/70 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-bg/40 hover:text-bg/70 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
