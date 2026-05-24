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
  "Autoikigai — AI-Native Systems for Insurance Agencies | Renewal Automation, CSR Task Handling, Lapse Prevention";
const siteDescription =
  "We build AI-native systems for independent insurance agencies. Automate renewal follow-ups, CSR tasks, new business intake, lapse prevention, and claims follow-up. Integrates with Applied Epic, AMS360, HawkSoft, EZLynx. Audit starts at $5,000.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI-native systems for insurance agencies",
    "insurance agency automation",
    "renewal automation insurance",
    "CSR task automation",
    "lapse prevention insurance",
    "Applied Epic integration",
    "AMS360 automation",
    "HawkSoft AI integration",
    "EZLynx automation",
    "insurance agency AI audit",
    "independent insurance agency technology",
    "insurance workflow automation",
    "AI for insurance agents",
    "insurance agency operations",
    "policy renewal automation",
    "insurance back office automation",
    "IVANS feed automation",
    "insurance cross-sell detection",
    "new business intake automation",
    "insurance claims follow-up automation",
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
        alt: "Autoikigai — AI-Native Systems for Insurance Agencies",
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
    url: `${siteUrl}/#get-started`,
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
  name: "AI-Native Systems for Insurance Agencies",
  provider: {
    "@type": "Organization",
    name: "Autoikigai",
    url: siteUrl,
  },
  description:
    "Full-service AI automation for independent insurance agencies. We audit your workflows, build AI-native systems that integrate with your AMS, and maintain them ongoing. Covers renewal automation, lapse prevention, CSR task handling, new business intake, cross-sell detection, and claims follow-up.",
  serviceType: "AI Automation Consulting",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance Agency AI Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Agency AI Audit",
        description:
          "Complete audit of your agency workflows, AMS integrations, and automation opportunities. Delivered as a blueprint with ROI projections for every workflow.",
        price: "5000",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "AI-Native System Build & Maintenance",
        description:
          "Ongoing build, deployment, and maintenance of AI-native systems that handle renewal automation, CSR tasks, lapse prevention, intake, and claims follow-up. Integrates with Applied Epic, AMS360, HawkSoft, EZLynx.",
        price: "2000",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "2000",
          priceCurrency: "USD",
          unitText: "MONTH",
          minPrice: "2000",
          maxPrice: "5000",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Autoikigai do for insurance agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build AI-native systems that handle the repetitive work in your agency: renewal follow-ups, CSR tasks like certificates and endorsements, new business intake, lapse prevention, and cross-sell detection. They integrate directly with your AMS and run 24/7.",
      },
    },
    {
      "@type": "Question",
      name: "Which AMS systems do you integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Applied Epic, AMS360 (Vertafore), HawkSoft, EZLynx, and QQCatalyst. If your AMS has an API or supports CSV exports, we can work with it. We also integrate with comparative raters and carrier portals.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from hiring another CSR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A CSR costs $45K-$65K/year, needs training, takes PTO, and handles maybe 200 policies. An AI-native system costs a fraction, works 24/7, handles thousands of policies simultaneously, and never forgets a renewal follow-up.",
      },
    },
    {
      "@type": "Question",
      name: "What size insurance agencies do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Independent agencies writing $1M-$10M in premium. Whether you have 3 people or 30, if your CSRs are drowning in repetitive tasks and your retention rate is under 92%, we can help.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Autoikigai cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The audit starts at $5,000. You get a complete blueprint of every workflow we can automate and the expected ROI. After that, we build and maintain your AI-native systems for $2,000 to $5,000 per month depending on the number of workflows and AMS integrations.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly will I see results from AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your first AI-native workflow is live within 2-3 weeks. Most agencies see renewal touch rates jump from under 40% to over 90% in the first month. CSR time freed up within the first week.",
      },
    },
    {
      "@type": "Question",
      name: "What happens during a carrier download or IVANS feed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We integrate with your existing IVANS feeds and carrier downloads. Policy data flows into the system automatically, triggering the right workflows without manual intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Will AI automation work with my E&O compliance requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every automated touchpoint is logged with timestamps, creating a complete audit trail. We actually reduce E&O exposure by ensuring no renewal or follow-up is ever missed.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  publisher: {
    "@type": "Organization",
    name: "Autoikigai",
    url: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
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
