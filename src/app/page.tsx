"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Fingerprint, Lock, Unlock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Ripple } from "@/components/ui/material-design-3-ripple";
import Link from "next/link";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { Component } from "@/components/ui/animated-menu";
import { StackedImageHover } from "@/components/ui/hover-deck-fx";
import { FireSphere } from "@/components/ui/fire-sphere";
import { CASE_STUDIES } from "@/lib/case-studies";
import Image from "next/image";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
        {/* Blue Vignette Glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,224,255,0.1),transparent_50%)]" />
        </div>

        {/* NAV */}
        <nav className="relative z-50 px-8 md:px-20 lg:px-24 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/autoikigai-logo.png" 
              alt="AutoIkigai" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="text-xl font-bebas tracking-widest group-hover:text-[#00E0FF] transition-colors">AUTOIKIGAI</span>
          </Link>
          <div className="flex gap-8 text-sm font-bebas tracking-widest">
            <Link href="/offer" className="text-[#00E0FF] hover:text-white transition-colors">OFFER</Link>
            <Link href="/reactivation" className="hover:text-[#00E0FF] transition-colors">REACTIVATION</Link>
            <a href="#work" className="hover:text-[#00E0FF] transition-colors">WORK</a>
            <a href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" className="hover:text-[#00E0FF] transition-colors">CONTACT</a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative z-10 px-8 md:px-20 lg:px-24 py-12 min-h-[calc(100vh-80px)] flex items-center">
          <div className="max-w-[1600px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
              
              {/* LEFT: Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] tracking-[0.3em] uppercase text-white/60">
                  SYSTEM: ENTERPRISE_ARCHITECTURE
                </div>
                
                
                <h1 className="text-[72px] md:text-[96px] leading-[0.9] font-bebas font-medium tracking-[-0.05em]">
                  WE DON'T JUST WRITE CODE.<br />
                  <span className="text-[#00E0FF]">
                    WE ARCHITECT FLOW.
                  </span>
                </h1>
                
                <div className="pl-6 border-l-2 border-[#00E0FF]/30 space-y-4">
                  <p className="text-sm text-[#00E0FF] font-bebas tracking-[0.2em] uppercase">
                    AUTO • IKIGAI // (n) The Self-Actualized Enterprise
                  </p>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[600px] font-bebas tracking-wide uppercase">
                    "Ikigai" is the reason you wake up in the morning. But you can't pursue your purpose if you're drowning in operations. We build autonomous systems that handle the "How" so you can remember the "Why".
                  </p>
                </div>
                
                <p className="text-sm md:text-base text-white/90 font-bebas italic tracking-widest uppercase">
                  HIGH AVAILABILITY. SELF-HEALING SYSTEMS. ZERO OVERHEAD.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.a 
                    href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00E0FF] hover:bg-[#00c2dd] text-black font-bebas font-bold text-sm tracking-widest uppercase rounded-full transition-all"
                  >
                    BOOK A SYSTEMS AUDIT
                  </motion.a>
                  <motion.a 
                    href="#work" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bebas font-bold text-sm tracking-widest uppercase rounded-full transition-all"
                  >
                    VIEW CASE STUDIES
                  </motion.a>
                </div>
              </motion.div>

              {/* RIGHT: Fire Sphere Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative flex justify-center lg:justify-start h-[500px] md:h-[600px] w-full"
              >
                  <FireSphere 
                    color0={[0, 224, 255]} 
                    color1={[0, 50, 150]}
                    bloomStrength={1.5}
                    className="w-full h-full"
                  />
                  
                  {/* Overlay Stats/Context */}
                  <div className="absolute bottom-10 left-10 md:left-20 pointer-events-none">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse" />
                        <span className="text-xs font-bebas tracking-widest text-[#00E0FF]">CORE ONLINE</span>
                      </div>
                      <div className="text-4xl font-bebas font-bold text-white leading-none">
                        AUTONOMOUS<br/>ENGINE
                      </div>
                    </div>
                  </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* GSAP ANIMATED SECTION - The Promise (WITH VISUALS) */}
        <section id="promise" className="relative z-10 min-h-screen flex items-center px-8 md:px-20 lg:px-24 py-32 border-t border-white/5">
          <div className="max-w-[1600px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-20 items-center">
              
              {/* LEFT: Text Content */}
              <div className="space-y-12">
                <TextBlockAnimation blockColor="#00E0FF" duration={0.7} stagger={0.04}>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold tracking-tight leading-[1.05]">
                    MOST AGENCIES HAND YOU A REPO AND DISAPPEAR.
                  </h2>
                </TextBlockAnimation>

                <TextBlockAnimation blockColor="#00E0FF" stagger={0.02} duration={0.6} delay={0.3}>
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/70 font-bebas tracking-wide max-w-[700px]">
                    WE BUILD AUTONOMOUS AI WORKFORCES THAT RUN 24/7. SCALABLE BACKENDS THAT NEVER BREAK. 
                    SELF-HEALING INFRASTRUCTURE THAT SLEEPS SO YOU DON&apos;T HAVE TO.
                  </p>
                </TextBlockAnimation>

                <div className="pt-8 space-y-6 max-w-[600px]">
                  {[
                    { label: "ZERO SUPERVISION", desc: "Autonomous agents handle ops" },
                    { label: "HIGH AVAILABILITY", desc: "98%+ uptime SLA guaranteed" },
                    { label: "REAL RESULTS", desc: "$850K+ revenue generated" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-2 h-2 mt-2 rounded-full bg-[#00E0FF] group-hover:shadow-[0_0_20px_rgba(0,224,255,0.6)] transition-all" />
                      <div>
                        <h3 className="text-lg font-bebas font-bold text-[#00E0FF]">{item.label}</h3>
                        <p className="text-sm text-white/50 font-bebas">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Ripple Interaction Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative h-[600px] flex items-center justify-center w-full"
              >
                 {/* 1. DOTTED BACKGROUND */}
                <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

                {/* 2. SHINY SPOTLIGHT EFFECT */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

                {/* 3. THE HERO CARD */}
                <div className="relative z-10 group">
                    
                    {/* Glow behind the card */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    
                    {/* Main Container */}
                    <div className="relative w-[340px] bg-zinc-950 rounded-[30px] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                        
                        {/* --- RIPPLE LAYER --- */}
                        <Ripple 
                            className="cursor-pointer" 
                            color="text-white" 
                            opacity={0.15} 
                            onClick={() => setUnlocked(!unlocked)}
                        >
                            {/* CARD CONTENT */}
                            <div className="h-full w-full p-8 flex flex-col justify-between relative z-20 pointer-events-none min-h-[400px]">
                                
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-[0.2em] font-mono">SYSTEM STATUS</h3>
                                        <p className="text-white font-bold text-xl font-bebas tracking-wide">AUTONOMOUS CORE</p>
                                    </div>
                                    <div className={`p-2 rounded-full border transition-colors duration-500 ${unlocked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                                        {unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                    </div>
                                </div>

                                {/* Central Graphic */}
                                <div className="flex-1 flex items-center justify-center py-8">
                                    <div className="relative">
                                        <div className={`absolute inset-0 bg-indigo-500 blur-[40px] transition-opacity duration-700 ${unlocked ? 'opacity-40' : 'opacity-0'}`} />
                                        <Fingerprint 
                                            className={`w-32 h-32 transition-all duration-700 ${unlocked ? 'text-indigo-400 scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]' : 'text-zinc-700 scale-100'}`} 
                                            strokeWidth={1} 
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="space-y-6">
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-zinc-500 text-xs font-mono uppercase">ACCESS CONTROL</p>
                                            <p className="text-zinc-300 text-sm font-medium mt-0.5 font-bebas tracking-wide">
                                                {unlocked ? "SYSTEM ENGAGED" : "DEPLOY AGENT"}
                                            </p>
                                        </div>
                                        
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                                            <ChevronRight className="w-5 h-5 text-zinc-400" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Ripple>

                    </div>
                </div>

                {/* Instruction Label */}
                <div className="absolute bottom-12 text-zinc-500 text-xs font-mono tracking-widest opacity-60">
                   INTERACTIVE SURFACE • CLICK TO DEPLOY
                </div>
              </motion.div>



            </div>
          </div>
        </section>

        {/* WORK MENU SECTION - Navigate to Individual Case Studies */}
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

        {/* FINAL CTA */}
        <section className="relative z-10 py-32 text-center px-8 md:px-20 lg:px-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-black tracking-tighter mb-12">
              READY TO SCALE?
            </h2>
            
            <motion.a
              href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-[#00E0FF] hover:bg-[#00c2dd] text-black font-bebas font-bold text-lg tracking-widest uppercase rounded-full transition-all shadow-[0_0_40px_rgba(0,224,255,0.3)]"
            >
              BOOK YOUR SYSTEMS AUDIT
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

 

        {/* AIKI NEURAL OVERSEER - PUBLIC MASCOT */}
        <div className="fixed bottom-8 right-8 z-[100] group">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="relative flex flex-col items-end gap-3"
          >
            {/* Status Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur border border-[#00E0FF]/30 px-3 py-1.5 rounded-lg text-[10px] font-bebas tracking-widest text-[#00E0FF] shadow-[0_0_20px_rgba(0,224,255,0.2)] mb-1">
              AIKI NEURAL_OVERSEER :: ACTIVE
            </div>
            
            <div className="relative">
              {/* Pulsing Aura */}
              <div className="absolute inset-0 bg-[#00E0FF] blur-[25px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
              
              {/* Mascot Container */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-2 group-hover:border-[#00E0FF]/50 transition-colors">
                <img 
                  src="/aiki-neural-overseer.gif" 
                  alt="Aiki Neural Overseer" 
                  className="w-full h-full object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Status Dot */}
                <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#00E0FF] border-2 border-black z-10 shadow-[0_0_10px_rgba(0,224,255,1)] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
