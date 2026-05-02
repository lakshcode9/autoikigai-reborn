"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

export default function CTASection() {
  return (
    <section className="section" style={{ borderBottom: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Price tag */}
        <div className="text-center mb-8">
          <p className="section-label" style={{ marginBottom: "16px" }}>
            Get Started
          </p>
          <h2
            className="text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.03em] font-medium mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            AI Employee Blueprint
          </h2>
          <p
            className="text-[1.125rem] md:text-[1.25rem] leading-[1.3] tracking-[-0.02em]"
            style={{ color: "var(--text-muted)" }}
          >
            Starting at $15,000
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-8">
          <p
            className="text-[0.8125rem] leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            We go deep into your agency&apos;s operations &mdash; every workflow
            audited, every integration scoped, every AI employee architected and
            deployed. You walk away with systems that run without your team
            touching them.
          </p>
          <p
            className="text-[0.8125rem] leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            Typical engagements range from $15,000 to $30,000+ depending on the
            number of workflows and integrations. Ongoing maintenance included.
          </p>
          <p
            className="text-[0.875rem] leading-[1.7] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            This isn&apos;t a free audit. This is engineering.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book a discovery call
          </a>
        </div>
      </motion.div>
    </section>
  );
}
