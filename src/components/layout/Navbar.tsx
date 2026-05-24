"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: BOOKING_URL },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--border-default)",
        background: "var(--bg-primary)",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/autoikigai-logo.png"
            alt="Autoikigai"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Autoikigai
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="mono-link">
              {link.label}
            </Link>
          ))}
          <Link
            href={BOOKING_URL}
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.75rem" }}
          >
            Book a strategy call
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
            }`}
            style={{ background: "var(--text-primary)" }}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
            }`}
            style={{ background: "var(--text-primary)" }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              borderTop: "1px solid transparent",
              background: "var(--bg-primary)",
            }}
          >
            <div className="py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-6 py-3">
                <Link
                  href={BOOKING_URL}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center block"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Book a strategy call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
