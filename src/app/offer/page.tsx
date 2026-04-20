"use client";

import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/case-studies";
import Link from "next/link";
import { StackedImageHover } from "@/components/ui/hover-deck-fx";
import { BOOKING_URL } from "@/lib/content";

const SPRINT_STEPS = [
  {
    step: "01",
    title: "The Audit",
    desc: "We look under the hood. We identify the 'Human Glue' processes that are bleeding your time and profit.",
    icon: <Zap className="w-5 h-5" style={{ color: "var(--accent-color)" }} />,
  },
  {
    step: "02",
    title: "The Architecture",
    desc: "We design a custom autonomous workflow. No cookie-cutter templates. A system built for your specific bottleneck.",
    icon: <Cpu className="w-5 h-5" style={{ color: "var(--accent-color)" }} />,
  },
  {
    step: "03",
    title: "The Deployment",
    desc: "We build it. We test it. We integrate it. You wake up to a system that does the work while you slept.",
    icon: (
      <CheckCircle
        className="w-5 h-5"
        style={{ color: "var(--accent-color)" }}
      />
    ),
  },
];

export default function OfferPage() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="section flex flex-col justify-center min-h-[55vh]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="section-label mb-4">The 14-Day Autonomy Sprint</p>

          <h1
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            We automate{" "}
            <span className="text-accent">the robotic.</span>
          </h1>

          <div
            className="pl-4 mb-6"
            style={{ borderLeft: "2px solid var(--accent-color)" }}
          >
            <p className="section-label" style={{ marginBottom: "4px" }}>
              Auto &middot; Ikigai // (n) The Self-Actualized Enterprise
            </p>
            <p
              className="text-[0.8125rem] leading-[1.7] max-w-xl"
              style={{ color: "var(--text-muted)" }}
            >
              &ldquo;Ikigai&rdquo; is the reason you wake up in the morning.
              But you can&apos;t pursue your purpose if you&apos;re drowning in
              operations. We build autonomous systems that handle the
              &ldquo;How&rdquo; so you can remember the &ldquo;Why&rdquo;.
            </p>
          </div>

          <p
            className="text-[0.8125rem] md:text-[1rem] leading-[1.7] max-w-xl mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            You didn&apos;t start a business to manage spreadsheets. We delete
            20+ hours of manual work from your week in 14 days.
          </p>

          <p
            className="text-[0.75rem] mb-8"
            style={{
              color: "var(--text-muted)",
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
            }}
          >
            High availability. Self-healing systems. Zero overhead.
          </p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Claim your audit
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="section" style={{ background: "var(--bg-elevated)" }}>
        <div className="max-w-2xl">
          <p className="section-label">The Problem</p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Growth isn&apos;t the problem.{" "}
            <span style={{ color: "var(--text-muted)" }}>
              Operations are.
            </span>
          </h2>

          <div
            className="grid-bordered"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <div className="grid-cell">
              <p
                className="text-[0.8125rem] leading-[1.7]"
                style={{ color: "var(--text-secondary)" }}
              >
                You hit a ceiling. You can&apos;t take on more clients without
                hiring more people. But hiring means training, management, and
                overhead.
              </p>
            </div>
            <div className="grid-cell">
              <p
                className="text-[0.8125rem] leading-[1.7]"
                style={{ color: "var(--text-secondary)" }}
              >
                Your &ldquo;Human Glue&rdquo; is failing. You are the
                bottleneck. You spend 80% of your week fighting fires instead of
                building the business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION (SPRINT STEPS) ─── */}
      <section className="section">
        <p className="section-label">Autoikigai Methodology</p>
        <h2
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-10"
          style={{ color: "var(--text-primary)" }}
        >
          The solution: Autonomy Sprint
        </h2>

        <div
          className="grid-bordered"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {SPRINT_STEPS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="grid-cell flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <span className="step-number text-2xl block mb-4">
                  {item.step}
                </span>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[0.8125rem] leading-[1.7]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 flex justify-end" style={{ borderTop: "1px dashed var(--border-default)" }}>
                {item.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── THE GUARANTEE ─── */}
      <section
        className="section"
        style={{ background: "var(--accent-color)" }}
      >
        <div className="max-w-2xl">
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Autoikigai Guarantee
          </p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "#fff" }}
          >
            We don&apos;t do &ldquo;hourly.&rdquo; We do results.
          </h2>
          <div
            className="p-6 md:p-8"
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <p
              className="text-[0.9375rem] md:text-[1.125rem] leading-[1.6] font-medium"
              style={{ color: "#fff" }}
            >
              &ldquo;If we don&apos;t save you at least 20 hours per week or
              generate a positive ROI in 30 days,{" "}
              <span style={{ textDecoration: "underline" }}>
                we work for free until we do.
              </span>
              &rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─── CLIENT RESULTS ─── */}
      <section id="work" className="section">
        <p className="section-label">Client Results</p>
        <h2
          className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Real systems. Real revenue.
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Verified metrics from our engagements.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Left — Case study list */}
          <div className="space-y-0">
            {CASE_STUDIES.map((study, index) => (
              <Link
                key={study.id}
                href={`/work/${study.id}`}
                className="flex items-center justify-between py-4 group"
                style={{ borderBottom: "1px dashed var(--border-default)" }}
              >
                <div className="flex items-center gap-4">
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-base font-medium group-hover:text-[var(--accent-color)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {study.company}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--accent-color)" }}
                />
              </Link>
            ))}
            <p
              className="pt-4 text-[0.75rem]"
              style={{
                color: "var(--text-muted)",
                fontFamily:
                  "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
              }}
            >
              Click any project to view full case study
            </p>
          </div>

          {/* Right — Money stack */}
          <div className="hidden lg:flex flex-col items-center justify-center min-h-[400px] relative">
            <StackedImageHover
              images={[
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
              ]}
              width={500}
              height={210}
              backgroundColor="transparent"
              rotateDeg={-12}
              skewDeg={10}
              scale={0.9}
              stepPx={36}
              minOpacity={0.8}
              ariaLabel="Revenue generated for clients"
            />
            <div
              className="mt-6 px-4 py-2"
              style={{
                background: "var(--bg-elevated)",
                border: "1px dashed var(--border-default)",
              }}
            >
              <span className="step-number text-lg">$20M+ generated</span>
              <span
                className="block text-[0.6875rem]"
                style={{
                  color: "var(--text-muted)",
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                }}
              >
                Total client revenue
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ borderBottom: "none" }}>
        <div className="max-w-2xl">
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Stop renting talent.{" "}
            <span className="text-accent">Start building assets.</span>
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Limited availability for Q3 2026.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book your systems audit
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </main>
  );
}
