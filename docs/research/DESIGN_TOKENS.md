# Crator Labs — Design Tokens (Reference)

> Source: https://www.cratorlabs.ai/ (fetched 2026-04-20)
> 
> **IMPORTANT:** We are NOT using Crator's light theme. We're adapting their LAYOUT to Autoikigai's dark theme. This document captures Crator's design system for reference, with Autoikigai adaptations noted.

---

## Colors

### Crator Original (Light Theme)
- **Background:** White (#ffffff) / very light gray (#fafafa)
- **Text primary:** Dark gray/near-black (#111827 or similar)
- **Text secondary/muted:** Medium gray (#6B7280 or similar)
- **Accent/CTA:** Dark button (near black or dark blue) with white text
- **Card backgrounds:** White or very light gray (#f9fafb)
- **Card borders:** Light gray (#e5e7eb)
- **Tag/badge bg:** Light gray (#f3f4f6) with dark text
- **Section dividers:** Very subtle gray borders or spacing only
- **Logo bar (Trusted by):** Grayscale/muted logos

### Autoikigai Adaptation (Dark Theme — WHAT WE USE)
- **Background:** Black (#000000)
- **Text primary:** White (#ffffff)
- **Text secondary/muted:** White at 60-70% opacity (rgba(255,255,255,0.6))
- **Accent/CTA:** Cyan (#00E0FF) — our brand color
- **CTA button:** `bg-[#00E0FF] text-black` (inverted from Crator's dark-on-light)
- **Card backgrounds:** `bg-white/5` or `bg-zinc-950`
- **Card borders:** `border-white/10`
- **Tag/badge bg:** `bg-white/10 text-white/60`
- **Section dividers:** `border-t border-white/5`
- **Hover states:** `border-[#00E0FF]/30` or `hover:bg-white/10`

## Fonts

### Crator Original
- **Headings:** Clean sans-serif (likely Inter or system default from Next.js)
- **Body:** Same sans-serif
- **Weight range:** 400 (body), 600 (semi-bold subheads), 700-800 (headings)

### Autoikigai Adaptation
- **Primary:** Bebas Neue (already loaded via next/font/google) — used for headings AND body
- **Headings:** Bebas Neue, font-bold, tracking-tight
- **Body/UI text:** Bebas Neue with tracking-wide
- **Monospace (labels):** Space Mono (already in globals.css)
- **Keep existing font stack** — don't change fonts to match Crator

## Typography Scale

### Crator Section Headings (approximate)
- **Hero heading:** ~48px to 72px (text-5xl to text-7xl)
- **Section heading:** ~36px to 48px (text-4xl to text-5xl)
- **Card title:** ~20px to 24px (text-xl to text-2xl)
- **Body text:** ~16px to 18px (text-base to text-lg)
- **Small labels/badges:** ~12px to 14px (text-xs to text-sm)
- **Section labels:** ~14px, uppercase, letter-spacing wide, muted

### Autoikigai Adaptation
- **Hero heading:** text-6xl to text-8xl (Bebas Neue goes BIG)
- **Section heading:** text-4xl to text-6xl
- **Card title:** text-xl to text-2xl, font-bold
- **Body text:** text-base to text-lg, font-bebas, tracking-wide
- **Labels:** text-xs, uppercase, tracking-[0.2em], text-[#00E0FF] or text-white/60

## Spacing

### Crator Patterns
- **Container max-width:** ~1200px (max-w-7xl or custom max-w-[1200px])
- **Container padding (horizontal):** ~24px to 32px (px-6 to px-8)
- **Section vertical padding:** ~80px to 128px (py-20 to py-32)
- **Card grid gap:** ~24px to 32px (gap-6 to gap-8)
- **Card internal padding:** ~24px to 32px (p-6 to p-8)
- **Between heading and content:** ~16px to 24px (mb-4 to mb-6)
- **Between section label and heading:** ~8px to 12px (mb-2 to mb-3)

### Autoikigai Adaptation
- **Container max-width:** `max-w-[1200px]` (narrower than current max-w-[1600px])
- **Container padding:** `px-8 md:px-16 lg:px-20`
- **Section vertical padding:** `py-24 md:py-32`
- **Card grid gap:** `gap-6 md:gap-8`
- **Card internal padding:** `p-6 md:p-8`

## Border Radius

### Crator
- **Cards:** Larger radius — ~16px to 24px (rounded-2xl to rounded-3xl)
- **Buttons:** Fully rounded (rounded-full) for CTAs
- **Tags/badges:** Fully rounded (rounded-full)
- **Images in cards:** Rounded corners matching card (~rounded-xl)

### Autoikigai Adaptation
- **Cards:** `rounded-2xl` (consistent with current site)
- **Buttons:** `rounded-full` (already used)
- **Tags:** `rounded-full`

## Shadows & Elevation

### Crator
- **Cards at rest:** Very subtle or no shadow
- **Cards on hover:** Subtle shadow lift (box-shadow with low opacity)
- **No heavy glow effects** — Crator is clean and flat

### Autoikigai Adaptation
- **Cards at rest:** `border border-white/10` (dark theme uses borders over shadows)
- **Cards on hover:** `border-[#00E0FF]/30 shadow-[0_0_20px_rgba(0,224,255,0.1)]` (subtle cyan glow)
- **Keep glow subtle** — don't overdo it, match Crator's restraint

## Component Patterns

### Section Pattern (Repeated Across Site)
```
<section className="py-24 md:py-32">
  <div className="max-w-[1200px] mx-auto px-8 md:px-16">
    {/* Optional section label */}
    <p className="text-sm text-[#00E0FF] tracking-[0.2em] uppercase mb-3">SECTION_LABEL</p>
    {/* Section heading */}
    <h2 className="text-4xl md:text-5xl font-bebas font-bold tracking-tight mb-4">HEADING</h2>
    {/* Section subtext */}
    <p className="text-lg text-white/60 max-w-2xl mb-12">Subtext here...</p>
    {/* Section content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Card Pattern (Project Cards)
```
<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00E0FF]/30 transition-all group cursor-pointer">
  {/* Image area */}
  <div className="h-48 bg-gradient-to-br from-[#00E0FF]/10 to-transparent p-4">
    {/* Project screenshot or gradient placeholder */}
  </div>
  {/* Content */}
  <div className="p-6">
    <h3 className="text-xl font-bebas font-bold mb-2">Title</h3>
    <p className="text-white/60 text-sm mb-4">Description</p>
    <div className="flex flex-wrap gap-2">
      <span className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-full">Tag</span>
    </div>
  </div>
</div>
```

### CTA Button Pattern
```
{/* Primary */}
<a className="inline-flex items-center gap-2 px-8 py-4 bg-[#00E0FF] text-black font-bebas font-bold tracking-widest rounded-full hover:bg-[#00c2dd] transition-all">
  BOOK A FREE STRATEGY CALL
</a>
{/* Secondary/Ghost */}
<a className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bebas font-bold tracking-widest rounded-full hover:bg-white/5 transition-all">
  SEE OUR WORK
</a>
```
