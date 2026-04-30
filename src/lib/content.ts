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
      "Setup starts at $2,000. Ongoing maintenance and optimization is a monthly retainer based on complexity. Book an audit and we'll give you exact pricing for your use case.",
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

// --- About / Founder Section ---
export const ABOUT = {
  founderName: "Laksh Pujary",
  role: "Founder",
  bio: "I build AI systems that replace repetitive work. Not demos, not decks — production systems that run 24/7. My own agency runs entirely on AI employees I built — from lead research to outreach to CRM updates to daily WhatsApp reports. I decided to build the same for other agencies. If your team is spending hours on work that follows a pattern, I can probably replace it with an AI that does it faster, cheaper, and at 3AM.",
  japaneseLine: "\u65E5\u672C\u8A9E\u5BFE\u5FDC\u53EF",
  builtWith: ["Supabase", "OpenAI", "n8n", "WhatsApp", "Gmail", "HubSpot", "Notion", "Slack"],
};

// --- Shared Links ---
export const BOOKING_URL =
  "https://calendly.com/laksh-autoikigai/30min";
