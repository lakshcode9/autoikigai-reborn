"use client";

import { motion } from "framer-motion";
import { Search, Code, RefreshCw } from "lucide-react";
import { SERVICES } from "@/lib/content";

const ICONS = [Search, Code, RefreshCw];

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Services</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          One system. Three weeks. Zero new hires.
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-xl mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          From mapping your team&apos;s repetitive work to deploying AI
          employees that handle it &mdash; we build the entire system so you can
          focus on running your agency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-bordered">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid-cell"
            >
              {/* Header row: icon + timeline badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="step-number flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="code-tag">{service.phase}</span>
              </div>

              {/* Title */}
              <h3
                className="text-[18px] md:text-[20px] font-medium mb-3 tracking-[-0.02em]"
                style={{ color: "var(--text-primary)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-[0.8125rem] leading-[1.7]"
                style={{ color: "var(--text-muted)" }}
              >
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
