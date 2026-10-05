// ============================================================
// Centralized homepage content — Autoikigai (Automated B2B Outbound Engines)
// For SBIR/STTR Phase I Awardees & Deep-Tech Founders
// All text/data for homepage sections lives here.
// ============================================================

export interface MetricItem {
  value: string;
  label: string;
}

export const KEY_METRICS: MetricItem[] = [
  { value: "15–30", label: "Qualified Discovery Calls per Campaign" },
  { value: "4-Week", label: "Turnkey Setup" },
  { value: "$0", label: "Internal Sales Headcount" },
];

export interface ProblemCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
}

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    id: "mandate",
    tag: "The Mandate",
    title: "Commercialization Proof Mandate",
    description: "Phase II grants ($1M+) mandate proven commercial traction and enterprise Letters of Intent (LOIs).",
    icon: "FileText",
  },
  {
    id: "gap",
    tag: "The Gap",
    title: "Lack of Outbound Infrastructure",
    description: "Scientists and engineers excel at R&D, but lack cold outbound infrastructure, domain warmups, and sales tracking.",
    icon: "AlertTriangle",
  },
  {
    id: "drain",
    tag: "The Drain",
    title: "Core R&D Milestones Distracted",
    description: "Running manual cold outreach distracts core technical leads from meeting critical Phase I R&D milestones.",
    icon: "Clock",
  },
];

export interface BuildItem {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const WHAT_WE_BUILD: BuildItem[] = [
  {
    step: "01",
    title: "Target Scraping",
    description: "We pull and enrich direct contacts for VP/Director-level buyers in your target commercial vertical.",
    deliverables: ["VP/Director Contacts", "Target Commercial Vertical", "Verified Emails & Direct Lines"],
    icon: "Search",
  },
  {
    step: "02",
    title: "Outbound Infrastructure",
    description: "Dedicated secondary domains, SPF/DKIM/DMARC authentication, and multi-channel warmup pipelines (zero risk to your primary domain).",
    deliverables: ["Secondary Domains", "SPF / DKIM / DMARC Setup", "Warmup Pipelines"],
    icon: "Shield",
  },
  {
    step: "03",
    title: "Technical-to-Executive Copywriting",
    description: "Outreach messaging translated from complex tech specs into executive value propositions.",
    deliverables: ["Tech-to-Exec Translation", "Pain-Point Positioning", "High-Response Messaging"],
    icon: "FileCode",
  },
  {
    step: "04",
    title: "Automated Calendar Routing",
    description: "Qualified corporate decision-makers book directly onto your calendar for customer discovery and pilot discussions.",
    deliverables: ["Direct Calendar Sync", "Corporate Decision-Makers", "Discovery & Pilot Hand-off"],
    icon: "Calendar",
  },
];

export interface Capability {
  icon: string;
  title: string;
  metric: string;
}

export const CAPABILITIES: Capability[] = [
  { icon: "Target", title: "Target Enrichment", metric: "VP/Director-level buyers" },
  { icon: "Shield", title: "Outbound Infrastructure", metric: "Zero primary domain risk" },
  { icon: "FileText", title: "Tech-to-Exec Copywriting", metric: "Specs to value propositions" },
  { icon: "Calendar", title: "Calendar Routing", metric: "Direct customer discovery calls" },
  { icon: "Mail", title: "Domain Authentication", metric: "SPF / DKIM / DMARC setup" },
  { icon: "Database", title: "Pipeline Tracking", metric: "Full discovery analytics" },
  { icon: "TrendingUp", title: "Phase II LOI Acceleration", metric: "15–30 calls in 30 days" },
  { icon: "Zap", title: "Turnkey Outbound", metric: "4-Week setup" },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does Autoikigai help SBIR/STTR Phase I awardees?",
    answer:
      "Phase II grants ($1M+) mandate proven commercial traction and enterprise Letters of Intent (LOIs). We build automated B2B outbound engines that target, engage, and book 15–30 enterprise customer discovery interviews with industry decision-makers in 30 days, helping you secure your LOIs without pulling your R&D team into cold sales.",
  },
  {
    question: "Will outbound outreach put our primary corporate domain at risk?",
    answer:
      "No. We set up dedicated secondary domains, complete with SPF/DKIM/DMARC authentication and multi-channel warmup pipelines. Your primary domain remains 100% isolated and protected.",
  },
  {
    question: "How do you handle messaging for complex or deep-tech products?",
    answer:
      "We specialize in technical-to-executive copywriting. We translate complex engineering specs, scientific breakthroughs, and technical architectures into clear, compelling executive value propositions that resonate with corporate buyers.",
  },
  {
    question: "How much effort is required from our R&D team?",
    answer:
      "Zero sales workload for your technical leads. We handle prospect scraping, infrastructure setup, copywriting, and warmup. Qualified corporate executives book directly onto your calendar, so your team only spends time on the actual discovery calls.",
  },
  {
    question: "How fast is the deployment process?",
    answer:
      "Our turnkey setup takes 4 weeks. Your campaign goes live within 30 days, filling your calendar with corporate decision-makers for customer discovery and Phase II LOI discussions.",
  },
  {
    question: "What happens during the 15-Minute Strategy Call?",
    answer:
      "We review your target commercial vertical, Phase I timeline, and Phase II LOI goals, then outline an automated outbound blueprint tailored specifically for your deep-tech technology.",
  },
];

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
    role: "Founder & Systems Architect",
    tagline: "The Brain",
    bio: "Self-taught AI engineer. Architect of high-deliverability outbound engines, automated contact enrichment pipelines, and tech-to-exec messaging models. Keeps technical teams focused on R&D while automated systems handle cold outreach at enterprise scale.",
    funFact: "Mass-deploys outbound infrastructure and AI agents faster than ordering coffee.",
    image: null,
    imageFallbackBubbles: [
      "Not photogenic",
      "Building outbound pipelines",
      "日本語対応可",
    ],
    stats: [
      { value: "99%+", label: "Deliverability" },
      { value: "30 Days", label: "Discovery Calls" },
      { value: "3AM", label: "Engine deploys" },
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/lakshcode9" },
      { label: "Instagram", url: "https://instagram.com/lakshbuilds" },
    ],
  },
];

export const ABOUT = {
  builtWith: ["Clay", "Instantly", "Smartlead", "Apollo", "n8n", "OpenAI", "Supabase", "Cal.com"],
};

export const CAL_LINK =
  "laksh-autoikigai/sbir-phase-audit-discovery-call-autoikigai";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const PLAYBOOKS_URL = "https://resources.autoikigai.space";
export const BOOKING_URL = "/book-a-call";
