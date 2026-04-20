"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";
import { BOOKING_URL } from "@/lib/content";

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const caseStudy = CASE_STUDIES.find((cs) => cs.id === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      {/* ─── BACK LINK ─── */}
      <div className="px-4 md:px-10 pt-4">
        <Link
          href="/#case-studies"
          className="mono-link inline-flex items-center gap-2 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to all work
        </Link>
      </div>

      {/* ─── HERO ─── */}
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="code-tag mb-4 inline-block">
            {caseStudy.industry}
          </span>

          <h1
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {caseStudy.company}
          </h1>

          <p className="step-number text-xl md:text-2xl mb-6">
            {caseStudy.metric}
          </p>

          <p
            className="text-[0.8125rem] md:text-[1rem] leading-[1.7] max-w-2xl mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            {caseStudy.description}
          </p>

          {/* Quick stats */}
          <div
            className="grid-bordered grid grid-cols-1 sm:grid-cols-3"
          >
            <div className="grid-cell">
              <Clock
                className="w-4 h-4 mb-2"
                style={{ color: "var(--accent-color)" }}
              />
              <p className="section-label" style={{ marginBottom: "2px" }}>
                Timeline
              </p>
              <p
                className="text-base font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.timeline}
              </p>
            </div>
            <div className="grid-cell">
              <Target
                className="w-4 h-4 mb-2"
                style={{ color: "var(--accent-color)" }}
              />
              <p className="section-label" style={{ marginBottom: "2px" }}>
                Industry
              </p>
              <p
                className="text-base font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.industry}
              </p>
            </div>
            <div className="grid-cell">
              <TrendingUp
                className="w-4 h-4 mb-2"
                style={{ color: "var(--accent-color)" }}
              />
              <p className="section-label" style={{ marginBottom: "2px" }}>
                Impact
              </p>
              <p
                className="text-base font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.tags[0]}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── CHALLENGE ─── */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-[0.35fr_1fr] gap-10">
          <div>
            <p className="section-label">The Challenge</p>
            <div
              className="w-12 h-[2px] mt-2"
              style={{ background: "var(--accent-color)" }}
            />
          </div>
          <p
            className="text-[0.8125rem] md:text-[1rem] leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            {caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section
        className="section"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12">
          {/* Left — Solution description */}
          <div>
            <p className="section-label">The Solution</p>
            <p
              className="text-[0.8125rem] md:text-[1rem] leading-[1.7] mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {caseStudy.solution}
            </p>

            <p className="section-label">Key Features</p>
            <ul className="space-y-3">
              {caseStudy.keyFeatures.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-[0.8125rem] leading-[1.7]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-[3px] flex-shrink-0"
                    style={{ color: "var(--accent-color)" }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — Tech stack */}
          <div>
            <p className="section-label">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, i) => (
                <span key={i} className="tag-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section className="section">
        <p className="section-label">The Results</p>
        <h2
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {caseStudy.results.primary}
        </h2>

        <div
          className="grid-bordered mt-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
          }}
        >
          {caseStudy.results.secondary.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="grid-cell"
            >
              <TrendingUp
                className="w-4 h-4 mb-3"
                style={{ color: "var(--accent-color)" }}
              />
              <p
                className="text-[0.875rem] font-medium leading-[1.5]"
                style={{ color: "var(--text-primary)" }}
              >
                {result}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      {caseStudy.testimonial && (
        <section className="section">
          <div className="max-w-2xl">
            <p className="section-label">Client Testimonial</p>
            <blockquote
              className="text-[1rem] md:text-[1.125rem] leading-[1.7] italic pl-4 mb-6"
              style={{
                borderLeft: "2px solid var(--accent-color)",
                color: "var(--text-primary)",
              }}
            >
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </blockquote>
            <div
              className="pt-4"
              style={{ borderTop: "1px dashed var(--border-default)" }}
            >
              <p
                className="text-[0.875rem] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.testimonial.author}
              </p>
              <p
                className="text-[0.75rem]"
                style={{
                  color: "var(--text-muted)",
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                }}
              >
                {caseStudy.testimonial.role}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="section" style={{ borderBottom: "none" }}>
        <div className="max-w-2xl">
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Ready for similar results?
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Let&apos;s build your autonomous system.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book your systems audit
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
