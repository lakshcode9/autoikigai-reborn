"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, CheckCircle, Flame, Building2, Trees, Stethoscope, Droplets } from "lucide-react";
import TextBlockAnimation from "@/components/ui/text-block-animation";

export default function ReactivationPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Blue Vignette Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,224,255,0.1),transparent_50%)]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 px-8 md:px-20 lg:px-24 py-20 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/30 rounded-full text-xs tracking-[0.3em] font-bold uppercase"
          >
            THE NEW STANDARD IN FOLLOW-UP
          </motion.div>
          
          <div className="flex justify-center">
            <TextBlockAnimation blockColor="#00E0FF" duration={0.8} stagger={0.05}>
              <h1 className="text-[60px] md:text-[80px] lg:text-[110px] leading-[0.9] font-bebas font-medium tracking-[-0.03em] mx-auto text-center">
                WE TURN DEAD LEADS<br />INTO <span className="text-[#00E0FF]">REVENUE.</span>
              </h1>
            </TextBlockAnimation>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl text-white/70 max-w-[800px] mx-auto font-bebas tracking-wide leading-relaxed uppercase"
          >
            Your CRM is a graveyard of unclosed estimates and lapsed returning clients. Our AI Voice & SMS agents run 24/7 to wake them up and book them straight to your calendar.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <a 
              href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#00E0FF] hover:bg-[#00c2dd] text-black font-bebas font-bold text-lg tracking-widest uppercase rounded-full transition-all shadow-[0_0_30px_rgba(0,224,255,0.3)] hover:shadow-[0_0_50px_rgba(0,224,255,0.5)] transform hover:scale-105"
            >
              BOOK SYSTEM DEPLOYMENT
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#case-studies" 
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 hover:bg-white/5 text-white font-bebas font-bold text-lg tracking-widest uppercase rounded-full transition-all transform hover:scale-105"
            >
              VIEW INDUSTRY RESULTS
              <ArrowDown className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS / CASE STUDIES - STAGGERED ELEVATED LAYOUT */}
      <section id="case-studies" className="relative z-10 py-32 border-t border-white/5 bg-zinc-950/80">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 lg:px-24">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bebas font-black tracking-tighter text-white">THEY STOPPED<br/><span className="text-[#00E0FF]">GUESSING.</span></h2>
            <p className="mt-6 text-white/50 font-bebas text-xl md:text-2xl tracking-widest uppercase max-w-3xl mx-auto">
              Industry benchmarks of AI replacing the 1,000-person sales team. See what the tech is doing in your exact sector.
            </p>
          </div>

          <div className="space-y-32">
            {[
              {
                sector: "HEALTHCARE / DME (SLEEP CLINICS)",
                company: "Industry AI Benchmark",
                result: "$40M+ RECOVERED",
                metric: "262X ROI",
                body: "A major provider recovered over $40 million in additional revenue in just 5 months by deploying AI voice agents to handle thousands of patient re-orders and dormant check-ins simultaneously.",
                quote: "The AI handles everything from outbound reactivation to inbound scheduling. It's like having a 1,000-person sales team that never sleeps.",
                image: "https://loremflickr.com/1200/800/doctor,clinic,medical/all",
                reverse: false
              },
              {
                sector: "COMMERCIAL PROPERTY SERVICES",
                company: "Industry AI Benchmark",
                result: "7.0X ROI IMPROVEMENT",
                metric: "26% CONV RATE",
                body: "Lead-to-meeting conversion rates jumped from 18% to 26% almost overnight for a property maintenance leader. Response times dropped to under 60 seconds across all unclosed estimates.",
                quote: "We're closing more commercial contracts with zero extra human effort. The AI reacts faster than any human possibly could.",
                image: "https://loremflickr.com/1200/800/office,cleaner,commercial/all",
                reverse: true
              },
              {
                sector: "CONTRACTOR / ARBORISTS",
                company: "Industry AI Benchmark",
                result: "60% CONVERSION LIFT",
                metric: "5X COST REDUCTION",
                body: "By automating follow-ups for 'dead' tree-care and paving quotes, contractors saw a 60% improvement in conversion rates while reducing cost-per-appointment by 80%.",
                quote: "We're booking jobs from leads we thought were lost months ago. The system just doesn't quit until the decision is made.",
                image: "https://loremflickr.com/1200/800/construction,worker,contractor/all",
                reverse: false
              },
              {
                sector: "COMMERCIAL FIRE & SECURITY",
                company: "Industry AI Benchmark",
                result: "105% OF SALES GOAL",
                metric: "35% CLOSURE LIFT",
                body: "Systems specialists hit 105% of their revenue recovery goals within 6 months of deploying AI agents specifically to follow up on inspection renewals and security site audits.",
                quote: "Recovering just one high-ticket enterprise security contract pays for this system 10x over. It's the highest leverage move we've made.",
                image: "https://loremflickr.com/1200/800/server,security,technology/all",
                reverse: true
              }
            ].map((study, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${study.reverse ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-[#00E0FF] blur-2xl opacity-10 rounded-full translate-x-4 translate-y-4" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={study.image} 
                    alt={`Case Study - ${study.sector}`} 
                    className="w-full max-h-[500px] object-cover rounded-[2rem] border border-white/10 shadow-2xl relative z-10 grayscale-[0.8] hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Floating Metric Badge over Image */}
                  <div className={`absolute bottom-10 ${study.reverse ? 'left-[-1rem] lg:left-[-3rem]' : 'right-[-1rem] lg:right-[-3rem]'} z-20 hidden md:block border border-white/10 bg-black/90 backdrop-blur-md p-6 rounded-2xl shadow-[0_0_40px_rgba(0,224,255,0.2)]`}>
                    <p className="text-white/50 text-[10px] tracking-[0.3em] font-bold uppercase mb-1">VERIFIED METRIC</p>
                    <p className="text-[#00E0FF] text-5xl font-bebas tracking-wide">{study.metric}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] tracking-[0.3em] uppercase text-[#00E0FF]">
                      {study.sector}
                    </span>
                    <div>
                      <h3 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-tight text-white leading-[0.9]">{study.result}</h3>
                      <p className="text-white/40 font-bebas text-xl tracking-widest mt-2">{study.company}</p>
                    </div>
                  </div>

                  <p className="text-white/60 text-lg leading-relaxed font-sans max-w-lg">
                    {study.body}
                  </p>
                  
                  <div className="pt-8 border-t border-white/10 relative">
                    <div className="absolute -top-4 left-0 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center">
                      <span className="text-[#00E0FF] font-serif text-2xl leading-none">"</span>
                    </div>
                    <p className="text-white italic text-xl md:text-2xl font-sans tracking-wide leading-relaxed pl-6 border-l-2 border-[#00E0FF]/30">
                      {study.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM / SOLUTION */}
      <section className="relative z-10 py-32 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* PROBLEM */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bebas text-rose-500 tracking-tight">THE BLEEDING</h2>
              <p className="text-xl text-white/60 font-bebas tracking-wide max-w-lg">
                High-ticket service businesses lose millions every year because humans simply cannot follow up 30 times with a 2-year-old lead without giving up.
              </p>
              <ul className="space-y-4">
                {[
                  "Property managers who ghosted your paving quote 18 months ago.",
                  "Offices that missed their annual fire inspection renewal.",
                  "CPAP patients who never reordered their supplies.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-rose-500/50 flex-shrink-0" />
                    <p className="text-white/80 font-sans text-sm tracking-wide">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SOLUTION */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bebas text-[#00E0FF] tracking-tight">THE CURE</h2>
              <p className="text-xl text-white/60 font-bebas tracking-wide max-w-lg">
                We deploy hyper-realistic AI Voice and SMS agents that plug directly into your CRM. They operate relentlessly to turn dead databases into active calendars.
              </p>
              <ul className="space-y-4">
                {[
                  "Instantly texts hundreds of dead quotes with dynamic check-ins.",
                  "Holds human-like phone conversations to re-qualify old leads.",
                  "Books appointments directly into your calendar. Zero human effort.",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <CheckCircle className="w-5 h-5 text-[#00E0FF]" />
                    <p className="text-white/80 font-sans text-sm tracking-wide">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE NICHES */}
      <section className="relative z-10 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 lg:px-24 text-center">
          <div className="flex justify-center mb-16">
            <TextBlockAnimation blockColor="#00E0FF" duration={0.6} stagger={0.03}>
              <h2 className="text-5xl md:text-7xl font-bebas font-bold tracking-tight text-center mx-auto">
                WHO WE BUILD FOR
              </h2>
            </TextBlockAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "COMMERCIAL PAVING", icon: Building2, desc: "Reactivate $50k+ dead parking lot estimates from HOAs." },
              { title: "FIRE & SECURITY", icon: Flame, desc: "Automate follow-ups for lapsed annual commercial fire inspections." },
              { title: "COMMERCIAL JANITORIAL", icon: Droplets, desc: "Call office managers 6 months after a lost bid to steal the contract." },
              { title: "ARBORISTS & TREE CARE", icon: Trees, desc: "SMS unclosed 'dead-tree' quotes right before storm season hits." },
              { title: "SLEEP APNEA CLINICS", icon: Stethoscope, desc: "Automate CPAP supply insurance re-orders for past patients." },
            ].map((niche, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border border-white/10 bg-white/5 rounded-2xl hover:border-[#00E0FF]/50 transition-colors group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00E0FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <niche.icon className="w-6 h-6 text-[#00E0FF]" />
                </div>
                <h3 className="text-2xl font-bebas tracking-wider text-white mb-2">{niche.title}</h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed">{niche.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & PRICING */}
      <section className="relative z-10 py-32 border-t border-white/5 bg-[#00E0FF]/5">
        <div className="max-w-4xl mx-auto px-8 md:px-20 text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-bebas font-bold tracking-tight">THE ROI IS UNDENIABLE</h2>
          <p className="text-xl text-white/70 font-bebas tracking-wide max-w-2xl mx-auto">
            You don't need a thousand leads. You just need to close one $40,000 project that fell through the cracks last year to pay for our system for the next decade.
          </p>
          
          <div className="flex justify-center items-center mt-12">
            <div className="p-8 border border-white/20 rounded-2xl bg-black w-full max-w-sm">
              <h3 className="text-xl font-bebas tracking-wide text-white/50 mb-2">SETUP & INTEGRATION</h3>
              <div className="text-5xl font-bebas font-bold text-white mb-4">STARTING AT $2,000</div>
              <p className="text-sm text-white/60 font-sans">Full AI agent build, voice cloning, prompt engineering, and CRM plumbing. <span className="italic block mt-2 text-white/40">*Ongoing LLM/telephony usage is billed at cost or via performance commission. Let's discuss a model that brings you the most ROI.</span></p>
            </div>
          </div>
        </div>
      </section>


      <section className="relative z-10 py-32 text-center px-8 md:px-20 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas font-black tracking-tighter mb-12">
            STOP LOSING MONEY<br/>TO APATHY.
          </h2>
          
          <motion.a
            href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#00E0FF] hover:bg-[#00c2dd] text-black font-bebas font-bold text-lg tracking-widest uppercase rounded-full transition-all shadow-[0_0_40px_rgba(0,224,255,0.3)]"
          >
            DEPLOY YOUR AGENT
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>

 

    </main>
  );
}
