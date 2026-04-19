"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/content";

export default function CTASection() {
  return (
    <section className="relative z-10 py-24 md:py-32 border-t border-white/5 bg-[#00E0FF]/[0.03]">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E0FF]/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-[700px] mx-auto px-6 md:px-8 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold tracking-tight"
        >
          Stop Losing Money to Dead Leads
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-white/60 leading-relaxed font-bebas tracking-wide max-w-lg mx-auto"
        >
          Book a free 30-minute strategy call. You&apos;ll leave with a clear
          action plan — which leads to reactivate, which channels to use, and
          projected ROI. No pitch, no pressure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#00E0FF] text-black font-bebas font-bold text-sm tracking-widest rounded-full hover:bg-[#00c2dd] transition-colors shadow-[0_0_40px_rgba(0,224,255,0.2)]"
          >
            BOOK A FREE STRATEGY CALL
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
