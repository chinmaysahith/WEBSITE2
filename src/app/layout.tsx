import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Khand, Hind, Fraunces } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import { siteMeta, navLinks, contactInfo } from "@/lib/data";
import "./globals.css";

const bilbesto = localFont({
  src: "../../public/fonts/VintageBilbesto.otf",
  variable: "--font-numeral",
  display: "swap",
});

const fraunces = Fraunces({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const khand = Khand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hind = Hind({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s | APSLOCK`,
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: "APSLOCK",
    images: [
      {
        url: siteMeta.ogImage.src,
        width: siteMeta.ogImage.width,
        height: siteMeta.ogImage.height,
        alt: siteMeta.ogImage.alt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMeta.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "APSLOCK",
    "url": siteMeta.url,
    "logo": `${siteMeta.url}${siteMeta.ogImage.src}`,
    "image": `${siteMeta.url}${siteMeta.ogImage.src}`,
    "description": siteMeta.description,
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.7490",
      "longitude": "-84.3880"
    },
    "areaServed": ["United States", "Worldwide"],
    "knowsAbout": [
      "Web Design",
      "Brand Strategy",
      "Growth Marketing",
      "SEO",
      "UI/UX Design",
      "App Development",
      "Content Strategy",
      "Digital Marketing"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactInfo.phone,
      "contactType": "customer service",
      "email": contactInfo.email,
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    },
    "sameAs": contactInfo.social.map((s) => s.url)
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "APSLOCK",
    "url": siteMeta.url,
    "description": siteMeta.description,
    "publisher": {
      "@type": "Organization",
      "name": "APSLOCK",
      "url": siteMeta.url
    }
  };

  return (
    <html
      lang="en"
      className={`${bilbesto.variable} ${fraunces.variable} ${khand.variable} ${hind.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar links={navLinks} siteName="APSLOCK" />
        <main className="flex-1">{children}</main>
        <Footer links={navLinks} contactInfo={contactInfo} siteName="APSLOCK" />
        <CookieBanner />
      </body>
    </html>
  );
}
