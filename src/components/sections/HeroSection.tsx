"use client";

import { motion } from "framer-motion";
import { BOOKING_URL, TRUSTED_BY } from "@/lib/content";

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
          {/* Heading — left aligned, exact Crator sizing */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            We are the <span className="text-accent">AI Reactivation Partner</span>{" "}
            you need
          </motion.h1>

          {/* Subtitle — monospace-feel body copy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-[1rem] max-w-xl mb-10 leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            We find where AI moves the needle in your dead lead database, build
            the reactivation systems, and run them for you.
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
              Book a free strategy call
            </a>
            <a href="#case-studies" className="btn-secondary bg-white">
              See our work
            </a>
          </motion.div>
        </div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col md:flex-row gap-10 md:gap-16"
        >
          <div>
            <p className="section-label" style={{ marginBottom: "16px" }}>
              Trusted by
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {TRUSTED_BY.map((company) => (
                <span
                  key={company.name}
                  className="text-sm font-medium"
                  style={{ color: "var(--text-muted)", opacity: 0.5 }}
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
