"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL, TRUSTED_BY } from "@/lib/content";

export default function HeroSection() {
  return (
    <section className="relative z-10 py-20 md:py-28 lg:py-36">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00E0FF]/8 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas font-bold tracking-tight leading-[0.95]"
          >
            We Turn Your Dead Leads Into{" "}
            <span className="text-[#00E0FF]">Booked Appointments</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-bebas tracking-wide"
          >
            Your CRM is a graveyard of unclosed estimates and lapsed clients.
            Our AI agents run 24/7 to wake them up and book them straight to
            your calendar.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00E0FF] text-black font-bebas font-bold text-sm tracking-widest rounded-full hover:bg-[#00c2dd] transition-colors"
            >
              BOOK A FREE STRATEGY CALL
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bebas font-bold text-sm tracking-widest rounded-full hover:bg-white/5 transition-colors"
            >
              SEE OUR RESULTS
            </a>
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="pt-12 space-y-4"
          >
            <p className="text-xs text-white/30 font-bebas tracking-[0.2em] uppercase">
              Trusted by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {TRUSTED_BY.map((company) => (
                <span
                  key={company.name}
                  className="text-sm font-bebas tracking-wider text-white/40"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
