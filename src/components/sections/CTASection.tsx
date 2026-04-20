"use client";

import { motion } from "framer-motion";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";

export default function CTASection() {
  return (
    <section className="section" style={{ borderBottom: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Book a free 30-minute audit
        </h2>

        <p
          className="text-[0.8125rem] leading-[1.7] mb-8 max-w-lg mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          You&apos;ll leave with a clear action plan &mdash; which leads to
          reactivate, which channels to use, and projected ROI. No pitch, no
          pressure.
        </p>

        <CalendlyEmbed className="w-full" />
      </motion.div>
    </section>
  );
}
