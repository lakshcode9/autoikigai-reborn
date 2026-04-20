"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

export default function CTASection() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Book a free 30-minute audit
        </h2>

        <p
          className="text-[0.8125rem] leading-[1.7] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          You&apos;ll leave with a clear action plan — which leads to
          reactivate, which channels to use, and projected ROI. No pitch, no
          pressure.
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Book a free strategy call
        </a>
      </motion.div>
    </section>
  );
}
