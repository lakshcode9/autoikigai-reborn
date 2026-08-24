"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT, FOUNDERS, type Founder } from "@/lib/content";

/* ── Floating speech bubbles for Laksh's missing photo ── */
function FloatingBubbles({ bubbles }: { bubbles: string[] }) {
  const configs = [
    { top: "12%", left: "8%", rotate: -4, delay: 0.4 },
    { top: "6%", right: "10%", rotate: 3, delay: 0.6 },
    { bottom: "14%", left: "5%", rotate: 2, delay: 0.8 },
  ];

  return (
    <>
      {bubbles.map((text, i) => {
        const { delay, rotate, ...pos } = configs[i % configs.length];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            className="absolute px-2.5 py-1 max-w-[150px] text-center"
            style={{
              ...pos,
              transform: `rotate(${rotate}deg)`,
              background: "var(--bg-primary)",
              border: "1px dashed var(--accent-color)",
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.5625rem",
              color: "var(--accent-color)",
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

/* ── Stat pill row ── */
function StatRow({ stats }: { stats: Founder["stats"] }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
          className="flex items-center gap-1.5 px-2.5 py-1.5"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
          }}
        >
          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "var(--accent-color)",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "0.5625rem",
              color: "var(--text-muted)",
              lineHeight: 1.2,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Single founder card ── */
function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col h-full"
      style={{
        border: "1px dashed var(--border-default)",
      }}
    >
      {/* ── Image area ── */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{
          aspectRatio: "3 / 4",
          background: "var(--bg-elevated)",
          borderBottom: "1px dashed var(--border-default)",
        }}
      >
        {founder.image ? (
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
              {/* Big question mark */}
              <div
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: "5rem",
                  fontWeight: 200,
                  color: "var(--border-default)",
                  userSelect: "none",
                  lineHeight: 1,
                }}
              >
                ?
              </div>
              {/* ASCII art style brackets */}
              <div
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: "0.625rem",
                  color: "var(--text-muted)",
                  opacity: 0.5,
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                {"{"} photo: null {"}"}
              </div>
            </div>
            {founder.imageFallbackBubbles && (
              <FloatingBubbles bubbles={founder.imageFallbackBubbles} />
            )}
          </>
        )}

        {/* Tagline overlay — bottom left of image */}
        <div
          className="absolute bottom-0 left-0 px-3 py-1.5"
          style={{
            background: "var(--accent-color)",
            fontFamily:
              "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
            fontSize: "0.625rem",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {founder.tagline}
        </div>
      </div>

      {/* ── Info strip ── */}
      <div className="flex flex-col gap-3 p-5">
        {/* Name + Role */}
        <div>
          <h3
            className="text-[18px] md:text-[22px] font-medium leading-tight mb-0.5"
            style={{ color: "var(--text-primary)" }}
          >
            {founder.name}
          </h3>
          <span className="code-tag">{founder.role}</span>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            color: "var(--text-muted)",
          }}
        >
          {founder.bio}
        </p>

        {/* Fun Fact */}
        <div
          className="inline-flex items-start gap-2 px-3 py-2"
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
              {"//"}
            </span>{" "}
            {founder.funFact}
          </span>
        </div>

        {/* Stats */}
        <StatRow stats={founder.stats} />

        {/* Socials */}
        {founder.socials && founder.socials.length > 0 && (
          <div
            className="flex gap-3 pt-2"
            style={{ borderTop: "1px dashed var(--border-default)" }}
          >
            {founder.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-link"
                style={{ fontSize: "0.625rem" }}
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

/* ── Main section ── */
export default function AboutSection() {
  return (
    <section id="about" className="section">
      {/* Header — tight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="section-label">The Founders</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Two guys. One builds it. One runs it.
        </h2>
      </motion.div>

      {/* ── Side-by-side cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 gap-y-6">
        {FOUNDERS.map((founder, i) => (
          <FounderCard key={founder.name} founder={founder} index={i} />
        ))}
      </div>

      {/* ── Built with — compact ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-center gap-3"
        style={{ borderTop: "1px dashed var(--border-default)" }}
      >
        <p
          className="section-label"
          style={{ marginBottom: 0, whiteSpace: "nowrap" }}
        >
          Built with
        </p>
        <div className="flex flex-wrap gap-1.5">
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
