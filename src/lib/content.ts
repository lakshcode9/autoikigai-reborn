// ============================================================
// Centralized homepage content — Autoikigai (AI Employees for Agencies)
// All text/data for homepage sections lives here.
// ============================================================

// --- Services Section ---
export interface Service {
  phase: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    phase: "Week 1",
    title: "Audit & Map",
    description:
      "We look at your team's daily work and find the tasks AI can handle — outreach, follow-ups, lead research, CRM updates, client onboarding, reporting. You get a clear plan: what to automate first, projected time saved, and ROI.",
  },
  {
    phase: "Week 2-3",
    title: "Build & Deploy",
    description:
      "We build your AI employee — custom workflows wired into your existing tools (HubSpot, Notion, Slack, Gmail, WhatsApp). Configured for your niche, your tone, your process. Not a template. A system built for how your agency actually works.",
  },
  {
    phase: "Ongoing",
    title: "Monitor & Optimize",
    description:
      "Your AI employee reports to you every morning. We monitor performance, fix what breaks, and improve what's working. You get results, not a handoff.",
  },
];

// --- Use Cases ---
export const USE_CASES: string[] = [
  "Research 50 leads per day and enrich them with company data, tech stack, and contact info",
  "Write personalized cold emails that don't sound like a robot wrote them",
  "Follow up with every lead 5-7 times without you remembering to",
  "Update your CRM automatically after every interaction",
  "Send you a WhatsApp report every morning with what happened overnight",
  "Onboard new clients with automated welcome sequences and doc collection",
  "Monitor your inbox and draft replies for your review",
];

// --- FAQ Section ---
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Autoikigai?",
    answer:
      "We build AI employees for agencies. Systems that handle your team's repetitive work — outreach, follow-ups, onboarding, reporting — so you can scale without hiring.",
  },
  {
    question: "How is this different from hiring someone?",
    answer:
      "An AI employee costs a fraction of a hire, works 24/7, never quits, and is deployed in 2-3 weeks. No recruiting, no onboarding, no management overhead.",
  },
  {
    question: "What kind of agencies do you work with?",
    answer:
      "Primarily agencies doing $500K-$5M/year — marketing, recruiting, consulting, real estate, staffing. If your team does repetitive work that follows a pattern, we can automate it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The AI Employee Blueprint is $5,000 — a one-week deep dive into your operations with a fully scoped system design. If you move forward, it's credited toward the build. Implementation starts at $5,000+ depending on complexity, with ongoing maintenance as a monthly retainer.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Your AI employee is live within 2-3 weeks. Most agencies see measurable time savings in the first week of deployment.",
  },
  {
    question: "Do I need to change my tools?",
    answer:
      "No. We plug into whatever you already use — HubSpot, Notion, Slack, Gmail, Google Sheets, Airtable, WhatsApp. No migration required.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "We monitor your AI employee and fix issues proactively. You also get a direct WhatsApp line to us for anything urgent.",
  },
];

// --- About / Founders Section ---
export interface Founder {
  name: string;
  role: string;
  tagline: string;
  oneLiner: string;
  image: string | null;
  imageFallbackBubbles?: string[];
  stats: { value: string; label: string }[];
  socials?: { label: string; url: string }[];
}

export const FOUNDERS: Founder[] = [
  {
    name: "Laksh Pujary",
    role: "Co-Founder",
    tagline: "The Brain",
    oneLiner: "Builds AI that works at 3AM so you don't have to.",
    image: null,
    imageFallbackBubbles: [
      "Not photogenic",
      "The AI refused to generate my face",
      "日本語対応可",
    ],
    stats: [
      { value: "24/7", label: "Systems uptime" },
      { value: "0", label: "Demos without code" },
      { value: "3AM", label: "Deploys happen" },
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/lakshcode9" },
      { label: "Instagram", url: "https://instagram.com/lakshbuilds" },
    ],
  },
  {
    name: "Stefan Skarevski",
    role: "Co-Founder",
    tagline: "The Business",
    oneLiner: "Strategy, partnerships, and making sure we deliver.",
    image: "/skarevskiofficial_3687604576832686549_73724088050_1_2025-07-29.jpg",
    stats: [
      { value: "100%", label: "Client retention" },
      { value: "0", label: "Arm wrestles lost" },
      { value: "∞", label: "Zoom calls survived" },
    ],
    socials: [
      { label: "Instagram", url: "https://instagram.com/skarevskiofficial" },
    ],
  },
];

export const ABOUT = {
  builtWith: ["Supabase", "OpenAI", "n8n", "WhatsApp", "Gmail", "HubSpot", "Notion", "Slack"],
};

// --- Shared Links ---
export const BOOKING_URL =
  "https://calendly.com/laksh-autoikigai/30min";
