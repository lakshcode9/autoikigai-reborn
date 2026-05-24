"use client";

import { motion } from "framer-motion";
import {
  Users,
  Mail,
  RefreshCw,
  Database,
  Shield,
  UserPlus,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CAPABILITIES } from "@/lib/content";

const ICON_MAP: Record<string, typeof Users> = {
  Users,
  Mail,
  RefreshCw,
  Database,
  Shield,
  UserPlus,
  TrendingUp,
  Zap,
};

export default function CaseStudiesSection() {
  return (
    <section id="how-it-works" className="section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="section-label">Capabilities</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          What your AI-native system handles
        </h2>
      </motion.div>

      {/* ── Icon grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-bordered">
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICON_MAP[cap.icon] || Zap;

          return (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid-cell flex flex-col items-center text-center gap-3 py-8 md:py-10"
            >
              {/* Icon container */}
              <div
                className="flex items-center justify-center w-12 h-12 mb-1"
                style={{
                  border: "1px dashed var(--accent-color)",
                  background: "var(--bg-elevated)",
                }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: "var(--accent-color)" }}
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3
                className="text-[0.875rem] font-medium leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {cap.title}
              </h3>

              {/* Metric badge */}
              <span
                className="code-tag"
                style={{
                  fontSize: "0.5625rem",
                  color: "var(--accent-color)",
                  background: "var(--bg-surface)",
                }}
              >
                {cap.metric}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ── Social proof — compact ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-start gap-3"
        style={{ borderTop: "1px dashed var(--border-default)" }}
      >
        <p
          className="section-label"
          style={{ marginBottom: 0, whiteSpace: "nowrap" }}
        >
          Social Proof
        </p>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          Built for agencies running on Applied Epic, AMS360, HawkSoft, and
          EZLynx. We integrate with your existing stack.
        </p>
      </motion.div>
    </section>
  );
}
