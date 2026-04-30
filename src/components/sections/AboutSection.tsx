"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT, FOUNDERS, type Founder } from "@/lib/content";

function FloatingBubbles({ bubbles }: { bubbles: string[] }) {
  const positions = [
    { top: "8%", left: "10%", rotate: -6 },
    { top: "18%", right: "8%", rotate: 4 },
    { bottom: "28%", left: "6%", rotate: 3 },
    { bottom: "10%", right: "12%", rotate: -3 },
  ];

  return (
    <>
      {bubbles.map((text, i) => {
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
            className="absolute px-3 py-1.5 max-w-[160px] text-center"
            style={{
              ...pos,
              background: "var(--bg-primary)",
              border: "1px dashed var(--border-default)",
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              zIndex: 2,
            }}
          >
            {text}
          </motion.div>
        );
      })}
    </>
  );
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start"
      style={{
        borderBottom:
          index < FOUNDERS.length - 1
            ? "1px dashed var(--border-default)"
            : "none",
        paddingBottom: index < FOUNDERS.length - 1 ? "48px" : "0",
        marginBottom: index < FOUNDERS.length - 1 ? "48px" : "0",
      }}
    >
      {/* Photo / Bubbles area */}
      <div
        className="relative w-full aspect-square max-w-[280px] mx-auto md:mx-0 overflow-hidden flex items-center justify-center"
        style={{
          background: "var(--bg-elevated)",
          border: "1px dashed var(--border-default)",
        }}
      >
        {founder.image ? (
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover"
            sizes="280px"
          />
        ) : (
          <>
            {/* Placeholder with floating bubbles */}
            <div
              className="flex items-center justify-center w-full h-full"
              style={{ background: "var(--bg-elevated)" }}
            >
              <div
                className="text-center"
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: "2.5rem",
                  color: "var(--border-default)",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                ?
              </div>
            </div>
            {founder.imageFallbackBubbles && (
              <FloatingBubbles bubbles={founder.imageFallbackBubbles} />
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div>
        {/* Name + Role + Tagline */}
        <div className="mb-4">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h3
              className="text-[20px] md:text-[24px] font-medium leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {founder.name}
            </h3>
            <span className="code-tag">{founder.role}</span>
          </div>
          <p
            className="text-[0.8125rem] font-medium tracking-wide"
            style={{
              color: "var(--accent-color)",
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {founder.tagline}
          </p>
        </div>

        {/* Bio */}
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-xl mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {founder.bio}
        </p>

        {/* Fun Fact */}
        <div
          className="inline-flex items-start gap-2 px-3 py-2 mb-5"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
          }}
        >
          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ color: "var(--accent-color)", fontWeight: 600 }}>
              //
            </span>{" "}
            {founder.funFact}
          </span>
        </div>

        {/* Socials */}
        {founder.socials && founder.socials.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {founder.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-link hover:underline"
                style={{ fontSize: "0.6875rem" }}
              >
                {social.label} &rarr;
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <p className="section-label">The Founders</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {ABOUT.sectionHeading}
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          {ABOUT.sectionSubheading}
        </p>
      </motion.div>

      {/* Founder Cards */}
      <div className="space-y-0">
        {FOUNDERS.map((founder, i) => (
          <FounderCard key={founder.name} founder={founder} index={i} />
        ))}
      </div>

      {/* Built with */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-12 pt-10"
        style={{ borderTop: "1px dashed var(--border-default)" }}
      >
        <p className="section-label" style={{ marginBottom: "12px" }}>
          Built with
        </p>
        <div className="flex flex-wrap gap-2">
          {ABOUT.builtWith.map((tech) => (
            <span key={tech} className="code-tag">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
