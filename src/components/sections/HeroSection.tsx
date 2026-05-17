"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

export default function HeroSection() {
  return (
    <section
      className="section relative overflow-hidden flex flex-col justify-center"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <div className="relative z-[2] w-full">
        <div className="max-w-3xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Your agency&apos;s next hire should be an{" "}
            <span className="text-accent">AI.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-[1rem] max-w-xl mb-10 leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            We build AI employees for insurance agencies. Renewal automation,
            lapse prevention, CSR task handling, new business intake. 24/7, no
            salary, no missed follow-ups.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-16"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a free agency audit
            </a>
            <a href="#services" className="btn-secondary bg-white">
              See how it works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
