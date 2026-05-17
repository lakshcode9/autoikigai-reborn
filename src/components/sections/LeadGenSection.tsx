"use client";

import { motion } from "framer-motion";
import { Target, Mail, UserCheck, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/content";

const STEPS = [
  {
    icon: Target,
    title: "We find agencies ready to buy",
    description:
      "Homeowners, commercial, life, auto. We build prospect lists of agency owners who need what you sell.",
  },
  {
    icon: Mail,
    title: "We verify every contact",
    description:
      "Email validation, phone verification, LinkedIn matching. Direct lines to principals and owners, not gatekeepers.",
  },
  {
    icon: UserCheck,
    title: "We deliver to your pipeline",
    description:
      "Qualified agency leads pushed to your CRM or AMS. Every week. You just close.",
  },
];

export default function LeadGenSection() {
  return (
    <section id="lead-generation" className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="section-label">Lead Generation</p>
        <h2
          className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.03em] font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Not ready for AI? We&apos;ll just get you leads.
        </h2>
        <p
          className="text-[0.8125rem] leading-[1.7] max-w-2xl"
          style={{ color: "var(--text-muted)" }}
        >
          You do not need to automate everything on day one. We also run
          done-for-you lead generation for insurance agencies. Qualified
          prospects delivered to your pipeline every week. You just close.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-bordered mb-10">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="grid-cell"
          >
            <step.icon
              className="w-5 h-5 mb-3"
              style={{ color: "var(--accent-color)" }}
            />
            <h3
              className="text-[0.9375rem] font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {step.title}
            </h3>
            <p
              className="text-[0.8125rem] leading-[1.7]"
              style={{ color: "var(--text-muted)" }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          Book a free agency audit
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
