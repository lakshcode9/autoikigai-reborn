"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Flame,
  Building2,
  Trees,
  Stethoscope,
  Droplets,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/content";

const CASE_STUDIES = [
  {
    sector: "Healthcare / DME (Sleep Clinics)",
    company: "Industry AI Benchmark",
    result: "$40M+ Recovered",
    metric: "262X ROI",
    body: "A major provider recovered over $40 million in additional revenue in just 5 months by deploying AI voice agents to handle thousands of patient re-orders and dormant check-ins simultaneously.",
    quote:
      "The AI handles everything from outbound reactivation to inbound scheduling. It's like having a 1,000-person sales team that never sleeps.",
  },
  {
    sector: "Commercial Property Services",
    company: "Industry AI Benchmark",
    result: "7.0X ROI Improvement",
    metric: "26% Conv Rate",
    body: "Lead-to-meeting conversion rates jumped from 18% to 26% almost overnight for a property maintenance leader. Response times dropped to under 60 seconds across all unclosed estimates.",
    quote:
      "We're closing more commercial contracts with zero extra human effort. The AI reacts faster than any human possibly could.",
  },
  {
    sector: "Contractor / Arborists",
    company: "Industry AI Benchmark",
    result: "60% Conversion Lift",
    metric: "5X Cost Reduction",
    body: "By automating follow-ups for 'dead' tree-care and paving quotes, contractors saw a 60% improvement in conversion rates while reducing cost-per-appointment by 80%.",
    quote:
      "We're booking jobs from leads we thought were lost months ago. The system just doesn't quit until the decision is made.",
  },
  {
    sector: "Commercial Fire & Security",
    company: "Industry AI Benchmark",
    result: "105% of Sales Goal",
    metric: "35% Closure Lift",
    body: "Systems specialists hit 105% of their revenue recovery goals within 6 months of deploying AI agents specifically to follow up on inspection renewals and security site audits.",
    quote:
      "Recovering just one high-ticket enterprise security contract pays for this system 10x over. It's the highest leverage move we've made.",
  },
];

const NICHES = [
  {
    title: "Commercial Paving",
    icon: Building2,
    desc: "Reactivate $50k+ dead parking lot estimates from HOAs.",
  },
  {
    title: "Fire & Security",
    icon: Flame,
    desc: "Automate follow-ups for lapsed annual commercial fire inspections.",
  },
  {
    title: "Commercial Janitorial",
    icon: Droplets,
    desc: "Call office managers 6 months after a lost bid to steal the contract.",
  },
  {
    title: "Arborists & Tree Care",
    icon: Trees,
    desc: "SMS unclosed 'dead-tree' quotes right before storm season hits.",
  },
  {
    title: "Sleep Apnea Clinics",
    icon: Stethoscope,
    desc: "Automate CPAP supply insurance re-orders for past patients.",
  },
];

