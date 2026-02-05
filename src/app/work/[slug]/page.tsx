"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Target, Zap, Clock, CheckCircle2, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const caseStudy = CASE_STUDIES.find(cs => cs.id === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,224,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,224,255,0.1),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 md:px-16 py-8 flex justify-between items-center border-b border-white/5">
        <Link href="/#work" className="flex items-center gap-2 text-white/60 hover:text-[#00E0FF] transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bebas tracking-widest">BACK TO ALL WORK</span>
        </Link>
        <div className="text-xs font-bebas text-white/40 tracking-widest">
          CASE STUDY
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Industry Tag */}
            <div className="inline-block px-4 py-2 bg-[#00E0FF]/10 border border-[#00E0FF]/20 rounded-full">
              <span className="text-sm font-bebas text-[#00E0FF] tracking-widest uppercase">
                {caseStudy.industry}
              </span>
            </div>

            {/* Company Name */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas font-bold tracking-tight leading-[0.9]">
              {caseStudy.company}
            </h1>

            {/* Primary Metric */}
            <div className="text-6xl md:text-7xl lg:text-8xl font-bebas font-black text-[#00E0FF]">
              {caseStudy.metric}
            </div>

            {/* Description */}
            <p className="text-2xl md:text-3xl text-white/70 font-bebas max-w-[900px] leading-relaxed tracking-wide">
              {caseStudy.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <Clock className="w-6 h-6 text-[#00E0FF]" />
                <div className="text-sm font-bebas text-white/40">TIMELINE</div>
                <div className="text-2xl font-bebas font-bold">{caseStudy.timeline}</div>
              </div>
              <div className="space-y-2">
                <Target className="w-6 h-6 text-[#00E0FF]" />
                <div className="text-sm font-bebas text-white/40">INDUSTRY</div>
                <div className="text-2xl font-bebas font-bold">{caseStudy.industry}</div>
              </div>
              <div className="space-y-2">
                <TrendingUp className="w-6 h-6 text-[#00E0FF]" />
                <div className="text-sm font-bebas text-white/40">IMPACT</div>
                <div className="text-2xl font-bebas font-bold">{caseStudy.tags[0]}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Challenge Section */}
      <section className="relative z-10 px-6 md:px-16 py-24 md:py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-6xl font-bebas font-bold tracking-tight">
                THE
                <br />
                CHALLENGE
              </h2>
              <div className="w-20 h-1 bg-[#00E0FF]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-2xl md:text-3xl text-white/80 font-bebas leading-relaxed">
                {caseStudy.challenge}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Solution Section with Visual */}
      <section className="relative z-10 px-6 md:px-16 py-24 md:py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Solution Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-bebas font-bold">
                THE SOLUTION
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-bebas leading-relaxed">
                {caseStudy.solution}
              </p>

              {/* Key Features */}
              <div className="space-y-4 pt-6">
                <h3 className="text-2xl font-bebas font-bold text-[#00E0FF]">KEY FEATURES</h3>
                <div className="space-y-3">
                  {caseStudy.keyFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#00E0FF] mt-1 flex-shrink-0" />
                      <span className="text-lg font-bebas text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Animated Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              {/* Central Pulsing Node */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#00E0FF]/20 blur-3xl"
              />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-[#00E0FF] bg-black flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-[#00E0FF]" />
              </div>

              {/* Orbiting Feature Badges */}
              {caseStudy.keyFeatures.slice(0, 4).map((feature, i) => {
                const angle = (i * 90);
                const radius = 160;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [y - 10, y + 10, y - 10]
                    }}
                    transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.3 }}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-black border border-[#00E0FF]/30 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-xs font-bebas text-[#00E0FF] whitespace-nowrap">
                      {feature.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Results Section - Visual Metrics */}
      <section className="relative z-10 px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bebas font-bold mb-6">
              THE RESULTS
            </h2>
            <p className="text-2xl text-white/60 font-bebas max-w-[700px] mx-auto">
              {caseStudy.results.primary}
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.results.secondary.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#00E0FF]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00E0FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00E0FF]/20 transition-all">
                    <TrendingUp className="w-6 h-6 text-[#00E0FF]" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bebas font-bold leading-tight">
                    {result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 px-6 md:px-16 py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bebas font-bold mb-4">
              TECHNOLOGY STACK
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {caseStudy.technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-6 py-3 bg-black border border-white/20 rounded-full hover:border-[#00E0FF]/50 transition-all cursor-default group"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00E0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg font-bebas tracking-wide">{tech}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonial Section (if available) */}
      {caseStudy.testimonial && (
        <section className="relative z-10 px-6 md:px-16 py-24 md:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-12"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00E0FF]/10 border-2 border-[#00E0FF]/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#00E0FF]" />
              </div>

              <blockquote className="text-3xl md:text-4xl font-bebas leading-relaxed text-white/90 italic">
                "{caseStudy.testimonial.quote}"
              </blockquote>

              <div className="pt-8 border-t border-white/10">
                <div className="text-xl font-bebas font-bold">{caseStudy.testimonial.author}</div>
                <div className="text-sm font-bebas text-white/60 mt-1 tracking-widest uppercase">
                  {caseStudy.testimonial.role}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-16 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-bebas font-bold">
            READY FOR SIMILAR RESULTS?
          </h2>
          <p className="text-2xl text-white/60 font-bebas">
            LET'S BUILD YOUR AUTONOMOUS SYSTEM
          </p>
          <motion.a
            href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#00E0FF] hover:bg-[#00c2dd] text-black font-bebas font-bold text-lg tracking-widest uppercase rounded-full transition-all shadow-[0_0_40px_rgba(0,224,255,0.3)]"
          >
            BOOK YOUR SYSTEMS AUDIT
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <p className="text-xs text-white/40 font-bebas tracking-widest uppercase">
          © 2026 AUTOIKIGAI SYSTEMS. ALL SYSTEMS OPERATIONAL.
        </p>
      </footer>

    </main>
  );
}
