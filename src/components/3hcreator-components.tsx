"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function InfiniteMarquee({ items }: { items: string[] }) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-12 border-y border-white/10">
      <div className="flex gap-16 animate-marquee">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center justify-center min-w-[200px]">
            <span className="text-2xl font-bold text-white/20 whitespace-nowrap tracking-tighter-custom">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ViewportGlow() {
  return <div className="viewport-glow" />;
}

export function StickyHeader() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter-custom">AUTOIKIGAI</div>
        <motion.a
          href="/book-a-call"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white text-black font-bold rounded-full text-sm tracking-wide"
        >
          Contact Now
        </motion.a>
      </div>
    </motion.header>
  );
}

interface BentoCardProps {
  title: string;
  description: string;
  delay?: number;
}

export function BentoCard({ title, description, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#00E0FF]/30"
    >
      <h3 className="text-2xl font-bold mb-4 tracking-tight-custom">{title}</h3>
      <p className="text-gray-400 leading-relaxed tracking-tight-custom">{description}</p>
    </motion.div>
  );
}

interface StatCardProps {
  metric: string;
  label: string;
  delay?: number;
}

export function StatCard({ metric, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="p-10 rounded-3xl border border-white/5 bg-black/40"
    >
      <div className="text-5xl font-extrabold mb-2 tracking-tighter-custom text-[#00E0FF]">
        {metric}
      </div>
      <div className="text-gray-500 text-sm tracking-tight-custom">{label}</div>
    </motion.div>
  );
}