export default function ReactivationPage() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="section flex flex-col justify-center min-h-[60vh]"
        style={{ background: "var(--bg-primary)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="section-label mb-6">The New Standard in Follow-Up</p>

          <h1
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            We turn dead leads into{" "}
            <span className="text-accent">revenue.</span>
          </h1>

          <p
            className="text-sm md:text-[1rem] max-w-xl mb-10 leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            Your CRM is a graveyard of unclosed estimates and lapsed returning
            clients. Our AI Voice & SMS agents run 24/7 to wake them up and
            book them straight to your calendar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book system deployment
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a href="#case-studies" className="btn-secondary">
              View industry results
              <ArrowDown className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── CASE STUDIES ─── */}
      <section id="case-studies" className="section">
        <p className="section-label">Industry Benchmarks</p>
        <h2
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-12"
          style={{ color: "var(--text-primary)" }}
        >
          They stopped guessing.
        </h2>

        <div className="space-y-0">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 py-10"
              style={{ borderBottom: "1px dashed var(--border-default)" }}
            >
              {/* Left — Metric + Sector */}
              <div>
                <span className="code-tag mb-3 inline-block">
                  {study.sector}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {study.result}
                </h3>
                <p className="step-number">{study.metric}</p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {study.company}
                </p>
              </div>

              {/* Right — Body + Quote */}
              <div>
                <p
                  className="text-[0.8125rem] leading-[1.7] mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {study.body}
                </p>
                <blockquote
                  className="text-[0.8125rem] leading-[1.7] italic pl-4"
                  style={{
                    borderLeft: "2px solid var(--accent-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  &ldquo;{study.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PROBLEM / SOLUTION ─── */}
      <section className="section">
        <div
          className="grid-bordered"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Problem */}
          <div className="grid-cell">
            <p className="section-label">The Problem</p>
            <h3
              className="text-xl md:text-2xl font-medium tracking-[-0.02em] mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The Bleeding
            </h3>
            <p
              className="text-[0.8125rem] leading-[1.7] mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              High-ticket service businesses lose millions every year because
              humans simply cannot follow up 30 times with a 2-year-old lead
              without giving up.
            </p>
            <ul className="space-y-3">
              {[
                "Property managers who ghosted your paving quote 18 months ago.",
                "Offices that missed their annual fire inspection renewal.",
                "CPAP patients who never reordered their supplies.",
              ].map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-[0.8125rem] leading-[1.7]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--text-muted)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="grid-cell">
            <p className="section-label">The Solution</p>
            <h3
              className="text-xl md:text-2xl font-medium tracking-[-0.02em] mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              The Cure
            </h3>
            <p
              className="text-[0.8125rem] leading-[1.7] mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              We deploy hyper-realistic AI Voice and SMS agents that plug
              directly into your CRM. They operate relentlessly to turn dead
              databases into active calendars.
            </p>
            <ul className="space-y-3">
              {[
                "Instantly texts hundreds of dead quotes with dynamic check-ins.",
                "Holds human-like phone conversations to re-qualify old leads.",
                "Books appointments directly into your calendar. Zero human effort.",
              ].map((item, j) => (
                <li
                  key={j}
                  className="flex items-center gap-3 text-[0.8125rem] leading-[1.7]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <CheckCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--accent-color)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── NICHES ─── */}
      <section className="section">
        <p className="section-label">Industries We Serve</p>
        <h2
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-10"
          style={{ color: "var(--text-primary)" }}
        >
          Who we build for
        </h2>

        <div
          className="grid-bordered"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {NICHES.map((niche, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="grid-cell"
            >
              <niche.icon
                className="w-5 h-5 mb-4"
                style={{ color: "var(--accent-color)" }}
              />
              <h3
                className="text-base font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {niche.title}
              </h3>
              <p
                className="text-[0.8125rem] leading-[1.7]"
                style={{ color: "var(--text-muted)" }}
              >
                {niche.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── ROI / PRICING ─── */}
      <section className="section">
        <div className="max-w-2xl">
          <p className="section-label">ROI</p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            The ROI is undeniable
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            You don&apos;t need a thousand leads. You just need to close one
            $40,000 project that fell through the cracks last year to pay for
            our system for the next decade.
          </p>

          <div
            className="p-8"
            style={{
              border: "1px dashed var(--border-default)",
              background: "var(--bg-elevated)",
            }}
          >
            <p className="section-label" style={{ marginBottom: "8px" }}>
              Setup & Integration
            </p>
            <h3
              className="text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Starting at $2,000
            </h3>
            <p
              className="text-[0.8125rem] leading-[1.7]"
              style={{ color: "var(--text-secondary)" }}
            >
              Full AI agent build, voice cloning, prompt engineering, and CRM
              plumbing.{" "}
              <span style={{ color: "var(--text-muted)" }}>
                *Ongoing LLM/telephony usage is billed at cost or via
                performance commission. Let&apos;s discuss a model that brings
                you the most ROI.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ borderBottom: "none" }}>
        <div className="max-w-2xl">
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Stop losing money to apathy.
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Deploy your agent
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
