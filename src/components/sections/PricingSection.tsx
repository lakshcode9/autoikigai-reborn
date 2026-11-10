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
        <p className="section-label">Pricing</p>
        <h2
          className="text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.03em] font-medium max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          The Founding Client Pilot
        </h2>
      </motion.div>

      {/* Pricing Card */}
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
          <div className="flex items-center gap-2 mb-3">
            <span className="code-tag">Limited spots</span>
          </div>
          <h3
            className="text-[20px] md:text-[24px] font-medium leading-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Setup fee + pay per meeting
          </h3>
          <p
            className="text-[0.875rem]"
            style={{ color: "var(--text-muted)" }}
          >
            One-time setup to build your outbound system. Then pay only when qualified meetings land on your calendar.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* How it works */}
          <div className="space-y-4 mb-6">
            <div
              className="p-4"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
              }}
            >
              <p
                className="text-[0.75rem] font-medium uppercase tracking-wide mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Setup fee (one-time)
              </p>
              <p
                className="text-[0.875rem]"
                style={{ color: "var(--text-secondary)" }}
              >
                Covers ICP research, target list building, domain setup, warmup, and sequence writing. Your outbound system, ready to launch.
              </p>
            </div>

            <div
              className="p-4"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
              }}
            >
              <p
                className="text-[0.75rem] font-medium uppercase tracking-wide mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Per qualified meeting
              </p>
              <p
                className="text-[0.875rem]"
                style={{ color: "var(--text-secondary)" }}
              >
                You pay when a decision-maker at a company matching your ICP shows up to a call. No-shows and bad fits don't count.
              </p>
            </div>
          </div>

          {/* What's included */}
          <p
            className="text-[0.75rem] font-medium uppercase tracking-wide mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            Everything included
          </p>
          <div className="space-y-2.5 mb-6">
            {[
              "Target list building and enrichment",
              "Sending domains with SPF/DKIM/DMARC",
              "Inbox warmup (your main domain stays safe)",
              "Cold email and LinkedIn sequences",
              "Reply management within hours",
              "Lead qualification and calendar booking",
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
            Apply for the pilot
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Note */}
          <p
            className="text-[0.75rem] text-center mt-4"
            style={{ color: "var(--text-muted)" }}
          >
            We'll discuss exact pricing on the call based on your ICP and volume.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
