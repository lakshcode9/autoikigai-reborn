"use client";

import { motion } from "framer-motion";
import { BOOKING_URL, KEY_METRICS, GUARANTEE_TEXT } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="section relative overflow-hidden flex flex-col justify-center"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <div className="relative z-[2] w-full">
        <div className="max-w-4xl">
          {/* Top Badge / Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span
                className="text-xs md:text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                For <span className="text-accent font-semibold">B2B founders selling $5k+ deals</span>
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.25rem,6vw,3.5rem)] md:text-[44px] lg:text-[54px] leading-[1.08] tracking-[-0.04em] font-medium mb-6 max-w-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            Qualified sales meetings on your calendar. Without hiring SDRs.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-[1.125rem] max-w-2xl mb-8 leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            Done-for-you cold email and LinkedIn outbound for B2B SaaS, agencies, consultancies, and IT services firms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3 mb-12 md:mb-16"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={BOOKING_URL}
                className="btn-primary inline-flex items-center gap-2"
              >
                Apply to work with us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            {/* Guarantee line */}
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {GUARANTEE_TEXT}
            </p>
          </motion.div>

          {/* Key Metrics Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 grid-bordered"
          >
            {KEY_METRICS.map((metric, i) => (
              <div
                key={i}
                className="grid-cell flex flex-col justify-center py-6 px-6"
                style={{ background: "var(--bg-elevated)" }}
              >
                <span
                  className="text-2xl md:text-3xl font-bold tracking-tight mb-1"
                  style={{
                    color: "var(--accent-color)",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {metric.value}
                </span>
                <span
                  className="text-xs md:text-sm font-medium leading-snug"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
