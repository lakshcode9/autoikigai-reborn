// ============================================================
// Centralized homepage content — Autoikigai (AI Employees for Insurance Agencies)
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
    title: "Agency Audit",
    shortDesc: "We map every workflow bleeding time.",
    deliverables: ["Renewal process audit", "CSR task analysis", "AMS integration scope"],
    icon: "Search",
  },
  {
    phase: "Week 2-3",
    step: "02",
    title: "Build & Integrate",
    shortDesc: "We build AI employees for your agency.",
    deliverables: ["Applied Epic / AMS360 / HawkSoft integration", "Automated renewal workflows", "Custom email & SMS sequences"],
    icon: "Code",
  },
  {
    phase: "Ongoing",
    step: "03",
    title: "Monitor & Optimize",
    shortDesc: "We keep your retention rate climbing.",
    deliverables: ["Daily performance reports", "Lapse prevention monitoring", "Quarterly workflow optimization"],
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
  { icon: "RefreshCw", title: "Renewal Automation", metric: "90-day touchpoint sequences" },
  { icon: "Shield", title: "Lapse Prevention", metric: "Catch cancellations before they happen" },
  { icon: "Users", title: "CSR Task Automation", metric: "Certs, endorsements, ID cards" },
  { icon: "UserPlus", title: "New Business Intake", metric: "ACORD pre-fill from web forms" },
  { icon: "Mail", title: "Client Communication", metric: "Email + SMS on autopilot" },
  { icon: "Database", title: "AMS Updates", metric: "Zero manual data entry" },
  { icon: "TrendingUp", title: "Cross-Sell Detection", metric: "Find gaps in coverage" },
  { icon: "Zap", title: "Claims Follow-Up", metric: "Automated status updates to clients" },
];

// --- FAQ Section ---
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does Autoikigai do for insurance agencies?",
    answer:
      "We build AI employees that handle the repetitive work in your agency: renewal follow-ups, CSR tasks like certificates and endorsements, new business intake, lapse prevention, and cross-sell detection. They integrate directly with your AMS and run 24/7.",
  },
  {
    question: "Which AMS systems do you integrate with?",
    answer:
      "Applied Epic, AMS360 (Vertafore), HawkSoft, EZLynx, and QQCatalyst. If your AMS has an API or supports CSV exports, we can work with it. We also integrate with comparative raters and carrier portals.",
  },
  {
    question: "How is this different from hiring another CSR?",
    answer:
      "A CSR costs $45K-$65K/year, needs training, takes PTO, and handles maybe 200 policies. An AI employee costs a fraction, works 24/7, handles thousands of policies simultaneously, and never forgets a renewal follow-up.",
  },
  {
    question: "What size agencies do you work with?",
    answer:
      "Independent agencies writing $1M-$10M in premium. Whether you have 3 people or 30, if your CSRs are drowning in repetitive tasks and your retention rate is under 92%, we can help.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Engagements start at $15,000 for a core workflow like renewal automation. Full agency buildouts with multiple AI employees range from $15,000 to $30,000+. Ongoing maintenance and optimization included.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Your first AI employee is live within 2-3 weeks. Most agencies see renewal touch rates jump from under 40% to over 90% in the first month. CSR time freed up within the first week.",
  },
  {
    question: "What happens during a carrier download or IVANS feed?",
    answer:
      "We integrate with your existing IVANS feeds and carrier downloads. Policy data flows into the AI employee automatically, triggering the right workflows without manual intervention.",
  },
  {
    question: "Will this work with my E&O compliance requirements?",
    answer:
      "Yes. Every automated touchpoint is logged with timestamps, creating a complete audit trail. We actually reduce E&O exposure by ensuring no renewal or follow-up is ever missed.",
  },
];

// --- About / Founders Section ---
export interface Founder {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  funFact: string;
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
    bio: "Self-taught AI engineer. College dropout. Builds production AI that runs 24/7 in insurance agencies. From renewal automation to lapse prevention to AMS integration. If your CSRs are doing repetitive work, he has already figured out how to automate it. His systems currently process thousands of policy touchpoints without human intervention.",
    funFact: "Mass-deploys AI agents the way normal people order coffee.",
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
    bio: "The guy who makes sure the right agencies find us and that we deliver what we promise. Stefan handles strategy, agency partnerships, and client relationships. He is the reason the business side runs as smooth as the AI side. Also unreasonably jacked for someone who spends half his day on Zoom calls with agency principals.",
    funFact: "Has never lost an arm wrestle. Business meetings included.",
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
  builtWith: ["Applied Epic", "AMS360", "HawkSoft", "EZLynx", "n8n", "OpenAI", "Supabase", "Twilio"],
};

// --- Shared Links ---
export const BOOKING_URL =
  "https://calendly.com/laksh-autoikigai/30min";
