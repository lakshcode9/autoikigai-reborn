"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PLAYBOOKS_URL } from "@/lib/content";

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
        href={PLAYBOOKS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline underline-offset-2"
        style={{ color: "#fff" }}
      >
        Free Playbooks for SBIR/STTR Phase I Awardees &amp; Deep-Tech Founders. Secure Phase II LOIs faster.{" "}
        <span className="font-medium">View Playbooks &rarr;</span>
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
