"use client";

import { motion } from "framer-motion";
import { WHY_AUTOIKIGAI } from "@/lib/content";
import { Wallet, Zap, ShieldCheck } from "lucide-react";

const ICON_MAP: Record<string, typeof Wallet> = {
  Wallet,
  Zap,
  ShieldCheck,
};

export default function WhySection() {
  return (
    <section id="why" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="section-label">Why Autoikigai</p>
        <h2
          className="text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.03em] font-medium max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          Outbound without the overhead
        </h2>
      </motion.div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-bordered">
        {WHY_AUTOIKIGAI.map((pillar, i) => {
          const Icon = ICON_MAP[pillar.icon] || Wallet;

          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="grid-cell flex flex-col"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-6"
                style={{
                  border: "1px dashed var(--accent-color)",
                  background: "var(--bg-elevated)",
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: "var(--accent-color)" }}
                  strokeWidth={1.5}
                />
              </div>

              <h3
                className="text-[18px] md:text-[20px] font-medium leading-snug mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {pillar.title}
              </h3>

              <p
                className="text-[0.875rem] leading-[1.7]"
                style={{ color: "var(--text-muted)" }}
              >
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
