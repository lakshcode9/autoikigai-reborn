"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section className="relative z-10 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-[#00E0FF]/15 blur-[60px] rounded-full" />
              {/* Logo container */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
                <Image
                  src="/autoikigai-logo.png"
                  alt="Autoikigai"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="section-label font-bebas">ABOUT</p>
            <h2 className="text-4xl md:text-5xl font-bebas font-bold tracking-tight">
              Built By Someone Who Ships.
            </h2>

            <div className="space-y-2">
              <p className="text-xl font-bebas font-bold text-white tracking-wide">
                {ABOUT.founderName}
              </p>
              <p className="text-sm font-bebas tracking-[0.15em] text-[#00E0FF] uppercase">
                {ABOUT.role}
              </p>
            </div>

            <p className="text-base text-white/60 leading-relaxed font-bebas tracking-wide max-w-xl">
              {ABOUT.bio}
            </p>

            {/* Built with badges */}
            <div className="pt-4 space-y-3">
              <p className="text-xs text-white/30 font-bebas tracking-[0.2em] uppercase">
                Built with
              </p>
              <div className="flex flex-wrap gap-3">
                {ABOUT.builtWith.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/50 text-xs font-bebas tracking-wider rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
