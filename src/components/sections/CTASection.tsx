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
            Agency AI Blueprint
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
            We audit your renewal process, CSR workflows, intake systems, and
            claims follow-up. Then we build AI employees that integrate with
            your AMS and handle these tasks 24/7. Your team focuses on
            relationships and complex cases.
          </p>
          <p
            className="text-[0.8125rem] leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            Typical engagements range from $15,000 to $30,000+ depending on
            the number of workflows and AMS integrations. Ongoing maintenance
            and optimization included.
          </p>
          <p
            className="text-[0.875rem] leading-[1.7] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            This is not a free audit. This is engineering for your agency.
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
            Book a free agency audit
          </a>
        </div>
      </motion.div>
    </section>
  );
}
