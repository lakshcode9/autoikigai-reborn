# Crator → Autoikigai Content Mapping

> Maps each Crator Labs section to the Autoikigai equivalent content.

---

## Section-by-Section Mapping

### 1. Navbar

| Crator | Autoikigai |
|--------|------------|
| Logo: Crator AI | Logo: Autoikigai (`/autoikigai-logo.png` + "AUTOIKIGAI") |
| Links: Services, Portfolio, Blog, About, Contact | Links: Services (#services), Work (#case-studies), Reactivation (/reactivation), Contact (cal.com) |
| CTA: "Book a free strategy call" | CTA: "Book a Free Strategy Call" → `https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses` |

### 2. Hero Section

| Crator | Autoikigai |
|--------|------------|
| Heading: "We are the AI Partner you need" | Heading: "We Turn Your Dead Leads Into Booked Appointments" |
| Subtext: "We find where AI moves the needle..." | Subtext: "Your CRM is a graveyard of unclosed estimates and lapsed clients. Our AI agents run 24/7 to wake them up and book them straight to your calendar." |
| CTA 1: "Book a free strategy call" | CTA 1: "Book a Free Strategy Call" → cal.com link |
| CTA 2: "See our work" | CTA 2: "See Our Results" → #case-studies anchor |
| "Trusted by" logos: Flow Coffee, Kinetic, LM Trading, NTU | "Trusted by" text badges: Connect Group, Crawford Thomas, Vention, ForPlayers, HelpCare AI, FabuLingua |
| "Backed by" logos: Block71, gradCapital, NTUtive | SKIP — we don't have investor backing to show |

### 3. Services Section

| Crator | Autoikigai |
|--------|------------|
| Section label: "Services" | Section label: "OUR PROCESS" |
| Heading: "We help you make your business AI-native." | Heading: "We Handle Everything From Audit to Deployment." |
| Subtext: "From figuring out use-cases..." | Subtext: "From mapping your dead leads to deploying AI agents and optimizing campaigns — we handle the entire reactivation pipeline so you can focus on running your business." |
| **Card 1 — Audit (Week 1-2):** Map workflows, find opportunities | **Card 1 — Audit & Discovery (Week 1):** Plug into CRM, map dead lead graveyard, identify highest-value reactivation targets |
| **Card 2 — Build (Week 2-4):** Embed in team, ship AI systems | **Card 2 — Build & Configure (Week 2-3):** Build AI reactivation system — SMS sequences, voice agents, email drips, CRM integration |
| **Card 3 — Run (Ongoing):** Deploy, monitor, manage | **Card 3 — Deploy & Optimize (Ongoing):** Launch, monitor, optimize. Weekly reports, booked appointments, continuous tuning |

### 4. AI Agents Section → Case Studies (Primary)

| Crator | Autoikigai |
|--------|------------|
| Section label: "AI Agents" | Section label: "CLIENT RESULTS" |
| Heading: "We build AI agents that run your operations." | Heading: "Real Systems. Real Revenue." |
| Subtext: About Telegram/WhatsApp/Slack agents | Subtext: "Here's what happens when you stop losing money to dead leads." |
| **4 project cards** (Sales Agent, Ops Agent, Support Agent, HourSense) | **6 case study cards** from existing `CASE_STUDIES`: Connect Group ($105K), Crawford Thomas ($100K), Vention ($85K), ForPlayers (€70K), HelpCare AI (4 Clients), FabuLingua (5 Clients) |
| Card: screenshot + logo + title + description + tech tags | Card: gradient/metric visual + company name + description + tags |
| Links to: /portfolio/[slug] | Links to: /work/[slug] (existing routes) |

### 5. Custom Software Section → MERGE into Case Studies

| Crator | Autoikigai |
|--------|------------|
| Separate section with 5 more project cards | **NOT NEEDED** — all 6 case studies are shown in section 4 |
| N/A | Instead, we can show "Reactivation Systems" or just keep the single case studies grid |

**Decision:** Merge AI Agents + Custom Software into ONE section since Autoikigai only has 6 case studies total. Don't split them artificially.

### 6. About/Team Section

| Crator | Autoikigai |
|--------|------------|
| Heading: "Built by founders who've shipped." | Heading: "Built By Someone Who Ships." |
| Two co-founder photos side by side | Single founder visual (use Autoikigai logo or a styled placeholder) |
| Names: Yajat Gulati & Shrivardhan Goenka | Name: Laksh — Founder |
| Bio: Team of AI-native engineers... | Bio: "I build autonomous AI systems for businesses tired of losing money to human limitations. I've helped companies generate over $500K+ in recovered revenue using AI agents that never sleep, never forget, and never give up on a lead." |
| "Team from" logos: SAP, NTU | "Built with" badges: Supabase, OpenAI, n8n (tech stack) |
| Link: "Read our full story" → /about | Link: SKIP or link to /reactivation for more details |

### 7. FAQ Section

| Crator | Autoikigai |
|--------|------------|
| Heading: "Common questions" | Heading: "Common Questions" |
| 12 FAQ items about Crator's services | 7 FAQ items about Autoikigai's reactivation service |
| Topics: What is Crator, pricing, timeline, tech | Topics: What is Autoikigai, how it differs from reps, industries, pricing, results timeline, CRM compatibility, ongoing support |

### 8. Final CTA Section

| Crator | Autoikigai |
|--------|------------|
| Heading: "Book a free 30-minute audit" | Heading: "Stop Losing Money to Dead Leads" |
| Subtext: "You'll leave with a clear list..." | Subtext: "Book a free 30-minute strategy call. You'll leave with a clear action plan — which leads to reactivate, which channels to use, and projected ROI. No pitch, no pressure." |
| CTA: "Book a free strategy call" | CTA: "Book a Free Strategy Call" → cal.com link |

### 9. Footer

| Crator | Autoikigai |
|--------|------------|
| Logo icon + "© 2026 Context AI Technologies" | Logo + "© 2026 AUTOIKIGAI" |
| Links: Privacy, Terms, Security, About, Blog | Links: Home, Reactivation, Work, Contact |
| Social: X, LinkedIn | Social: SKIP for now (or placeholder #) |

---

## Pages Mapping

| Crator Page | Autoikigai Equivalent |
|-------------|----------------------|
| Homepage (/) | Homepage (/) — being rebuilt |
| /portfolio | /work — already exists with case study list |
| /portfolio/[slug] | /work/[slug] — already exists with case study details |
| /about | NOT building — about info goes on homepage |
| /blog | NOT building — no blog |
| /contact-us | External — cal.com booking link |
| N/A | /reactivation — KEEP as-is (detailed reactivation pitch page) |
| N/A | /offer — KEEP as-is (service offer details) |
| N/A | /demo — KEEP as-is (live simulation) |

---

## Key Decisions

1. **Dark theme stays** — We're copying Crator's LAYOUT not their light color scheme
2. **Bebas Neue stays** — Our font, not Crator's sans-serif
3. **Single case studies section** — Don't split into "AI Agents" and "Custom Software"
4. **No "Backed by" bar** — We don't have investor logos to show
5. **Single founder, not two** — Adapt the about section accordingly
6. **Keep /reactivation page** — This is the detailed pitch page the user wants preserved
7. **Remove heavy 3D elements** — No more FireSphere, ThreeJS on homepage. Match Crator's clean, text-first approach.
8. **cal.com link** — All CTA buttons go to: `https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses`
