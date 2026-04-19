"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="relative z-10 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="section-label font-bebas">CLIENT RESULTS</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold tracking-tight mb-4">
            Real Systems. Real Revenue.
          </h2>
          <p className="text-base md:text-lg text-white/60 font-bebas tracking-wide leading-relaxed">
            Here&apos;s what happens when you stop losing money to dead leads.
            Every result is verified and backed by real client data.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/work/${study.id}`}
                className="card-project block group"
              >
                {/* Image / metric area */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-[#00E0FF]/10 via-[#00E0FF]/5 to-transparent flex items-center justify-center overflow-hidden">
                  {/* Large metric number */}
                  <span className="text-5xl md:text-6xl font-bebas font-bold text-white/10 group-hover:text-[#00E0FF]/20 transition-colors select-none">
                    {study.metric}
                  </span>

                  {/* Arrow icon on hover */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#00E0FF]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Company name */}
                  <p className="text-xs font-bebas tracking-[0.15em] text-[#00E0FF] mb-2 uppercase">
                    {study.company}
                  </p>

                  {/* Description */}
                  <h3 className="text-lg md:text-xl font-bebas font-bold tracking-tight mb-3 group-hover:text-[#00E0FF] transition-colors">
                    {study.description}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag-pill font-bebas">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
