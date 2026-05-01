// ============================================================
// Centralized homepage content — Autoikigai (AI Employees for Agencies)
// All text/data for homepage sections lives here.
// ============================================================

// --- Services Section ---
export interface Service {
  phase: string;
  step: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  icon: string; // lucide icon name
}

export const SERVICES: Service[] = [
  {
    phase: "Week 1",
    step: "01",
    title: "Audit & Map",
    shortDesc: "We find what to automate.",
    deliverables: ["Task audit", "ROI projection", "System blueprint"],
    icon: "Search",
  },
  {
    phase: "Week 2-3",
    step: "02",
    title: "Build & Deploy",
    shortDesc: "We build your AI employee.",
    deliverables: ["Custom workflows", "Tool integrations", "Your tone & process"],
    icon: "Code",
  },
  {
    phase: "Ongoing",
    step: "03",
    title: "Monitor & Optimize",
    shortDesc: "We keep it running.",
    deliverables: ["Daily reports", "Proactive fixes", "Performance tuning"],
    icon: "RefreshCw",
  },
];

// --- Capabilities ---
export interface Capability {
  icon: string; // lucide icon name
  title: string;
  metric: string;
}

export const CAPABILITIES: Capability[] = [
  { icon: "Users", title: "Lead Research", metric: "50+ leads/day" },
  { icon: "Mail", title: "Cold Outreach", metric: "Personalized at scale" },
  { icon: "Repeat", title: "Follow-ups", metric: "5-7x auto sequences" },
  { icon: "Database", title: "CRM Updates", metric: "Zero manual entry" },
  { icon: "MessageCircle", title: "WhatsApp Reports", metric: "Daily at 8AM" },
  { icon: "UserPlus", title: "Client Onboarding", metric: "Fully automated" },
  { icon: "Inbox", title: "Inbox Monitoring", metric: "Drafts replies for you" },
  { icon: "Zap", title: "Custom Workflows", metric: "Built for your stack" },
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
