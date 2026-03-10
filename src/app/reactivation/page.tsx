"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Flame, Building2, Trees, Stethoscope, Droplets } from "lucide-react";
import Link from "next/link";
import TextBlockAnimation from "@/components/ui/text-block-animation";

export default function ReactivationPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Blue Vignette Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,224,255,0.1),transparent_50%)]" />
      </div>

      {/* NAV */}
      <nav className="relative z-50 px-8 md:px-20 lg:px-24 py-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-xl font-bebas tracking-widest hover:text-[#00E0FF] transition-colors">AUTOIKIGAI</Link>
        <div className="flex gap-8 text-sm font-bebas tracking-widest">
          <Link href="/offer" className="hover:text-[#00E0FF] transition-colors">OFFER</Link>
          <Link href="/reactivation" className="text-[#00E0FF] hover:text-white transition-colors">REACTIVATION</Link>
          <Link href="/#work" className="hover:text-[#00E0FF] transition-colors">WORK</Link>
          <a href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" className="hover:text-[#00E0FF] transition-colors">CONTACT</a>
        </div>
      </nav>

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
          </motion.div>
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

      {/* FINAL CTA */}
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

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <p className="text-xs text-white/40 font-bebas tracking-widest uppercase">
          © 2026 AUTOIKIGAI SYSTEMS. ALL SYSTEMS OPERATIONAL.
        </p>
      </footer>

    </main>
  );
}
