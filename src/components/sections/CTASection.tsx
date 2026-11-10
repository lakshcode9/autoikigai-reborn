"use client";

import { motion } from "framer-motion";
import { BOOKING_URL, GUARANTEE_TEXT } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section" style={{ borderBottom: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="section-label" style={{ marginBottom: "16px" }}>
          Get Started
        </p>

        <h2
          className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Stop waiting for leads. Start booking meetings.
        </h2>

        <p
          className="text-[1.125rem] md:text-[1.25rem] leading-[1.5] tracking-[-0.02em] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Apply for a pilot and see qualified prospects on your calendar within weeks.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href={BOOKING_URL}
            className="btn-primary inline-flex items-center gap-2"
            style={{ padding: "14px 28px", fontSize: "0.875rem" }}
          >
            Apply to work with us
            <ArrowRight className="w-4 h-4" />
          </a>
          <p
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {GUARANTEE_TEXT}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
