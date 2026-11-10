"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";
import { ArrowRight, Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="section-label">Get Started</p>
        <h2
          className="text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.03em] font-medium max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          What you get
        </h2>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
        style={{
          border: "1px dashed var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-5"
          style={{
            borderBottom: "1px dashed var(--border-default)",
            background: "var(--bg-elevated)",
          }}
        >
          <span className="code-tag mb-2 inline-block">Done-for-you outbound</span>
          <h3
            className="text-[20px] md:text-[24px] font-medium leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Qualified meetings on your calendar
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p
            className="text-[0.9375rem] leading-[1.7] mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            We build and run your entire outbound system. You focus on closing deals.
          </p>

          {/* What's included */}
          <div className="space-y-3 mb-6">
            {[
              "Target list building and enrichment",
              "Sending domain setup and warmup",
              "Cold email and LinkedIn sequences",
              "Reply management and qualification",
              "Calendar booking with decision-makers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    border: "1px solid var(--accent-color)",
                    background: "var(--bg-surface)",
                  }}
                >
                  <Check
                    className="w-3 h-3"
                    style={{ color: "var(--accent-color)" }}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className="text-[0.875rem]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={BOOKING_URL}
            className="btn-primary inline-flex items-center gap-2 w-full justify-center"
          >
            Apply to work with us
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Note */}
          <p
            className="text-[0.75rem] text-center mt-4"
            style={{ color: "var(--text-muted)" }}
          >
            Limited spots. We work with a small number of clients at a time.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
