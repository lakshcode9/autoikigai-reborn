"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/content";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative z-10 py-24 md:py-32 border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas font-bold tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="divide-y divide-white/10">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {/* Question trigger */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
              >
                <span
                  className={`text-base md:text-lg font-bebas font-bold tracking-wide transition-colors pr-4 ${
                    openIndex === i
                      ? "text-[#00E0FF]"
                      : "text-white group-hover:text-[#00E0FF]"
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-white/40 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-[#00E0FF]" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm md:text-base text-white/50 leading-relaxed font-bebas tracking-wide">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
