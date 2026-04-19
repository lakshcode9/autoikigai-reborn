// ============================================================
// Centralized homepage content — Autoikigai (Crator-style layout)
// All text/data for homepage sections lives here.
// ============================================================

// --- Services Section (Crator's Audit/Build/Run → Autoikigai's process) ---
export interface Service {
  phase: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    phase: "Week 1",
    title: "Audit & Discovery",
    description:
      "We plug into your CRM, map your dead lead graveyard, and identify the highest-value reactivation opportunities. You get a clear action plan: which leads to hit first, which channels to use, and projected ROI.",
  },
  {
    phase: "Week 2–3",
    title: "Build & Configure",
    description:
      "We build your AI reactivation system — custom SMS sequences, AI voice agents, email drips — all wired into your existing CRM. Configured for your specific niche, tone, and compliance requirements.",
  },
  {
    phase: "Ongoing",
    title: "Deploy & Optimize",
    description:
      "We launch, monitor, and continuously optimize. If response rates dip, we adjust. If a sequence outperforms, we scale it. You get weekly reports and booked appointments — not a handoff.",
  },
];

// --- FAQ Section ---
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is Autoikigai and what do you do?",
    answer:
      "We're an AI-powered client reactivation agency. We deploy AI voice and SMS agents that contact your old, dead, or lapsed leads and book them directly onto your calendar — generating revenue from contacts you thought were lost.",
  },
  {
    question: "How is this different from hiring more sales reps?",
    answer:
      "An AI agent can contact 500 leads in the time it takes a human to call 20. It never gets tired, never forgets to follow up, and works 24/7. You get the output of a 50-person sales team for a fraction of the cost.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We specialize in high-ticket local service businesses: commercial paving, fire & security, janitorial services, arborists/tree care, and sleep apnea clinics. Our sequences and AI agents are fine-tuned for each niche.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Setup starts at $2,000 which covers AI agent build, sequence configuration, and CRM integration. Ongoing costs are based on performance — you only pay for leads that actually book appointments.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most clients see their first booked appointments within the first week of deployment. Full campaign results (response rates, ROI metrics) stabilize within 30 days.",
  },
  {
    question: "Do I need to change my CRM?",
    answer:
      "No. We integrate with your existing systems — whether that's a spreadsheet, HubSpot, GHL, or any CRM with an API. We plug in, we don't rip and replace.",
  },
  {
    question: "What happens after the setup?",
    answer:
      "We provide ongoing management, monitoring, and optimization. You receive weekly performance reports and we continuously tune sequences based on response data. We're not a build-and-bounce shop.",
  },
];

// --- Trusted-by / social proof (Autoikigai's client companies) ---
export interface TrustedCompany {
  name: string;
  logo: string | null;
}

export const TRUSTED_BY: TrustedCompany[] = [
  { name: "Connect Group", logo: null },
  { name: "Crawford Thomas", logo: null },
  { name: "Vention", logo: null },
  { name: "ForPlayers", logo: null },
  { name: "HelpCare AI", logo: null },
  { name: "FabuLingua", logo: null },
];

// --- About / Founder Section ---
export const ABOUT = {
  founderName: "Laksh",
  role: "Founder",
  bio: "I build autonomous AI systems for businesses that are tired of losing money to human limitations. Former software architect turned agency founder. I've helped companies generate over $500K+ in recovered revenue using AI agents that never sleep, never forget, and never give up on a lead.",
  builtWith: ["Supabase", "OpenAI", "n8n", "Twilio"],
};

// --- Shared Links ---
export const BOOKING_URL =
  "https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses";
