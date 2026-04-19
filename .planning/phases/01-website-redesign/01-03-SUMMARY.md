---
phase: 01-website-redesign
plan: 03
subsystem: homepage-sections
tags: [hero, services, case-studies, homepage]
dependency_graph:
  requires: [01-02]
  provides: [hero-section, services-section, case-studies-section, homepage-layout]
  affects: [01-04]
tech_stack:
  added: []
  patterns: [centered-hero, card-grid, scroll-animation, gradient-card-header]
key_files:
  created:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/ServicesSection.tsx
    - src/components/sections/CaseStudiesSection.tsx
  modified:
    - src/app/page.tsx
decisions:
  - "Removed all heavy 3D components (FireSphere/ThreeJS) from homepage"
  - "Hero is centered text layout matching Crator pattern, not 2-column split"
  - "Case study cards use gradient backgrounds with large metric text as visual"
  - "Single case studies section instead of split AI Agents + Custom Software"
metrics:
  duration: "~5 min"
  completed: "2026-04-20"
---

# Phase 01 Plan 03: Homepage Top Half Summary

**One-liner:** Clean Crator-style homepage with centered hero, 3-phase process cards, and 6-card case studies grid — all heavy 3D elements removed.

## What Was Done

### Task 1: Hero + Services Sections
- **HeroSection:** Centered layout, large heading with cyan accent, subtext, dual CTA buttons (primary/secondary), trusted-by bar with 6 client names, framer-motion fade-in animations
- **ServicesSection:** "OUR PROCESS" label, heading, 3-card grid (Week 1 / Week 2-3 / Ongoing), timeline badges, hover border effects, staggered scroll animations

### Task 2: Case Studies + Homepage Assembly
- **CaseStudiesSection:** 2-column card grid, gradient card headers with large metric text overlay, company name labels, description text, tech tags, clickable cards linking to /work/[slug], staggered scroll animations
- **page.tsx:** Complete rewrite — removed all FireSphere, animated-menu, hover-deck, ripple, ThreeJS imports. Clean composition: `<HeroSection /> + <ServicesSection /> + <CaseStudiesSection />`

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Task | Hash | Message |
|------|------|---------|
| 1 | `9d29b50` | feat(01-03): build Hero and Services sections matching Crator layout |
| 2 | `77c1c76` | feat(01-03): build Case Studies card grid and rewrite homepage |

## Self-Check: PASSED
- [x] src/components/sections/HeroSection.tsx exists (90+ lines)
- [x] src/components/sections/ServicesSection.tsx exists (60+ lines)
- [x] src/components/sections/CaseStudiesSection.tsx exists (90+ lines)
- [x] src/app/page.tsx rewritten with section imports
- [x] No FireSphere/ThreeJS/animated-menu imports in page.tsx
- [x] `npm run build` passes clean
- [x] Commit 9d29b50 exists
- [x] Commit 77c1c76 exists
