import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import { HighlightText } from "@/components/ui/HighlightText";
import { contactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with APSLOCK. Let's discuss your next project — we'd love to hear about your challenges and goals.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="container-wide">
          <FadeIn>
            <p className="text-eyebrow text-accent mb-4">Contact</p>
            <h1 className="text-hero text-text max-w-2xl">
              <HighlightText text="Let's start a conversation" highlight="conversation" />
            </h1>
            <p className="mt-6 text-lg text-text-muted max-w-xl leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Fill out the
              form below or reach out directly.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 mt-16">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <ContactForm />
            </FadeIn>

            {/* Contact Details */}
            <FadeIn delay={0.15} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-text-muted mb-6">
                    Get in touch
                  </h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <Mail size={20} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-text-muted mb-1">Email</p>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-base text-text hover:text-accent transition-colors duration-200"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Phone size={20} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-text-muted mb-1">Phone</p>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-base text-text hover:text-accent transition-colors duration-200"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <MapPin size={20} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-text-muted mb-1">
                          Location
                        </p>
                        <p className="text-base text-text">
                          {contactInfo.locationDetail}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-medium uppercase tracking-widest text-text-muted mb-4">
                    Follow us
                  </h3>
                  <div className="flex items-center gap-4">
                    {contactInfo.social.map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                        aria-label={`Follow APSLOCK on ${s.platform}`}
                      >
                        {s.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
