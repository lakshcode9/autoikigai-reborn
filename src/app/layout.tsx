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
const siteTitle = "Autoikigai - Done-for-you B2B lead generation";
const siteDescription =
  "Qualified sales meetings on your calendar without hiring SDRs. Done-for-you cold email and LinkedIn outbound. Pay per meeting.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "B2B lead generation",
    "cold email agency",
    "outbound sales",
    "sales meetings",
    "SDR alternative",
    "LinkedIn outbound",
    "lead generation agency",
    "B2B SaaS leads",
    "done for you outbound",
    "cold email infrastructure",
    "pay per meeting",
    "qualified meetings",
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
        alt: "Autoikigai - Done-for-you B2B lead generation",
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
  description: "Done-for-you B2B lead generation agency. We book qualified sales meetings on your calendar through cold email and LinkedIn outbound.",
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
  name: "B2B Lead Generation",
  provider: {
    "@type": "Organization",
    name: "Autoikigai",
    url: siteUrl,
  },
  description:
    "Done-for-you cold email and LinkedIn outbound that books qualified sales meetings on your calendar. For B2B SaaS, agencies, consultancies, and IT services firms.",
  serviceType: "B2B Lead Generation & Outbound Sales",
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
