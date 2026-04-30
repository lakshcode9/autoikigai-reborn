"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

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
          Tell me the task your team hates most.
        </h2>

        <p
          className="text-[0.8125rem] leading-[1.7] mb-8 max-w-lg mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          30 minutes. No pitch. You&apos;ll leave knowing exactly what AI can
          handle in your agency, how long it takes, and what it costs.
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Book a free audit
        </a>
      </motion.div>
    </section>
  );
}
