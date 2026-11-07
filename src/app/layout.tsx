import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { SiteContentProvider } from "@/context/SiteContentContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVENIQ | Premium Website Design & Digital Growth Studio",
  description:
    "AVENIQ creates premium websites and digital growth solutions for hospitals, clinics and ambitious businesses across India and worldwide.",
  keywords: [
    "website design",
    "digital studio",
    "healthcare websites",
    "hospital website development",
    "web development India",
    "premium web design",
    "SEO",
    "digital growth",
  ],
  authors: [{ name: "AVENIQ" }],
  openGraph: {
    title: "AVENIQ | Premium Website Design & Digital Growth Studio",
    description:
      "AVENIQ creates premium websites and digital growth solutions for hospitals, clinics and ambitious businesses across India and worldwide.",
    url: "https://aveniq.in",
    siteName: "AVENIQ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVENIQ | Premium Website Design & Digital Growth Studio",
    description:
      "AVENIQ creates premium websites and digital growth solutions for hospitals, clinics and ambitious businesses across India and worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aveniq.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "AVENIQ",
  "image": "https://aveniq.in/og-image.jpg",
  "description": "AVENIQ helps ambitious businesses transform their digital presence through premium website design, high-performance development, intelligent automation, SEO and complete digital growth solutions.",
  "url": "https://aveniq.in",
  "telephone": "+91XXXXXXXXXX",
  "email": "hello@aveniq.in",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "areaServed": ["IN", "US", "GB", "AU", "CA"],
  "priceRange": "$$$$"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <AuthProvider>
          <SiteContentProvider>{children}</SiteContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
