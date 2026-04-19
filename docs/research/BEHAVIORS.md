# Crator Labs — Behaviors & Interactions

> Source: https://www.cratorlabs.ai/ (fetched 2026-04-20)

---

## Navbar Behavior
- **Sticky:** `position: sticky; top: 0; z-index: 50`
- **On scroll:** Likely gains `backdrop-blur-md` and subtle `border-bottom` (common Next.js pattern)
- **Mobile:** Hamburger icon toggles a mobile menu overlay/drawer
- **Nav links:** Hover color change (muted → primary)
- **CTA button:** Standard hover state (slight color shift or scale)

### Autoikigai Implementation
- Use `useEffect` + `useState` for scroll detection (or IntersectionObserver)
- Add `backdrop-blur-md bg-black/80` when scrolled past ~50px
- Mobile: framer-motion `AnimatePresence` for slide-in menu

## Hero Animations
- **On load:** Elements likely fade in with stagger
  - Heading: `opacity: 0 → 1, y: 20 → 0` over ~0.6s
  - Subtext: Same with ~0.2s delay
  - CTAs: Same with ~0.4s delay
  - Logo bars: Fade in last with ~0.6s delay
- **No scroll-driven animation** in the hero — it's load-triggered only

### Autoikigai Implementation
- framer-motion `initial={{ opacity: 0, y: 20 }}` / `animate={{ opacity: 1, y: 0 }}`
- Staggered `transition={{ delay: N * 0.15 }}`

## Service Cards
- **Hover:** Subtle border color change or shadow shift
- **Not clickable** — they're informational cards, not links
- **No animation on load** visible — may use `whileInView` fade-in

### Autoikigai Implementation
- `hover:border-[#00E0FF]/30 transition-colors duration-300`
- framer-motion `whileInView={{ opacity: 1, y: 0 }}` with stagger per card

## Project Cards (AI Agents & Custom Software)
- **Clickable:** Entire card is a Link to `/portfolio/[slug]`
- **Hover:** Border glow/lift, possible image zoom or overlay shift
- **Tag pills:** Static, no hover state
- **Card image area:** Contains a screenshot/SVG — may have subtle hover zoom
- **Animation:** Cards likely fade/slide in on scroll (whileInView)

### Autoikigai Implementation
- Wrap card in `<Link href="/work/[id]">`
- `group` class on card, `group-hover:border-[#00E0FF]/30`
- Optional: `group-hover:scale-[1.02]` on image area
- framer-motion `whileInView` with index-based stagger

## FAQ Accordion
- **Behavior:** Click question → toggles answer visibility
- **Likely single-open:** Opening one closes the previous (standard UX pattern)
- **Animation:** Smooth height transition — answer slides down, not instant show/hide
- **Icon:** Chevron or plus/minus that rotates on open/close
- **Hover:** Question text may get color change on hover

### Autoikigai Implementation
- `useState<number | null>(null)` for active index
- framer-motion `AnimatePresence` + `motion.div` for answer:
  ```tsx
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
  ```
- Lucide `ChevronDown` with `rotate-180` when open
- `cursor-pointer hover:text-[#00E0FF]` on question text

## Scroll Animations (Global)
- **Sections:** Many sections use scroll-triggered fade-in
- **Pattern:** Elements start `opacity: 0, translateY: 20-30px` and animate to `opacity: 1, translateY: 0`
- **Trigger:** IntersectionObserver / framer-motion `whileInView`
- **No parallax** observed
- **No scroll-snap** observed
- **No smooth scroll library** (Lenis, etc.) detected — standard browser scroll
- **Stagger:** Multiple items in a section (cards, list items) stagger their entrance by ~0.1s each

### Autoikigai Implementation
- Use framer-motion `whileInView` consistently across all sections
- Default animation: `initial={{ opacity: 0, y: 20 }}` / `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true }}` to prevent re-triggering
- Card stagger: `transition={{ delay: index * 0.1 }}`

## Responsive Behavior
- **Desktop (1440px):** Full layout — multi-column grids, side-by-side elements
- **Tablet (~768px):** 
  - Card grids: 3-col → 2-col
  - Navbar: Hamburger menu appears
  - Hero: Text stays centered but font sizes reduce
  - About section: Stacks vertically
- **Mobile (~390px):**
  - Card grids: 2-col → 1-col (full width cards)
  - Section heading sizes reduce significantly
  - CTAs may stack vertically
  - Padding reduces
  - FAQ: Full width

### Autoikigai Implementation
- Standard Tailwind responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Font sizes: `text-4xl md:text-5xl lg:text-6xl`
- Padding: `px-6 md:px-8 lg:px-16`
- Mobile nav: `md:hidden` for hamburger, `hidden md:flex` for desktop links

## Page Transitions
- **No page transitions** observed between routes — standard Next.js navigation
- **No loading indicators** beyond browser default

## Footer Behavior
- **Static** — no scroll animations or interactions
- **Links:** Standard hover color change
- **Social icons:** Standard hover color/opacity change
