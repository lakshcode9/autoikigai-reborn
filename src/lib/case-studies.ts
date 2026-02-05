export interface CaseStudy {
  id: string;
  company: string;
  metric: string;
  description: string;
  tags: string[];
  // Extended fields for detailed pages
  industry: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: {
    primary: string;
    secondary: string[];
  };
  technologies: string[];
  keyFeatures: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "connect-group",
    company: "Connect Group",
    metric: "+$105K Revenue",
    description: "Scaled AI talent placements by implementing an intelligent lead generation automation that targeted specific AI-focused companies.",
    tags: ["Recruitment", "Automation", "Lead Gen"],
    industry: "AI Recruitment",
    timeline: "3 months",
    challenge: "Connect Group struggled to identify and engage high-value AI companies at scale. Manual prospecting was time-intensive and inconsistent.",
    solution: "Built an autonomous AI agent network that researches companies, identifies decision-makers, personalizes outreach, and manages the entire pipeline end-to-end.",
    results: {
      primary: "+$105K Revenue Generated",
      secondary: [
        "300+ qualified leads per month",
        "45% response rate on cold outreach",
        "90% reduction in manual prospecting time",
        "4 major enterprise clients closed"
      ]
    },
    technologies: ["Python", "OpenAI GPT-4", "Scrapy", "PostgreSQL", "n8n"],
    keyFeatures: [
      "Intelligent company scoring algorithm",
      "Automated LinkedIn & email outreach",
      "Self-healing CRM integration",
      "Real-time pipeline analytics"
    ],
    testimonial: {
      quote: "Autoikigai built us a system that literally runs our prospecting on autopilot. We've scaled faster than we thought possible.",
      author: "Aidan Brady",
      role: "Managing Director, Connect Group"
    }
  },
  {
    id: "crawford-thomas",
    company: "Crawford Thomas",
    metric: "+$100K Revenue",
    description: "Deployed automated outreach systems to streamline candidate sourcing and client acquisition for a major staffing firm.",
    tags: ["Staffing", "Outreach", "Systems"],
    industry: "Healthcare Staffing",
    timeline: "4 months",
    challenge: "Crawford Thomas needed to fill 100+ healthcare positions monthly but lacked the infrastructure to source and engage candidates at scale.",
    solution: "Engineered a multi-channel outreach automation with intelligent candidate matching, automated interview scheduling, and compliance tracking.",
    results: {
      primary: "+$100K Revenue Generated",
      secondary: [
        "2,500+ candidates engaged monthly",
        "60% faster time-to-fill",
        "98% compliance accuracy",
        "40% increase in placement fees"
      ]
    },
    technologies: ["TypeScript", "Node.js", "Anthropic Claude", "Airtable", "Twilio"],
    keyFeatures: [
      "AI-powered candidate matching",
      "Automated compliance verification",
      "Multi-channel outreach (email, SMS, phone)",
      "Real-time availability tracking"
    ],
    testimonial: {
      quote: "The system they built handles what used to take 3 full-time recruiters. Our margins have never been better.",
      author: "William Stonehouse",
      role: "President, Crawford Thomas"
    }
  },
  {
    id: "vention",
    company: "Vention",
    metric: "$85K Generated",
    description: "Engineered a custom sales pipeline automation that identified and engaged high-value enterprise prospects.",
    tags: ["SaaS", "Enterprise Sales", "AI Agents"],
    industry: "Manufacturing SaaS",
    timeline: "2 months",
    challenge: "Vention's sales team spent 70% of their time on manual research and qualification, leaving little time for actual selling.",
    solution: "Deployed an AI-powered research agent that identifies target accounts, enriches contact data, personalizes outreach, and auto-qualifies leads based on behavioral signals.",
    results: {
      primary: "$85K in Pipeline Generated",
      secondary: [
        "125 qualified enterprise demos booked",
        "80% reduction in research time",
        "3X increase in sales team productivity",
        "22% demo-to-close rate"
      ]
    },
    technologies: ["Python", "OpenAI", "HubSpot API", "AWS Lambda", "Postgres"],
    keyFeatures: [
      "Technographic data enrichment",
      "Intent signal detection",
      "Automated meeting scheduling",
      "CRM auto-sync"
    ],
    testimonial: {
        quote: "Our sales team can finally focus on closing. The AI agent handles all the heavy lifting of finding and qualifying leads.",
        author: "Etienne Lacroix",
        role: "Founder & CEO, Vention"
    }
  },
  {
    id: "forplayers",
    company: "ForPlayers",
    metric: "€70,000 Revenue",
    description: "Automated partner acquisition workflows, reducing manual outreach time by 90% while increasing deal flow.",
    tags: ["Gaming", "Partnerships", "Workflow"],
    industry: "Gaming & Esports",
    timeline: "3 months",
    challenge: "ForPlayers needed to onboard 50+ new gaming influencers and brands monthly but had a tiny BD team.",
    solution: "Built an automated partnership pipeline that sources creators, verifies audience quality, initiates contact, and manages negotiations through AI-assisted workflows.",
    results: {
      primary: "€70,000 Revenue Generated",
      secondary: [
        "180+ new partnerships secured",
        "90% reduction in outreach time",
        "5X faster onboarding cycle",
        "40% better retention rates"
      ]
    },
    technologies: ["TypeScript", "Next.js", "OpenAI", "Notion API", "Stripe"],
    keyFeatures: [
      "Influencer audience verification",
      "Automated contract generation",
      "Payment automation",
      "Performance tracking dashboard"
    ],
    testimonial: {
        quote: "We're onboarding partners 5x faster with a fraction of the manual work. The automated workflows are a game changer.",
        author: "David Gerczak",
        role: "Co-Founder, ForPlayers"
    }
  },
  {
    id: "helpcare",
    company: "HelpCare AI",
    metric: "4 Enterprise Clients",
    description: "Built a self-healing lead database and outreach system to break into the healthcare AI market.",
    tags: ["Healthcare", "B2B", "Database"],
    industry: "Healthcare AI",
    timeline: "5 months",
    challenge: "HelpCare AI struggled to penetrate the highly regulated healthcare market and needed a compliant, scalable outreach system.",
    solution: "Architected a HIPAA-compliant lead management system with automated data enrichment, compliance checks, and multi-stakeholder outreach workflows.",
    results: {
      primary: "4 Major Hospital Systems Onboarded",
      secondary: [
        "$2.4M in ARR pipeline",
        "100% HIPAA compliance maintained",
        "85% database accuracy",
        "60-day average sales cycle"
      ]
    },
    technologies: ["Python", "FastAPI", "Anthropic", "AWS", "MongoDB"],
    keyFeatures: [
      "HIPAA-compliant architecture",
      "Multi-stakeholder workflow routing",
      "Automated compliance documentation",
      "Real-time data validation"
    ],
    testimonial: {
        quote: "Breaking into healthcare is tough, but this system gave us the precision and compliance we needed to close major hospital systems.",
        author: "Huzaifa Sial",
        role: "Founder & CEO, HelpCare AI"
    }
  },
  {
    id: "fabulingua",
    company: "FabuLingua",
    metric: "5 Strategic Clients",
    description: "Created an autonomous agent network to identify educational partners and initiate rigorous qualification protocols.",
    tags: ["EdTech", "Agents", "Qualification"],
    industry: "Language Learning",
    timeline: "4 months",
    challenge: "FabuLingua needed to partner with international schools and universities but lacked the resources to manually vet and onboard them.",
    solution: "Developed an AI agent network that researches institutions, verifies accreditation, initiates contact with decision-makers, and manages the entire partnership lifecycle.",
    results: {
      primary: "5 Major University Partnerships",
      secondary: [
        "12,000+ new users from partnerships",
        "75% faster partnership cycle",
        "95% qualification accuracy",
        "$180K in partnership revenue"
      ]
    },
    technologies: ["Python", "LangChain", "Supabase", "Sendgrid", "Airtable"],
    keyFeatures: [
      "Accreditation verification AI",
      "Multi-language outreach",
      "Partnership agreement automation",
      "Stakeholder communication hub"
    ],
    testimonial: {
        quote: "Our partnership network exploded in growth without adding a single headcount. The AI agents are incredibly effective.",
        author: "Mark Begert",
        role: "CEO, FabuLingua"
    }
  }
];

