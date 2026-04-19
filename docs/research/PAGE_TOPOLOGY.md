# Crator Labs — Page Topology

> Source: https://www.cratorlabs.ai/ (fetched 2026-04-20)

## Homepage Section Map (Top → Bottom)

### 1. Navbar
- **Layout:** Flex row, space-between, sticky top
- **Left:** Logo image + "Crator" text
- **Center:** Nav links (Services, Portfolio, Blog, About, Contact) — horizontal, spaced ~32px gap
- **Right:** Primary CTA button "Book a free strategy call" — filled, rounded-full
- **Mobile:** Hamburger icon opens full-screen or slide-out menu with same links + CTA
- **Behavior:** Sticky (`position: sticky; top: 0`), likely gains backdrop-blur/border on scroll
- **Max-width:** Full viewport width with inner padding (~px-6 to px-8)

### 2. Hero Section
- **Layout:** Centered text, single column, generous vertical padding (~py-24 to py-32)
- **Container:** Max-width ~1200px, centered
- **Content (top → bottom):**
  1. **Small label:** "About" or section indicator (optional, light text)
  2. **Main heading:** Very large, bold — "We are the AI Partner you need" (~text-5xl to text-7xl on desktop)
  3. **Subtext:** 1-2 sentences, muted text (~text-lg, lighter gray)
  4. **Two CTA buttons:** Row on desktop, stack on mobile
     - Primary: "Book a free strategy call" — filled button, dark bg or brand color, rounded-full
     - Secondary: "See our work" — outline/ghost button, rounded-full
  5. **"Trusted by" bar:** "Trusted by" label + horizontal row of 4 client logos (grayscale/muted)
  6. **"Backed by" bar:** "Backed by" label + horizontal row of 3 investor/partner logos
- **Animation:** Fade-in on load for heading + CTAs (likely framer-motion or CSS)
- **Visual weight:** HIGH — this is the most impactful section

### 3. Services Section (id="services")
- **Layout:** Section header centered + 3-column card grid below
- **Container:** Max-width ~1200px
- **Section label:** "Services" — small muted text above the heading
- **Heading:** "We help you make your business AI-native." (~text-4xl, bold)
- **Subtext:** Description paragraph (~text-lg, muted)
- **Three cards** in a row (grid-cols-3 desktop, stack mobile):
  - **Card 1 — Audit:**
    - Timeline badge: "Week 1–2" (small pill, muted bg)
    - Title: "Audit" (bold heading)
    - Description: 2-3 sentences about mapping workflows and finding opportunities
  - **Card 2 — Build:**
    - Timeline badge: "Week 2–4"
    - Title: "Build"
    - Description: Embedding within team, shipping AI systems
  - **Card 3 — Run:**
    - Timeline badge: "Ongoing"
    - Title: "Run"
    - Description: Deploying, monitoring, managing
- **Card styling:** Clean border, subtle bg, rounded-xl to rounded-2xl, ~p-6 to p-8
- **Hover:** Likely subtle border color change or shadow

### 4. AI Agents Section
- **Layout:** Section header + 2-column card grid (or 2x2 grid for 4 items)
- **Section label:** "AI Agents" — small muted text
- **Heading:** "We build AI agents that run your operations." (~text-4xl, bold)
- **Subtext:** Description about Telegram/WhatsApp/Slack agents
- **Four project cards** (2-column grid desktop):
  - Each card:
    - **Top image area:** Screenshot/illustration of the project (~200-250px tall, rounded corners, bg fill)
    - **Client logo:** Small company logo overlapping or near the image
    - **Title:** Project name (e.g., "Sales Agent") — bold
    - **Description:** 2-3 sentences about what it does
    - **Tech tags:** Row of pill badges ("Telegram", "CRM", "Sales", etc.) — small, muted bg
  - **Card styling:** Full card is clickable (links to /portfolio/[slug])
  - **Hover:** Border glow or subtle lift

### 5. Custom Software Section
- **Layout:** Same as AI Agents section — header + card grid
- **Section label:** "Custom Software"
- **Heading:** "We build the software your business runs on."
- **Subtext:** About turning spreadsheets into production software
- **Five project cards** (2-column grid, last row may have single card centered or left-aligned):
  - Same card structure as AI Agents cards
  - Different projects: ERP, Supply Chain ERP, GST Invoicing, Installment Tracker, AskWaai

### 6. About/Team Section
- **Layout:** Two side-by-side photos + bio text below (or 2-column: photos left, text right)
- **Section label:** "About"
- **Heading:** "Built by founders who've shipped."
- **Content:**
  - Two circular/rounded team photos side by side
  - Names: "Yajat Gulati & Shrivardhan Goenka"
  - Role: "Co-Founders"
  - Bio paragraph: ~3-4 sentences about their background
  - "Team from" label + logos: SAP, NTU Singapore
- **Link:** "Read our full story" → /about page

### 7. FAQ Section
- **Layout:** Centered, max-width ~800px, accordion list
- **Heading:** "Common questions"
- **12 FAQ items** — each is an expandable accordion:
  - Question text as trigger (click to toggle)
  - Answer text revealed below on expand
  - Chevron or plus/minus icon for open/close indicator
- **Behavior:** Click toggles individual items. Likely single-open (new click closes previous).
- **Animation:** Smooth height transition on expand/collapse

### 8. Final CTA Section
- **Layout:** Centered text block with CTA
- **Heading:** "Book a free 30-minute audit" (~text-3xl to text-4xl, bold)
- **Subtext:** "You'll leave with a clear list of what to automate, what to build, and what to skip. No pitch, no pressure."
- **CTA button:** "Book a free strategy call" — same styling as hero primary CTA
- **Background:** Possible subtle gradient or slightly different bg color to stand out

### 9. Footer
- **Layout:** Multi-row, centered
- **Row 1:** Logo icon + copyright text
- **Row 2:** Link row — Privacy, Terms, Security, About, Blog
- **Row 3:** Social links — X, LinkedIn (icons)
- **Mobile:** Likely stacks or rearranges for mobile
- **Styling:** Minimal, border-top separator, muted text

---

## Page-Level Notes

- **Overall theme:** Light/white background, dark text — clean, minimal, professional
- **Max-width:** ~1200px for content, full viewport for backgrounds
- **Section spacing:** ~80-120px vertical padding between sections (py-20 to py-32)
- **Responsive breakpoints:** ~768px (tablet) and ~640px (mobile) based on standard Tailwind
- **z-index layers:** Navbar at z-50 (sticky), everything else in normal flow
- **No parallax or scroll-snap observed** — standard smooth scrolling
- **Portfolio page (/portfolio):** Separate page with filterable grid of ALL project cards (both agents + software + products)
