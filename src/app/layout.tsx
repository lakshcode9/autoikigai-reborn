import { IBM_Plex_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { LenisProvider } from "@/components/layout/LenisProvider";
import type { Metadata } from "next";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://autoikigai.space";
const siteName = "Autoikigai";
const siteTitle =
  "Autoikigai — Automated B2B Outbound Engines for SBIR/STTR Phase I Awardees & Deep-Tech Founders";
const siteDescription =
  "We build automated B2B outbound engines that target, engage, and book 15–30 enterprise customer discovery interviews with industry executives in 30 days to secure your Phase II LOIs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "SBIR Phase II LOI",
    "STTR Phase I commercialization",
    "deep-tech B2B outbound engine",
    "automated customer discovery",
    "Phase II grant commercial traction",
    "deep tech enterprise LOI",
    "B2B cold outbound for scientists",
    "technical to executive copywriting",
    "outbound infrastructure secondary domains",
    "SPF DKIM DMARC warmup pipeline",
    "automated calendar routing discovery calls",
    "deep tech commercialization",
    "SBIR grant letters of intent",
    "customer discovery interviews",
  ],
  authors: [{ name: "Autoikigai", url: siteUrl }],
  creator: "Autoikigai",
  publisher: "Autoikigai",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Autoikigai — Automated Outbound Engines for SBIR/STTR & Deep-Tech Founders",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#20368f",
    "apple-mobile-web-app-title": "Autoikigai",
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Autoikigai",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description: siteDescription,
  foundingDate: "2026",
  sameAs: [
    "https://www.linkedin.com/company/autoikigai",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${siteUrl}/book-a-call`,
    availableLanguage: "English",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated B2B Outbound Engines for SBIR/STTR Phase I Awardees",
  provider: {
    "@type": "Organization",
    name: "Autoikigai",
    url: siteUrl,
  },
  description:
    "We build automated B2B outbound engines that target, engage, and book 15–30 enterprise customer discovery interviews with industry executives in 30 days. Designed for SBIR/STTR Phase I Awardees & Deep-Tech Founders seeking Phase II LOIs.",
  serviceType: "B2B Outbound Engineering & Commercialization",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlex.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LenisProvider>
          <div className="page">
            <div className="frame">
              <AnnouncementBanner />
              <Navbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
