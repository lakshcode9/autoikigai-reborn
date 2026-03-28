import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 py-16 px-8 md:px-20 lg:px-24 border-t border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Image src="/autoikigai-logo.png" alt="AutoIkigai" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bebas tracking-widest group-hover:text-[#00E0FF] transition-colors text-white">AUTOIKIGAI</span>
            </Link>
            <p className="text-white/50 font-bebas text-sm tracking-wide leading-relaxed">
              WE BUILD AUTONOMOUS AI WORKFORCES THAT RUN 24/7. SELF-HEALING INFRASTRUCTURE THAT SLEEPS SO YOU DON&apos;T HAVE TO.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-bebas text-[#00E0FF] tracking-widest text-sm">NAVIGATION</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-white/60 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors text-sm">HOME</Link>
              <Link href="/offer" className="text-white/60 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors text-sm">OFFER</Link>
              <Link href="/reactivation" className="text-white/60 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors text-sm">REACTIVATION</Link>
              <Link href="/demo" className="text-white/60 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors text-sm">LIVE SIMULATION</Link>
              <a href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" className="text-white/60 font-bebas tracking-wider hover:text-[#00E0FF] transition-colors text-sm">CONTACT</a>
            </div>
          </div>
          
          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-bebas text-[#00E0FF] tracking-widest text-sm">READY TO SCALE?</h4>
            <a 
              href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00E0FF]/10 border border-[#00E0FF]/30 text-[#00E0FF] font-bebas tracking-widest text-sm rounded-full hover:bg-[#00E0FF]/20 transition-all w-fit"
            >
              BOOK A CALL <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-bebas tracking-widest uppercase">
            © 2026 AUTOIKIGAI SYSTEMS. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse" />
            <span className="text-xs font-bebas text-[#00E0FF] tracking-widest">SYSTEMS ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
