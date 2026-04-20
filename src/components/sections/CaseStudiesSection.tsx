"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";
import { StackedImageHover } from "@/components/ui/hover-deck-fx";

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="case-studies" className="section">
      {/* Header row with scroll buttons */}
      <div className="flex items-end justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Client Results</p>
          <h2
            className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Real systems. Real revenue.
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            Here&apos;s what happens when you stop losing money to dead leads.
          </p>
        </motion.div>

        {/* Scroll buttons — Crator style */}
        <div className="hidden md:flex items-center gap-2 shrink-0 ml-4">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 flex items-center justify-center transition-colors"
            style={{
              border: "1px dashed var(--border-default)",
              color: "var(--text-muted)",
              background: "transparent",
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 flex items-center justify-center transition-colors"
            style={{
              border: "1px dashed var(--border-default)",
              color: "var(--text-muted)",
              background: "transparent",
            }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll carousel — Crator's exact pattern */}
      <div className="relative overflow-hidden -mx-4 px-0 md:-mx-0">
        {/* Mobile swipe fade hint */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none md:hidden"
          style={{ background: "linear-gradient(to right, transparent, var(--bg-primary))" }}
        />
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="shrink-0"
              style={{ width: "min(300px, 80vw)" }}
            >
              <Link
                href={`/work/${study.id}`}
                className="block group"
                style={{
                  textDecoration: "none",
                  border: "1px dashed var(--border-default)",
                }}
              >
                {/* Image / metric area */}
                <div
                  className="w-full relative overflow-hidden flex items-center justify-center"
                  style={{
                    height: "140px",
                    background: "var(--bg-surface)",
                    borderBottom: "1px dashed var(--border-default)",
                  }}
                >
                  <span
                    className="text-3xl font-semibold select-none tracking-tight"
                    style={{ color: "var(--text-muted)", opacity: 0.3 }}
                  >
                    {study.metric}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="p-5 flex flex-col"
                  style={{ background: "var(--bg-primary)" }}
                >
                  {/* Company name */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)", opacity: 0.7 }}
                    >
                      {study.company}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[15px] font-medium mb-2 tracking-[-0.02em] group-hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {study.description.length > 80
                      ? study.description.slice(0, 80) + "..."
                      : study.description}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {study.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dollar stack visual below the carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 md:mt-16 relative overflow-hidden flex flex-col items-center"
      >
        {/* Stack container — scales down on mobile */}
        <div className="w-full flex justify-center items-center h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden">
          <StackedImageHover
            images={[
              "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
              "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
            ]}
            width={480}
            height={200}
            backgroundColor="transparent"
            rotateDeg={-10}
            skewDeg={8}
            scale={0.85}
            stepPx={35}
            minOpacity={0.8}
            ariaLabel="Revenue generated for clients"
            className="hover:scale-105 transition-all duration-700"
          />
        </div>

        {/* Revenue badge — positioned below on mobile, absolute on desktop */}
        <div
          className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-8 px-5 py-2.5 text-center md:text-left"
          style={{
            background: "var(--bg-primary)",
            border: "1px dashed var(--border-default)",
          }}
        >
          <p
            className="text-lg md:text-xl font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            $500K+
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Total client revenue
          </p>
        </div>
      </motion.div>
    </section>
  );
}
