// ============================================================
// Centralized homepage content — Autoikigai
// Done-for-you B2B lead generation agency
// All text/data for homepage sections lives here.
// ============================================================

export interface MetricItem {
  value: string;
  label: string;
}

export const KEY_METRICS: MetricItem[] = [
  { value: "14", label: "Days to first emails" },
  { value: "0", label: "SDRs to hire" },
  { value: "Pay-per-meeting", label: "Pricing model" },
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
    id: "referrals",
    tag: "The Reality",
    title: "Referrals Have Run Dry",
    description: "Your network got you here, but it won't double your pipeline. Waiting for inbound leads means lumpy revenue and missed quarters.",
    icon: "Users",
  },
  {
    id: "hiring",
    tag: "The Cost",
    title: "Hiring an SDR Is a Gamble",
    description: "$60k+ per year, 3-6 months to ramp, and no guarantee they'll book a single meeting. Most founders can't afford that risk.",
    icon: "DollarSign",
  },
  {
    id: "diy",
    tag: "The Trap",
    title: "DIY Cold Email Backfires",
    description: "You tried it yourself. Your main domain got flagged, replies went to spam, and you burned hours that should've gone to clients.",
    icon: "AlertTriangle",
  },
];

export interface BuildItem {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const HOW_IT_WORKS: BuildItem[] = [
  {
    step: "01",
    title: "Pipeline Audit",
    description: "We review your current offer, buyers, and sales process to find what's working and what's missing.",
    deliverables: ["Offer review", "Buyer analysis", "Process gaps"],
    icon: "Search",
  },
  {
    step: "02",
    title: "ICP & Offer",
    description: "We build your target list and sharpen your offer until it's hard to ignore.",
    deliverables: ["Target company list", "Buyer personas", "Offer positioning"],
    icon: "Target",
  },
  {
    step: "03",
    title: "Infrastructure",
    description: "Separate sending domains with SPF/DKIM/DMARC and proper warmup. Your main domain stays untouched.",
    deliverables: ["Sending domains", "DNS authentication", "Inbox warmup"],
    icon: "Shield",
  },
  {
    step: "04",
    title: "Messaging",
    description: "We write the sequences and A/B test them. One email, one idea. No fluff.",
    deliverables: ["Cold email sequences", "LinkedIn messages", "A/B testing"],
    icon: "FileText",
  },
  {
    step: "05",
    title: "Launch & Booking",
    description: "Replies handled within hours. Qualified prospects booked onto your calendar.",
    deliverables: ["Reply management", "Lead qualification", "Calendar bookings"],
    icon: "Calendar",
  },
];

// Legacy export for backward compatibility
export const WHAT_WE_BUILD = HOW_IT_WORKS;

export interface WhyPillar {
  icon: string;
  title: string;
  description: string;
}

export const WHY_AUTOIKIGAI: WhyPillar[] = [
  {
    icon: "Wallet",
    title: "Cheaper Than a Hire",
    description: "One fee covers everything: strategy, infrastructure, copywriting, and booking. No SDR salary, no tool stack, no data subscriptions.",
  },
  {
    icon: "Zap",
    title: "Fast Start",
    description: "First emails go out in 14 days. No 3-month ramp time. No training. No guesswork.",
  },
  {
    icon: "ShieldCheck",
    title: "Risk on Us",
    description: "You pay per qualified meeting. No meetings, no bill.",
  },
];

export interface Capability {
  icon: string;
  title: string;
  metric: string;
}

// Hidden for now - no client results yet
export const CAPABILITIES: Capability[] = [
  { icon: "Target", title: "Target Enrichment", metric: "Decision-maker contacts" },
  { icon: "Shield", title: "Domain Protection", metric: "Zero primary domain risk" },
  { icon: "FileText", title: "Copywriting", metric: "Tested sequences" },
  { icon: "Calendar", title: "Calendar Routing", metric: "Direct bookings" },
  { icon: "Mail", title: "DNS Setup", metric: "SPF / DKIM / DMARC" },
  { icon: "Database", title: "Pipeline Tracking", metric: "Full analytics" },
  { icon: "TrendingUp", title: "Reply Management", metric: "Same-day responses" },
  { icon: "Zap", title: "Fast Launch", metric: "14-day setup" },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Will this hurt my main email domain?",
    answer: "No. We set up separate sending domains with proper SPF, DKIM, and DMARC authentication. Your main domain is never used for cold outreach. If something goes wrong with a sending domain, your company email stays clean.",
  },
  {
    question: "How much of my time does this take?",
    answer: "About 2 hours upfront for the audit call and offer review. After that, you just show up to the meetings we book. We handle everything else: list building, infrastructure, copywriting, replies, and scheduling.",
  },
  {
    question: "What counts as a qualified meeting?",
    answer: "A decision-maker at a company matching your agreed ICP who shows up to the call. We define this together before we start. If they no-show or aren't a fit, it doesn't count.",
  },
  {
    question: "How fast will I see meetings?",
    answer: "First emails go out within 14 days of signing. Most clients see their first qualified meetings within 3-4 weeks. Results depend on your offer, ICP, and market.",
  },
  {
    question: "What if no meetings come in?",
    answer: "You pay per qualified meeting. No meetings, no bill. We only win when you win.",
  },
  {
    question: "Do you lock me into a contract?",
    answer: "The pilot runs month-to-month. You can stop anytime. We keep clients by getting results, not by locking them in.",
  },
];

export interface Founder {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  funFact: string | null;
  image: string | null;
  imageFallbackBubbles?: string[];
  stats: { value: string; label: string }[];
  socials?: { label: string; url: string }[];
}

export const FOUNDERS: Founder[] = [
  {
    name: "Laksh Pujary",
    role: "Founder",
    tagline: "Your Outbound Partner",
    bio: "I build and run cold outbound systems for B2B founders. I handle the infrastructure, copywriting, and lead qualification so you can focus on closing deals. I work with every client personally.",
    funFact: null,
    image: null,
    imageFallbackBubbles: [
      "Clay",
      "Instantly / Smartlead",
      "Apollo + n8n",
    ],
    stats: [
      { value: "14", label: "Days to launch" },
      { value: "1:1", label: "Client work" },
    ],
    socials: [
      { label: "GitHub", url: "https://github.com/lakshcode9" },
      { label: "Instagram", url: "https://instagram.com/lakshbuilds" },
    ],
  },
];

export const ABOUT = {
  builtWith: ["Clay", "Instantly", "Smartlead", "Apollo", "n8n"],
};

export const CAL_LINK = "laksh-autoikigai/autoikigai-application";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
export const PLAYBOOKS_URL = "https://resources.autoikigai.space";
export const BOOKING_URL = "/book-a-call";

// Guarantee text - used in Hero and CTA for consistency
export const GUARANTEE_TEXT = "You pay per qualified meeting. No meetings, no bill.";
