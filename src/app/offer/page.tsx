"use client";

import React from 'react';
import { ArrowRight, CheckCircle, Clock, Zap, Cpu, Lock, Star, Quote } from 'lucide-react';
import { motion } from "framer-motion"; 
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { CASE_STUDIES } from "@/lib/case-studies";
import Link from "next/link";
import Image from "next/image";
import { Component } from "@/components/ui/animated-menu";
import { StackedImageHover } from "@/components/ui/hover-deck-fx";

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00E0FF] selection:text-black relative overflow-hidden">
      
      {/* Blue Vignette Glow - Brand Consistency */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,224,255,0.1),transparent_50%)]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-20 pb-20 px-8 md:px-20 lg:px-24 border-b border-white/5 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E0FF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00E0FF]/30 rounded-full bg-[#00E0FF]/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse" />
              <span className="text-xs font-bebas tracking-[0.2em] text-[#00E0FF]">THE 14-DAY AUTONOMY SPRINT</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas font-bold leading-[0.9] tracking-tighter">
              WE AUTOMATE<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#0d9488]">THE ROBOTIC.</span>
            </h1>
            
            <div className="pl-6 border-l-2 border-[#00E0FF]/30 space-y-4">
              <p className="text-sm text-[#00E0FF] font-bebas tracking-[0.2em] uppercase">
                AUTO • IKIGAI // (n) The Self-Actualized Enterprise
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[600px] font-bebas tracking-wide uppercase">
                "Ikigai" is the reason you wake up in the morning. But you can't pursue your purpose if you're drowning in operations. We build autonomous systems that handle the "How" so you can remember the "Why".
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-white/60 font-bebas tracking-wide max-w-2xl leading-relaxed">
              YOU DIDN'T START A BUSINESS TO MANAGE SPREADSHEETS.
              WE DELETE 20+ HOURS OF MANUAL WORK FROM YOUR WEEK IN 14 DAYS.
            </p>
            
            <p className="text-sm md:text-base text-white/90 font-bebas italic tracking-widest uppercase">
              HIGH AVAILABILITY. SELF-HEALING SYSTEMS. ZERO OVERHEAD.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <motion.a 
                href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-[#00E0FF] text-black font-bebas text-xl tracking-widest hover:bg-[#00c2dd] transition-all rounded-full flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,224,255,0.3)]"
              >
                CLAIM YOUR AUDIT
                <ArrowRight className="w-5 h-5 transition-transform group-hover:-rotate-45" />
              </motion.a>
            </div>
          </div>

          {/* VSL PHONE FRAME */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] md:w-[360px] h-[600px] md:h-[720px]">
              <div className="absolute inset-0 bg-[#00E0FF] blur-[140px] opacity-20 -z-10" />
              
              <div className="relative w-full h-full bg-zinc-950 rounded-[50px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-8 text-center relative">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mb-8"
                  >
                    <Image src="/autoikigai-logo.png" alt="AutoIkigai" width={96} height={96} className="object-cover" />
                  </motion.div>
                  
                  <span className="text-[#00E0FF] text-[11px] uppercase tracking-[0.3em] mb-4 font-bebas">
                    AUTOIKIGAI VSL
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bebas font-bold mb-4 leading-tight tracking-tight uppercase">
                    HOW WE AUTOMATE YOUR BUSINESS
                  </h3>
                  
                  <p className="text-xs text-zinc-500 font-bebas tracking-wide uppercase">
                    [ PLACEHOLDER: VERTICAL VIDEO ]
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PROBLEM (AGITATION) - High Contrast */}
      <section className="relative z-10 py-32 px-8 md:px-20 lg:px-24 bg-white text-black">
        <div className="max-w-4xl mx-auto space-y-16">
           <TextBlockAnimation blockColor="#000" duration={0.8}>
              <h2 className="text-6xl md:text-8xl font-bebas font-black uppercase leading-[0.85] tracking-tight">
                GROWTH ISN'T THE PROBLEM.<br/>
                <span className="text-zinc-400">OPERATIONS ARE.</span>
              </h2>
           </TextBlockAnimation>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg font-medium leading-relaxed font-mono">
              <p>
                You hit a ceiling. You can't take on more clients without hiring more people. 
                But hiring means training, management, and overhead.
              </p>
              <p>
                Your "Human Glue" is failing. You are the bottleneck. 
                You spend 80% of your week fighting fires instead of building the business.
              </p>
           </div>
        </div>
      </section>

      {/* 3. THE SOLUTION (THE SPRINT) */}
      <section className="relative z-10 py-32 px-8 md:px-20 lg:px-24 bg-black border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <Image src="/autoikigai-logo.png" alt="AutoIkigai" width={32} height={32} className="rounded-full" />
              <span className="text-sm font-bebas text-white/60 tracking-widest">AUTOIKIGAI METHODOLOGY</span>
            </div>
            <h2 className="text-2xl font-bebas text-[#00E0FF] tracking-[0.5em] mb-20 text-center">
              THE SOLUTION: AUTONOMY SPRINT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        step: "01",
                        title: "THE AUDIT",
                        desc: "We look under the hood. We identify the 'Human Glue' processes that are bleeding your time and profit.",
                        icon: <Zap className="w-8 h-8 text-[#00E0FF]" />
                    },
                    {
                        step: "02",
                        title: "THE ARCHITECTURE",
                        desc: "We design a custom autonomous workflow. No cookie-cutter templates. A system built for your specific bottleneck.",
                        icon: <Cpu className="w-8 h-8 text-[#00E0FF]" />
                    },
                    {
                        step: "03",
                        title: "THE DEPLOYMENT",
                        desc: "We build it. We test it. We integrate it. You wake up to a system that does the work while you slept.",
                        icon: <CheckCircle className="w-8 h-8 text-[#00E0FF]" />
                    }
                ].map((item, i) => (
                    <div key={i} className="relative group p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors h-full min-h-[400px] flex flex-col justify-between">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div>
                            <div className="text-6xl font-bebas font-black text-white/10 mb-8">{item.step}</div>
                            <h3 className="text-4xl font-bebas font-bold mb-4">{item.title}</h3>
                            <p className="text-white/60 font-bebas tracking-wide leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>



      {/* 4. THE GUARANTEE */}
      <section className="relative z-10 py-32 px-8 md:px-20 lg:px-24 bg-gradient-to-br from-[#00E0FF] to-[#0d9488] text-black">
         <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur flex items-center justify-center overflow-hidden">
                <Image src="/autoikigai-logo.png" alt="AutoIkigai" width={40} height={40} />
              </div>
              <span className="text-sm font-bebas text-black/70 tracking-widest">AUTOIKIGAI GUARANTEE</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-bebas font-black tracking-tighter leading-none">
                WE DON'T DO "HOURLY".<br/>WE DO RESULTS.
            </h2>
            <div className="p-12 border-4 border-black inline-block bg-white/20 backdrop-blur-sm rounded-2xl">
                <p className="text-2xl md:text-4xl font-bebas font-bold uppercase leading-tight max-w-3xl">
                    "IF WE DON'T SAVE YOU AT LEAST 20 HOURS PER WEEK OR GENERATE A POSITIVE ROI IN 30 DAYS, <span className="underline decoration-4 decoration-white">WE WORK FOR FREE UNTIL WE DO.</span>"
                </p>
            </div>
         </div>
      </section>

      {/* 5. CLIENT RESULTS - Same as main page */}
      <section id="work" className="relative z-10 py-32 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-20 lg:px-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* LEFT COLUMN: Menu List */}
            <div className="flex flex-col">
              <div className="text-left mb-12">
                <h2 className="text-4xl md:text-6xl font-bebas font-bold tracking-tight mb-4">
                  CLIENT RESULTS
                </h2>
                <p className="text-white/60 font-bebas text-lg tracking-wide">
                  REAL SYSTEMS. REAL REVENUE. VERIFIED METRICS.
                </p>
              </div>
              
              {/* Animated Menu List */}
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col w-full"
              >
                {CASE_STUDIES.map((study, index) => (
                  <motion.li
                    key={study.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative flex cursor-pointer flex-col overflow-visible w-full group"
                  >
                    <Link
                      href={`/work/${study.id}`}
                      className="flex items-center justify-between w-full py-6 border-b border-white/10 hover:border-[#00E0FF] transition-all group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-xl font-bebas text-white/30 group-hover:text-[#00E0FF] transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="relative flex items-start">
                          <Component
                            center
                            className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors"
                          >
                            {study.company}
                          </Component>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-[#00E0FF] -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <p className="text-sm font-bebas text-white/40 tracking-widest">
                  CLICK ANY PROJECT TO VIEW FULL CASE STUDY
                </p>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Money Stack Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:flex justify-center items-center h-full min-h-[600px]"
            >
              {/* Glowing Backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E0FF]/10 blur-[100px] rounded-full" />
              
              <StackedImageHover
                images={[
                  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg"
                ]}
                width={600}
                height={250}
                backgroundColor="transparent"
                rotateDeg={-12}
                skewDeg={10}
                scale={0.9}
                stepPx={40}
                minOpacity={0.8}
                ariaLabel="Revenue generated for clients"
                className="hover:scale-105 transition-all duration-700 cursor-none"
              />
              
              {/* Floating Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 right-20 bg-black/80 backdrop-blur border border-[#00E0FF]/30 px-6 py-3 rounded-lg"
              >
                <div className="text-[#00E0FF] font-bebas text-2xl tracking-widest">
                  $20M+ GENERATED
                </div>
                <div className="text-white/50 font-bebas text-sm">
                  TOTAL CLIENT REVENUE
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="relative z-10 py-32 px-8 md:px-20 lg:px-24 bg-black text-center border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-4 justify-center mb-8">
              <Image src="/autoikigai-logo.png" alt="AutoIkigai" width={48} height={48} className="rounded-full" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold text-white tracking-tight">
                STOP RENTING TALENT.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] to-[#0d9488]">START BUILDING ASSETS.</span>
            </h2>
            
            <motion.a 
                href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-12 py-6 bg-[#00E0FF] text-black font-bebas text-2xl font-bold tracking-widest rounded-full transition-all shadow-[0_0_50px_rgba(0,224,255,0.4)]"
              >
                BOOK YOUR SYSTEMS AUDIT
                <ArrowRight className="w-6 h-6" />
            </motion.a>
            
            <p className="text-white/40 font-bebas tracking-wider text-sm pt-4">
                LIMITED AVAILABILITY FOR Q1 2026
            </p>
          </div>
      </section>

 

    </main>
  );
}

