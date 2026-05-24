import type { Metadata } from "next";
import { CalEmbed } from "@/components/ui/CalEmbed";

const siteUrl = "https://autoikigai.space";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Schedule a 30-minute strategy call with Autoikigai. We'll look at your agency's workflows, identify what can be automated, and map out the next steps.",
  alternates: {
    canonical: `${siteUrl}/book-a-call`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/book-a-call`,
    siteName: "Autoikigai",
    title: "Book a Strategy Call | Autoikigai",
    description:
      "30-minute strategy call for independent insurance agency owners. We'll audit your workflows and show you what AI-native systems can do for your agency.",
    images: [
      {
        url: `${siteUrl}/og-book-a-call.png`,
        width: 1200,
        height: 630,
        alt: "Book a Strategy Call — Autoikigai",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Strategy Call | Autoikigai",
    description:
      "30-minute strategy call for independent insurance agency owners. We'll audit your workflows and show you what AI-native systems can do for your agency.",
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
          className="text-[clamp(1.5rem,5vw,2rem)] leading-[1.15] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Let&apos;s look at your workflows.
        </h1>
        <p
          className="text-sm leading-[1.7]"
          style={{ color: "var(--text-muted)" }}
        >
          30 minutes. We&apos;ll walk through what your team spends time on,
          identify what can run on autopilot, and map out next steps. No pitch
          deck, no fluff.
        </p>
      </div>

      <CalEmbed />
    </section>
  );
}
