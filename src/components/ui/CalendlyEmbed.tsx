"use client";

import { useEffect } from "react";
import { BOOKING_URL } from "@/lib/content";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export function CalendlyEmbed({ className }: { className?: string }) {
  useEffect(() => {
    // Load the Calendly widget script if not already present
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<div class="calendly-inline-widget" data-url="${BOOKING_URL}" style="min-width:320px;height:700px;"></div>`,
      }}
    />
  );
}
