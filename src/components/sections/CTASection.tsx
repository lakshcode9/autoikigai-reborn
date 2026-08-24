"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section" style={{ borderBottom: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="section-label" style={{ marginBottom: "16px" }}>
          Deploy Your Engine
        </p>

        <h2
          className="text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.03em] font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to accelerate your Phase II commercialization metrics?
        </h2>

        <p
          className="text-[1.125rem] md:text-[1.25rem] leading-[1.5] tracking-[-0.02em] mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Let’s deploy your outbound engine before your Phase I timeline runs out.
        </p>

        {/* Description */}
        <div className="space-y-4 mb-8 text-left bg-elevated p-6 border border-dashed border-default">
          <p
            className="text-[0.875rem] leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            In 15 minutes, we analyze your target commercial vertical, Phase I timeline, and executive buyer persona to map out a turnkey 30-day outbound campaign.
          </p>
          <p
            className="text-[0.875rem] leading-[1.7]"
            style={{ color: "var(--text-muted)" }}
          >
            No cold calling for your R&amp;D leads. 100% automated domain warmups, contact enrichment, tech-to-exec copywriting, and direct calendar bookings.
          </p>
        </div>

        {/* CTA */}
        <div>
          <a
            href={BOOKING_URL}
            className="btn-primary inline-flex items-center gap-2"
            style={{ padding: "14px 28px", fontSize: "0.875rem" }}
          >
            Book a 15-Min Strategy Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
