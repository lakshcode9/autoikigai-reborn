"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, FileText, TrendingUp, Zap } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";

export function CaseStudies() {
  return (
    <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,224,255,0.05),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
             <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-[family-name:--font-disket] text-[#00E0FF] tracking-widest text-xs uppercase mb-2 block"
            >
              / Proven Protocol
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 uppercase tracking-tighter"
            >
              System Performance Logs
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 max-w-md text-lg md:text-right font-light tracking-wide"
          >
            Real results from deployed autonomous architectures.
            <br />
            Verified scaling metrics.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 bg-zinc-900/50 border border-white/5 hover:border-[#00E0FF]/30 rounded-xl transition-all duration-300"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[#00E0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-[#00E0FF]/20 transition-colors">
                     {i % 2 === 0 ? <TrendingUp className="w-5 h-5 text-[#00E0FF]" /> : <Zap className="w-5 h-5 text-[#00E0FF]" />}
                  </div>
                  <span className="font-[family-name:--font-disket] text-xs text-zinc-500">{`LOG_0${i+1}`}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#00E0FF] transition-colors uppercase tracking-wide">
                  {study.company}
                </h3>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#00E0FF]/10 border border-[#00E0FF]/20 text-[#00E0FF] text-xs font-bold rounded-full font-[family-name:--font-disket]">
                    {study.metric}
                  </span>
                </div>

                <p className="text-zinc-400 text-lg leading-relaxed mb-6 h-28 overflow-hidden text-ellipsis font-light tracking-wide">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {study.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-zinc-600 font-[family-name:--font-disket] uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
