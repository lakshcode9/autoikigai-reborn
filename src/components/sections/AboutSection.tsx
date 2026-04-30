"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT } from "@/lib/content";

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center lg:justify-start"
        >
          <div
            className="w-32 h-32 md:w-40 md:h-40 overflow-hidden flex items-center justify-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px dashed var(--border-default)",
            }}
          >
            <Image
              src="/autoikigai-logo.png"
              alt="Autoikigai"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="section-label">About</p>
          <h2
            className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Built by someone who ships.
          </h2>

          <div className="mb-4">
            <p className="text-base font-medium" style={{ color: "var(--text-primary)" }}>
              {ABOUT.founderName}
            </p>
            <p className="code-tag mt-1">{ABOUT.role}</p>
          </div>

          <p
            className="text-[0.8125rem] leading-[1.7] max-w-xl mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {ABOUT.bio}
          </p>

          <p
            className="text-[0.8125rem] leading-[1.7] max-w-xl mb-6"
            style={{ color: "var(--text-muted)", opacity: 0.7 }}
          >
            {ABOUT.japaneseLine}
          </p>

          {/* Built with */}
          <div>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
