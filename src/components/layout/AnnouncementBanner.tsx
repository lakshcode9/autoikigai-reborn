"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative flex items-center justify-center px-4 py-2.5 text-center"
      style={{
        background: "var(--accent-color)",
        color: "#fff",
        fontSize: "0.75rem",
        letterSpacing: "0.02em",
      }}
    >
      <a
        href="https://resources.autoikigai.space"
        className="hover:underline underline-offset-2"
        style={{ color: "#fff" }}
      >
        Free resources for insurance agency owners. Renewal systems, CSR
        workflows, lapse prevention guides.{" "}
        <span className="font-medium">Learn more →</span>
      </a>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
