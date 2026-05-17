"use client";

import { motion } from "framer-motion";
import { Search, Code, RefreshCw, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/content";

const ICON_MAP: Record<string, typeof Search> = {
  Search,
  Code,
  RefreshCw,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      {/* Header — tight, no paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="section-label">Services</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Your agency automated in three weeks.
        </h2>
      </motion.div>

      {/* ── Visual timeline cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {SERVICES.map((service, i) => {
          const Icon = ICON_MAP[service.icon] || Search;
          const isLast = i === SERVICES.length - 1;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="relative flex flex-col"
              style={{
                border: "1px dashed var(--border-default)",
                marginRight: isLast ? 0 : undefined,
              }}
            >
              {/* ── Top bar: step number + phase badge ── */}
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
                  Step {service.step}
                </span>
                <span className="code-tag">{service.phase}</span>
              </div>

              {/* ── Visual center: large icon + step number ── */}
              <div
                className="flex items-center justify-center py-10 md:py-14 relative"
                style={{ background: "var(--bg-primary)" }}
              >
                {/* Giant faded step number */}
                <div
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                  aria-hidden
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                      fontSize: "8rem",
                      fontWeight: 800,
                      color: "var(--bg-elevated)",
                      lineHeight: 1,
                    }}
                  >
                    {service.step}
                  </span>
                </div>

                {/* Icon on top */}
                <div
                  className="relative z-10 flex items-center justify-center w-16 h-16"
                  style={{
                    border: "2px solid var(--accent-color)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: "var(--accent-color)" }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Connector arrow (not on last) */}
                {!isLast && (
                  <div
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 items-center justify-center w-6 h-6"
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px dashed var(--border-default)",
                    }}
                  >
                    <ArrowRight
                      className="w-3 h-3"
                      style={{ color: "var(--accent-color)" }}
                    />
                  </div>
                )}
              </div>

              {/* ── Bottom: title + one-liner + deliverables ── */}
              <div
                className="px-5 py-5 flex flex-col gap-3 flex-1"
                style={{
                  borderTop: "1px dashed var(--border-default)",
                }}
              >
                <h3
                  className="text-[18px] md:text-[20px] font-medium tracking-[-0.02em]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {service.shortDesc}
                </p>

                {/* Deliverable pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {service.deliverables.map((d) => (
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
