import type { Metadata } from "next";
import { CalEmbed } from "@/components/ui/CalEmbed";

const siteUrl = "https://autoikigai.space";

export const metadata: Metadata = {
  title: "Apply to Work With Us",
  description:
    "Apply for a B2B lead generation pilot with Autoikigai. Qualified sales meetings on your calendar without hiring SDRs.",
  alternates: {
    canonical: `${siteUrl}/book-a-call`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/book-a-call`,
    siteName: "Autoikigai",
    title: "Apply to Work With Us | Autoikigai",
    description:
      "Apply for a B2B lead generation pilot. Done-for-you cold email and LinkedIn outbound for B2B SaaS, agencies, and consultancies.",
    images: [
      {
        url: `${siteUrl}/og-book-a-call.png`,
        width: 1200,
        height: 630,
        alt: "Apply to Work With Us — Autoikigai",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to Work With Us | Autoikigai",
    description:
      "Apply for a B2B lead generation pilot. Done-for-you cold email and LinkedIn outbound for B2B SaaS, agencies, and consultancies.",
    images: [`${siteUrl}/og-book-a-call.png`],
  },
};

export default function BookACallPage() {
  return (
    <section
      className="section"
      style={{
        borderBottom: "none",
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="max-w-2xl mb-8">
        <p className="section-label" style={{ marginBottom: "12px" }}>
          Apply
        </p>
        <h1
          className="text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.15] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Let&apos;s see if we&apos;re a fit
        </h1>
        <p
          className="text-sm leading-[1.7]"
          style={{ color: "var(--text-muted)" }}
        >
          Book a call. We&apos;ll review your offer, ICP, and sales process, then tell you if and how we can help.
        </p>
      </div>

      <CalEmbed />
    </section>
  );
}
