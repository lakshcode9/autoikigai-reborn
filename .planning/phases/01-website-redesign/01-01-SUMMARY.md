---
phase: 01-website-redesign
plan: 01
subsystem: research
tags: [reconnaissance, design-tokens, content-mapping]
dependency_graph:
  requires: []
  provides: [page-topology, design-tokens, behaviors, content-mapping]
  affects: [01-02, 01-03, 01-04]
tech_stack:
  added: []
  patterns: [crator-layout-adaptation, dark-theme-mapping]
key_files:
  created:
    - docs/research/PAGE_TOPOLOGY.md
    - docs/research/DESIGN_TOKENS.md
    - docs/research/BEHAVIORS.md
    - docs/research/CONTENT_MAPPING.md
    - docs/research/components/.gitkeep
    - docs/design-references/.gitkeep
  modified:
    - .gitignore
decisions:
  - "Dark theme stays — copying Crator LAYOUT not colors"
  - "Bebas Neue stays — our font identity"
  - "Single case studies section — don't split AI Agents and Custom Software"
  - "No Backed By bar — no investor logos available"
  - "Remove heavy 3D elements (FireSphere, ThreeJS) from homepage"
metrics:
  duration: "~5 min"
  completed: "2026-04-20"
---

# Phase 01 Plan 01: Reconnaissance & Research Summary

**One-liner:** Full Crator Labs site structure documented with 9-section topology, design token adaptation to dark theme, behavior specs, and content mapping to Autoikigai's reactivation agency positioning.

## What Was Done

### Task 1: Clone Reference Repo & Setup
- Cloned `ai-website-cloner-template` into `_cloner_temp/` for reference
- Added `_cloner_temp/` to `.gitignore`
- Created `docs/research/`, `docs/research/components/`, `docs/design-references/` directories

### Task 2: Crator Labs Reconnaissance
- **PAGE_TOPOLOGY.md:** Mapped all 9 homepage sections with layout types, content structure, and visual weight notes
- **DESIGN_TOKENS.md:** Extracted Crator's color palette, fonts, spacing, radius, shadows — with Autoikigai dark-theme adaptations for each
- **BEHAVIORS.md:** Documented navbar scroll behavior, hero animations, card hover states, FAQ accordion mechanics, scroll-triggered animations, responsive breakpoints
- **CONTENT_MAPPING.md:** Created detailed section-by-section mapping from Crator content → Autoikigai equivalents (e.g., "Audit/Build/Run" → "Audit & Discovery / Build & Configure / Deploy & Optimize")

## Deviations from Plan

None — plan executed exactly as written.

## Key Decisions Made

1. **Dark theme stays:** We're copying Crator's layout structure, NOT their light color scheme
2. **Merge project sections:** Crator has separate "AI Agents" and "Custom Software" sections; we'll use a single "Case Studies" section since we have 6 total
3. **Single founder section:** Adapt Crator's two-co-founder layout for a single founder
4. **No "Backed by" bar:** Skipping the investor/backer logo row
5. **Remove all heavy 3D elements:** FireSphere, ThreeJS, hover-deck-fx — match Crator's clean text-first approach

## Commits

| Task | Hash | Message |
|------|------|---------|
| 1 | `642249e` | chore(01-01): clone reference repo and set up research directories |
| 2 | `259e37a` | docs(01-01): complete Crator Labs reconnaissance and content mapping |

## Self-Check: PASSED
- [x] docs/research/PAGE_TOPOLOGY.md exists (9 sections documented)
- [x] docs/research/DESIGN_TOKENS.md exists (colors, fonts, spacing, radius, shadows)
- [x] docs/research/BEHAVIORS.md exists (navbar, hero, cards, FAQ, scroll, responsive)
- [x] docs/research/CONTENT_MAPPING.md exists (9 section mappings + pages + decisions)
- [x] _cloner_temp/ exists with cloned repo
- [x] _cloner_temp/ in .gitignore
- [x] Commit 642249e exists
- [x] Commit 259e37a exists
