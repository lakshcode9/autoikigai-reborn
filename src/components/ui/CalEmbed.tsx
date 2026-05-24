"use client";

import Cal from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/content";

export function CalEmbed({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        flex: 1,
        minHeight: "700px",
        border: "1px dashed var(--border-default)",
        overflow: "hidden",
      }}
    >
      <Cal
        namespace="strategy-call"
        calLink={CAL_LINK}
        config={{
          layout: "month_view",
          theme: "light",
        }}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "700px",
          overflow: "auto",
        }}
      />
    </div>
  );
}
