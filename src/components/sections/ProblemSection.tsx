"use client";

import { motion } from "framer-motion";
import { PROBLEM_CARDS } from "@/lib/content";
import { Users, DollarSign, AlertTriangle } from "lucide-react";

const ICON_MAP: Record<string, typeof Users> = {
  Users,
  DollarSign,
  AlertTriangle,
};

export default function ProblemSection() {
  return (
    <section id="problem" className="section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <p className="section-label">The Problem</p>
        <h2
          className="text-[24px] md:text-[34px] leading-[1.1] tracking-[-0.03em] font-medium max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          You close deals. You just need more at-bats.
        </h2>
      </motion.div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-bordered">
        {PROBLEM_CARDS.map((card, i) => {
          const Icon = ICON_MAP[card.icon] || Users;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="grid-cell flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="code-tag">{card.tag}</span>
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded border"
                    style={{
                      borderColor: "var(--border-default)",
                      background: "var(--bg-elevated)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--accent-color)" }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <h3
                  className="text-[18px] md:text-[20px] font-medium leading-snug mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-[0.875rem] leading-[1.7]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
