import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Khand, Hind } from "next/font/google";
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

const khand = Khand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hind = Hind({
  weight: ["300", "400", "500", "600", "700"],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bilbesto.variable} ${khand.variable} ${hind.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased overflow-x-hidden">
        <Navbar links={navLinks} siteName="APSLOCK" />
        <main className="flex-1">{children}</main>
        <Footer links={navLinks} contactInfo={contactInfo} siteName="APSLOCK" />
        <CookieBanner />
      </body>
    </html>
  );
}
