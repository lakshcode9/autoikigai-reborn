import type { Metadata } from "next";
import { CalEmbed } from "@/components/ui/CalEmbed";

const siteUrl = "https://autoikigai.space";

export const metadata: Metadata = {
  title: "Book a 15-Min Strategy Call",
  description:
    "Schedule a 15-minute strategy call with Autoikigai. Let's deploy your automated B2B outbound engine before your Phase I timeline runs out.",
  alternates: {
    canonical: `${siteUrl}/book-a-call`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/book-a-call`,
    siteName: "Autoikigai",
    title: "Book a 15-Min Strategy Call | Autoikigai",
    description:
      "15-minute strategy call for SBIR/STTR Phase I awardees & deep-tech founders. Secure Phase II LOIs without pulling your R&D team into cold sales.",
    images: [
      {
        url: `${siteUrl}/og-book-a-call.png`,
        width: 1200,
        height: 630,
        alt: "Book a 15-Min Strategy Call — Autoikigai",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a 15-Min Strategy Call | Autoikigai",
    description:
      "15-minute strategy call for SBIR/STTR Phase I awardees & deep-tech founders. Secure Phase II LOIs without pulling your R&D team into cold sales.",
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
          Strategy Call
        </p>
        <h1
          className="text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.15] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to accelerate your Phase II commercialization metrics?
        </h1>
        <p
          className="text-sm leading-[1.7]"
          style={{ color: "var(--text-muted)" }}
        >
          15 minutes. We&apos;ll evaluate your target commercial vertical, Phase I timeline, and executive buyer persona to map out a turnkey outbound campaign.
        </p>
      </div>

      <CalEmbed />
    </section>
  );
}
