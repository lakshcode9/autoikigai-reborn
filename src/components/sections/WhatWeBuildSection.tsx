"use client";

import { motion } from "framer-motion";
import { WHAT_WE_BUILD } from "@/lib/content";
import { Search, Shield, FileCode, Calendar, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, typeof Search> = {
  Search,
  Shield,
  FileCode,
  Calendar,
};

export default function WhatWeBuildSection() {
  return (
    <section id="what-we-build" className="section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="section-label">What We Build</p>
        <h2
          className="text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.03em] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Automated B2B Outbound Engines
        </h2>
      </motion.div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {WHAT_WE_BUILD.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || Search;
          const isLast = i === WHAT_WE_BUILD.length - 1;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col h-full"
              style={{
                border: "1px dashed var(--border-default)",
              }}
            >
              {/* Top bar: Step number */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  borderBottom: "1px dashed var(--border-default)",
                  background: "var(--bg-elevated)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                    fontSize: "0.625rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Step {item.step}
                </span>
                <span className="code-tag">Module {item.step}</span>
              </div>

              {/* Visual center: large icon + step background number */}
              <div
                className="flex items-center justify-center py-8 relative"
                style={{ background: "var(--bg-primary)" }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                  aria-hidden
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                      fontSize: "6rem",
                      fontWeight: 800,
                      color: "var(--bg-elevated)",
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                <div
                  className="relative z-10 flex items-center justify-center w-14 h-14"
                  style={{
                    border: "2px solid var(--accent-color)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "var(--accent-color)" }}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Bottom content */}
              <div
                className="px-5 py-5 flex flex-col gap-3 flex-1"
                style={{
                  borderTop: "1px dashed var(--border-default)",
                }}
              >
                <h3
                  className="text-[17px] md:text-[19px] font-medium tracking-[-0.02em] leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>

                {/* Deliverable pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                  {item.deliverables.map((d) => (
                    <span
                      key={d}
                      className="code-tag"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
