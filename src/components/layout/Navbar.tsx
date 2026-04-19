"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

const NAV_LINKS = [
  { label: "SERVICES", href: "/#services" },
  { label: "WORK", href: "/#case-studies" },
  { label: "REACTIVATION", href: "/reactivation" },
  { label: "CONTACT", href: BOOKING_URL, external: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/autoikigai-logo.png"
              alt="AutoIkigai"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-lg font-bebas tracking-widest group-hover:text-[#00E0FF] transition-colors">
              AUTOIKIGAI
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bebas tracking-widest text-white/70 hover:text-[#00E0FF] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bebas tracking-widest text-white/70 hover:text-[#00E0FF] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Desktop CTA */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#00E0FF] text-black font-bebas font-bold text-sm tracking-widest rounded-full hover:bg-[#00c2dd] transition-colors"
            >
              BOOK A CALL
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:text-[#00E0FF] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) =>
              link.external ? (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bebas tracking-widest text-white/80 hover:text-[#00E0FF] transition-colors"
                >
                  {link.label}
                </motion.a>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bebas tracking-widest text-white/80 hover:text-[#00E0FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}

            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.1 }}
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-[#00E0FF] text-black font-bebas font-bold text-lg tracking-widest rounded-full hover:bg-[#00c2dd] transition-colors"
            >
              BOOK A CALL
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
