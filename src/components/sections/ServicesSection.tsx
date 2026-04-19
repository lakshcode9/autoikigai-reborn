"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/content";

export default function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="section-label font-bebas">OUR PROCESS</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold tracking-tight mb-4">
            We Handle Everything From Audit to Deployment.
          </h2>
          <p className="text-base md:text-lg text-white/60 font-bebas tracking-wide leading-relaxed">
            From mapping your dead leads to deploying AI agents and optimizing
            campaigns — we handle the entire reactivation pipeline so you can
            focus on running your business.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 hover:border-[#00E0FF]/30 transition-colors group"
            >
              {/* Timeline badge */}
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bebas tracking-[0.15em] text-white/50 bg-white/5 border border-white/10 rounded-full">
                {service.phase}
              </span>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bebas font-bold tracking-tight mb-3 group-hover:text-[#00E0FF] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-white/50 leading-relaxed font-bebas tracking-wide">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
