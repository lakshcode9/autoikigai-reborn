"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { USE_CASES, BOOKING_URL } from "@/lib/content";

export default function CaseStudiesSection() {
  return (
    <section id="how-it-works" className="section">
      {/* --- Use Cases --- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="section-label">Capabilities</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          What your AI employee can do
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-xl mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Every task below is something our AI employees handle today &mdash;
          running in production, not on a slide deck.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-bordered mb-16">
        {USE_CASES.map((useCase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid-cell flex items-start gap-3"
          >
            <CheckCircle
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: "var(--accent-color)" }}
            />
            <p
              className="text-[0.8125rem] leading-[1.7]"
              style={{ color: "var(--text-secondary)" }}
            >
              {useCase}
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- Social Proof --- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="section-label">Social Proof</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Built on real systems, not slides.
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-2xl"
          style={{ color: "var(--text-muted)" }}
        >
          Our own agency runs on AI employees. Lead research, personalized
          outreach, follow-ups, CRM updates, WhatsApp morning reports &mdash;
          all handled by AI agents we built and run ourselves. We don&apos;t sell
          what we don&apos;t use.
        </p>
      </motion.div>

      {/* Case study CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-8 md:p-10"
        style={{
          border: "1px dashed var(--border-default)",
          background: "var(--bg-elevated)",
        }}
      >
        <h3
          className="text-[18px] md:text-[22px] font-medium mb-3 tracking-[-0.02em]"
          style={{ color: "var(--text-primary)" }}
        >
          Want proof it works for your agency?
        </h3>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-xl mb-6"
          style={{ color: "var(--text-muted)" }}
        >
          We&apos;re building AI employees for 3 agencies this quarter &mdash;
          at cost &mdash; in exchange for a documented case study.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          Apply for a case study spot
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
