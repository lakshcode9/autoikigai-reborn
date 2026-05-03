"use client";

import React from "react";
import {
  Shield,
  AlertTriangle,
  Lock,
  Network,
  Terminal,
  FileKey,
  Eye,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/content";

/* ── animation presets ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const THREATS = [
  {
    num: "400+",
    label: "Brute-force login attempts per day on an unprotected VPS",
  },
  {
    num: "<5m",
    label: "Time before automated bots discover a newly provisioned server",
  },
  {
    num: "100%",
    label: "Of default OpenClaw installations ship with open attack surface",
  },
];

const HARDENING_STEPS = [
  {
    step: "01",
    title: "Firewall Configuration",
    subtitle: "UFW Ruleset",
    icon: (
      <Shield className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "All incoming traffic must be denied by default. Only authenticated SSH connections are permitted through explicit allow rules. Requires configuring deny/allow rulesets, verifying rule ordering, and ensuring daemon persistence across reboots.",
    code: `# Install and apply baseline firewall rules
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh

# Enable — rule ordering matters
ufw --force enable`,
    warn: null,
  },
  {
    step: "02",
    title: "Brute-Force Protection",
    subtitle: "Fail2ban Service",
    icon: (
      <Eye className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "Fail2ban monitors authentication logs and automatically bans IPs with repeated failed attempts. Requires jail policy configuration, ban threshold tuning, and log path verification for your specific Linux distribution.",
    code: `# Install and enable the service
apt install -y fail2ban
systemctl enable --now fail2ban

# Jail config: /etc/fail2ban/jail.local
# Requires per-service threshold tuning`,
    warn: null,
  },
  {
    step: "03",
    title: "SSH Key-Only Authentication",
    subtitle: "Password Login Disabled",
    icon: (
      <Lock className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "Password-based SSH must be disabled entirely. Key-based authentication is the only acceptable method. This involves modifying sshd_config, configuring authorized key paths, setting PermitRootLogin policy, and restarting the SSH daemon.",
    code: `# Disable password auth — keys only
sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' \\
  /etc/ssh/sshd_config
echo "PermitRootLogin prohibit-password" > \\
  /etc/ssh/sshd_config.d/hardening.conf
systemctl restart ssh`,
    warn: "Ensure your SSH key is deployed to ~/.ssh/authorized_keys BEFORE executing. Misconfiguration results in permanent server lockout with no recovery path.",
  },
  {
    step: "04",
    title: "Private Network Overlay",
    subtitle: "Tailscale Mesh VPN",
    icon: (
      <Network className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "Tailscale creates an encrypted mesh VPN between your devices. Once configured, SSH and the OpenClaw dashboard become completely invisible to the public internet. Requires ACL policy configuration and device authorization via admin console.",
    code: `# Install private network overlay
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up

# Restrict SSH to private network ONLY
ufw allow in on tailscale0 to any port 22
ufw delete allow 22/tcp

# Requires Tailscale ACL policy setup
# and device auth via admin console`,
    warn: null,
  },
  {
    step: "05",
    title: "Config & API Key Permissions",
    subtitle: "File-Level Access Control",
    icon: (
      <FileKey className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "OpenClaw stores API keys and model tokens in plaintext config files. Default permissions allow any user or process on the server to read these credentials. File permissions must be restricted to owner-only (600).",
    code: `# Lock down config files
chmod 600 ~/.openclaw/openclaw.json
chmod 600 ~/.openclaw/.env

# Verify permissions (should show -rw-------)
ls -la ~/.openclaw/`,
    warn: null,
  },
  {
    step: "06",
    title: "Gateway Binding & Secure Dashboard",
    subtitle: "Loopback + Tailscale Serve",
    icon: (
      <Terminal className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
    ),
    desc: "The OpenClaw gateway must be bound to loopback only \u2014 never exposed on a public interface. The management dashboard should be served exclusively through Tailscale\u2019s encrypted HTTPS layer. Requires gateway config modification and Tailscale Serve certificate setup.",
    code: `# In your OpenClaw config:

# Bind to loopback — never expose to internet
gateway.bind = "loopback"

# Enable Tailscale Serve for HTTPS dashboard
gateway.tailscale.mode = "serve"

# Dashboard: https://your-machine.your-tailnet.ts.net
# Requires Tailscale Serve cert + DNS propagation`,
    warn: null,
  },
];

const CHECKLIST = [
  "Firewall deny-all policy with explicit SSH allowlist and rule persistence verification",
  "Fail2ban jail policies with tuned ban thresholds and distribution-specific log paths",
  "SSH key-only auth with password login disabled and lockout prevention confirmed",
  "Tailscale mesh VPN with ACL policies, device authorization, and public port removal",
  "Config file permissions locked to owner-only (600) for all .env and .json files",
  "Gateway bound to loopback with Tailscale Serve HTTPS and certificate configuration",
  "SOUL.md agent personality with business context, communication boundaries, and safety rules",
  "AGENTS.md operating manual with memory system, crash recovery, and data exfiltration guards",
  "Ongoing monitoring: Fail2ban logs, SSH access patterns, memory file audits, package updates",
];

export default function OpenClawSecurityPage() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="section flex flex-col justify-center min-h-[55vh]">
        <motion.div {...fadeUp()} className="max-w-3xl">
          <p className="section-label mb-4">Security Advisory</p>

          <h1
            className="text-[clamp(2.25rem,7.5vw,3rem)] md:text-[40px] lg:text-[48px] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            OpenClaw VPS{" "}
            <span className="text-accent">Security Hardening</span>
          </h1>

          <div
            className="pl-4 mb-6"
            style={{ borderLeft: "2px solid var(--accent-color)" }}
          >
            <p className="section-label" style={{ marginBottom: "4px" }}>
              Infrastructure &middot; VPS &middot; AI Agent Deployment
            </p>
            <p
              className="text-[0.8125rem] leading-[1.7] max-w-xl"
              style={{ color: "var(--text-muted)" }}
            >
              Your AI agent runs on your server with full access to your APIs,
              business data, and client communications. A default installation is
              an open door. This guide covers what needs to be locked down before
              your agent handles anything real.
            </p>
          </div>

          <p
            className="text-[0.75rem] mb-8"
            style={{
              color: "var(--text-muted)",
              fontFamily:
                "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
            }}
          >
            Applies to: Hostinger, DigitalOcean, Hetzner, Vultr, and all
            VPS-hosted OpenClaw deployments.
          </p>
        </motion.div>
      </section>

      {/* ============ THREAT LANDSCAPE ============ */}
      <section
        className="section"
        style={{ background: "var(--accent-color)" }}
      >
        <motion.div {...fadeUp()}>
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Threat Landscape
          </p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-8"
            style={{ color: "#fff" }}
          >
            A fresh VPS is under attack{" "}
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              within minutes.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {THREATS.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="py-6 md:py-8 md:pr-8"
                style={{
                  borderBottom:
                    i < THREATS.length - 1
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "none",
                }}
              >
                <span
                  className="block text-[2.5rem] md:text-[3rem] font-bold tracking-[-0.04em] leading-none mb-2"
                  style={{
                    color: "#fff",
                    fontFamily:
                      "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  }}
                >
                  {t.num}
                </span>
                <span
                  className="text-[0.8125rem] leading-[1.5]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {t.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-8 p-5 md:p-6"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[0.8125rem] md:text-[0.875rem] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <strong style={{ color: "#fff" }}>Real audit data:</strong> We
              checked a client&apos;s server before hardening &mdash;{" "}
              <strong style={{ color: "#fff" }}>
                400+ failed SSH login attempts in a single day
              </strong>
              . Automated bots constantly scan for open servers. If you&apos;re
              running OpenClaw on a default VPS configuration, your API keys,
              model tokens, and business data are exposed.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============ HARDENING STEPS ============ */}
      <section className="section">
        <motion.div {...fadeUp()}>
          <p className="section-label">Required Configuration</p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Security hardening steps
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-10 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Each step below addresses a specific attack vector. Skipping any of
            them leaves your deployment vulnerable to data exfiltration,
            unauthorized agent control, or complete server compromise.
          </p>
        </motion.div>

        <div className="space-y-0">
          {HARDENING_STEPS.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.05)}
              className="py-8 md:py-10"
              style={{ borderBottom: "1px dashed var(--border-default)" }}
            >
              {/* header row */}
              <div className="flex items-start gap-4 md:gap-6 mb-4">
                <span className="step-number text-2xl md:text-3xl block flex-shrink-0 mt-1">
                  {item.step}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    {item.icon}
                    <h3
                      className="text-lg md:text-xl font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-[0.75rem]"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily:
                        "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                    }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* description */}
              <p
                className="text-[0.8125rem] leading-[1.7] mb-5 md:pl-[calc(2rem+24px)] max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.desc}
              </p>

              {/* code block */}
              <div className="md:pl-[calc(2rem+24px)]">
                <div
                  className="p-4 md:p-5 overflow-x-auto"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px dashed var(--border-default)",
                  }}
                >
                  <pre
                    className="text-[0.6875rem] md:text-[0.75rem] leading-[1.8] whitespace-pre-wrap"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily:
                        "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                    }}
                  >
                    {item.code}
                  </pre>
                </div>

                {item.warn && (
                  <div
                    className="mt-3 p-4 flex items-start gap-3"
                    style={{
                      background: "rgba(234, 179, 8, 0.06)",
                      border: "1px solid rgba(234, 179, 8, 0.2)",
                    }}
                  >
                    <AlertTriangle
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: "#ca8a04" }}
                    />
                    <p
                      className="text-[0.75rem] leading-[1.6]"
                      style={{ color: "#92400e" }}
                    >
                      {item.warn}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ AGENT CONFIG ============ */}
      <section
        className="section"
        style={{ background: "var(--bg-elevated)" }}
      >
        <motion.div {...fadeUp()}>
          <p className="section-label">Agent Configuration</p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Your agent&apos;s brain needs boundaries
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-8 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            OpenClaw agents operate from two core files. Without proper
            configuration, your agent has no identity constraints, no recovery
            protocol, and no safety boundaries.
          </p>
        </motion.div>

        <div className="grid-bordered grid grid-cols-1 md:grid-cols-2">
          <motion.div
            {...fadeUp(0)}
            className="grid-cell flex flex-col min-h-[220px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="step-number text-2xl">01</span>
              <div>
                <h3
                  className="text-base font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  SOUL.md
                </h3>
                <span className="code-tag">Agent Personality</span>
              </div>
            </div>
            <p
              className="text-[0.8125rem] leading-[1.7] mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Defines who your agent is &mdash; its rules, boundaries, business
              context, and communication constraints. A well-written SOUL.md is
              the difference between a useful agent and an uncontrolled chatbot
              sending messages on your behalf.
            </p>
            <div
              className="mt-auto pt-4 flex flex-wrap gap-2"
              style={{ borderTop: "1px dashed var(--border-default)" }}
            >
              {[
                "Core rules",
                "Business context",
                "Boundaries",
                "Tone & voice",
              ].map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="grid-cell flex flex-col min-h-[220px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="step-number text-2xl">02</span>
              <div>
                <h3
                  className="text-base font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  AGENTS.md
                </h3>
                <span className="code-tag">Operating Manual</span>
              </div>
            </div>
            <p
              className="text-[0.8125rem] leading-[1.7] mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              The operational playbook. How your agent reads memory, recovers
              from crashes, and maintains continuity between sessions. Without
              this, every restart is amnesia &mdash; your agent forgets
              everything and starts from zero.
            </p>
            <div
              className="mt-auto pt-4 flex flex-wrap gap-2"
              style={{ borderTop: "1px dashed var(--border-default)" }}
            >
              {[
                "Session startup",
                "Memory system",
                "Crash recovery",
                "Safety protocols",
              ].map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FULL CHECKLIST ============ */}
      <section className="section">
        <motion.div {...fadeUp()}>
          <p className="section-label">Complete Checklist</p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Minimum requirements before going live
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-8 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Every item below is required before your OpenClaw agent should touch
            real business data or client communications.
          </p>
        </motion.div>

        <div className="space-y-0">
          {CHECKLIST.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.03)}
              className="flex items-start gap-4 py-4"
              style={{ borderBottom: "1px dashed var(--border-default)" }}
            >
              <span className="step-number flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[0.8125rem] leading-[1.6]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ WARNING BLOCK ============ */}
      <section
        className="section"
        style={{ background: "var(--accent-color)" }}
      >
        <motion.div {...fadeUp()} className="max-w-2xl">
          <p
            className="section-label"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Advisory
          </p>
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-6"
            style={{ color: "#fff" }}
          >
            This is infrastructure work.{" "}
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              Not a tutorial.
            </span>
          </h2>
          <div
            className="p-5 md:p-6"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[0.875rem] md:text-[1rem] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Each step above involves multiple configuration files, service
              dependencies, and potential failure modes. An incorrect firewall
              rule can lock you out permanently. A misconfigured Tailscale ACL
              leaves your dashboard exposed. Incomplete SOUL.md boundaries mean
              your agent could send unauthorized messages on your behalf.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section" style={{ borderBottom: "none" }}>
        <motion.div {...fadeUp()} className="max-w-2xl">
          <h2
            className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.08] tracking-[-0.04em] font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Need help setting this up?{" "}
            <span className="text-accent">We handle the infrastructure.</span>
          </h2>
          <p
            className="text-[0.8125rem] leading-[1.7] mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            We deploy and secure OpenClaw instances for businesses. All
            hardening, agent configuration, and ongoing monitoring included.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book a setup call
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
