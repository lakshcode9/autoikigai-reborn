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
          Custom pricing based on your goals
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
          <span className="code-tag mb-2 inline-block">Founding Client Pilot</span>
          <h3
            className="text-[20px] md:text-[24px] font-medium leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Pay-per-meeting model
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p
            className="text-[0.9375rem] leading-[1.7] mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Pricing is determined after a discovery call where we review your offer, ICP, and sales process. We structure it so you only pay for results.
          </p>

          {/* What's included */}
          <div className="space-y-3 mb-6">
            {[
              "Target list building and enrichment",
              "Sending domain setup and warmup",
              "Cold email and LinkedIn sequences",
              "Reply management and qualification",
              "Calendar booking with qualified prospects",
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

          {/* Qualified meeting definition */}
          <div
            className="px-4 py-3 mb-6"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
            }}
          >
            <p
              className="text-[0.75rem] font-medium mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Qualified meeting =
            </p>
            <p
              className="text-[0.8125rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              A decision-maker at a company matching your agreed ICP who shows up to the call.
            </p>
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
            Limited availability. Monthly retainer options available after pilot.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
