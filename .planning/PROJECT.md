# Autoikigai — Client Reactivation Agency

> **Mission:** Help local service businesses turn their dead lead graveyards into booked appointments using AI-powered SMS & email reactivation sequences.

---

## 🏢 Business Model

| Item | Detail |
|------|--------|
| **Agency Name** | Autoikigai |
| **Service** | AI-powered client reactivation (dead/old lead revival) |
| **Setup Fee** | $2,000 per client |
| **Success Fee** | $50–$100 per reactivated lead (booked appointment) |
| **Target Market** | US & UK local service businesses |
| **Delivery** | Automated SMS drip sequences + email follow-ups via AI agents |

---

## 🎯 Five Niches

| # | Niche | US Leads | UK Leads | Pain Point Hook |
|---|-------|----------|----------|-----------------|
| 1 | 🛣️ Commercial Paving & Sealcoating | 162 | 90 | "You quoted 200 driveways last year. How many ghosted you?" |
| 2 | 🔥 Commercial Fire & Security | 151 | 83 | "Every expired fire safety quote is a compliance risk someone else will close." |
| 3 | 🧹 Commercial Janitorial | 144 | 102 | "Your old facility manager contacts moved buildings — but they still need cleaning." |
| 4 | 🌳 Arborist / Tree Care | 162 | 10 | "Storm season is coming. Every old estimate is a homeowner who still has that tree." |
| 5 | 😴 Sleep Apnea Clinics | 153 | 100 | "60% of CPAP patients abandon treatment. Those are YOUR patients." |

**Total leads in pipeline:** 1,157 (772 US + 385 UK)

---

## 🔧 Tech Stack (Recommended)

### Core Delivery Stack
| Layer | Tool | Cost | Purpose |
|-------|------|------|---------|
| **SMS AI Agent** | Salesmessage (Salesmsg) | ~$50-100/mo | Primary reactivation channel — AI-powered two-way SMS conversations |
| **Email Drip** | GoHighLevel or Instantly | ~$97/mo (GHL) | Secondary channel — automated email sequences for leads with email addresses |
| **CRM (Internal)** | Supabase (existing) | Free tier | Our lead pipeline tracking — already built and running |
| **CRM (Client-Facing)** | Salesmessage built-in | Included | Track reactivation status per client |
| **Phone Numbers** | Twilio or Salesmessage | ~$1-2/number/mo | Dedicated local numbers per niche/region |
| **Lead Enrichment** | Exa AI Websets | Existing | Already operational — auto-generating leads |

### Why SMS-First (Not AI Voice)
- **SMS response rate:** 26.6% conversion uplift on dead leads
- **AI voice pick-up rate:** <20% on cold/dead contacts
- **SMS ROI:** 42.5x in reactivation campaigns
- **Compliance:** SMS opt-in is simpler than TCPA voice calling rules
- **Cost:** ~$0.01-0.03 per SMS vs $0.10-0.50 per AI voice minute

### Channel Priority
1. **SMS drip** (primary — highest ROI, lowest friction)
2. **Email drip** (secondary — for leads with email only, or as reinforcement)
3. **AI voice** (future — only after SMS/email prove unit economics)

---

## 📞 Outreach Pipeline (Selling the Service)

### Current Assets
- **Cold callers** — actively calling leads from Supabase CRM
- **Cold calling scripts** — niche-specific hooks documented in SCRIPTS.md
- **CRM** — Kanban pipeline (New → Contacted → Interested → Follow Up → Closed Won)
- **Lead generation** — Exa AI websets generating 100 leads/niche/country

### Outreach Sequence (Selling to Prospects)
```
Day 0: Cold call (callers use SCRIPTS.md hooks)
Day 0: Send personalized Loom video via email (if reached decision maker)
Day 1: Follow-up SMS with Loom link
Day 3: Email follow-up with case study / ROI breakdown
Day 5: Second call attempt (if no response)
Day 7: Final "breakup" email
```

### Loom Video Strategy
**YES — you need 5 separate Looms.** Each niche has fundamentally different:
- Pain points (compliance vs seasonal vs churn)
- Decision maker language (office manager vs owner vs clinic director)
- Demo scenarios (what "reactivation" looks like for THEIR business)

See: `.planning/loom-scripts/` for individual scripts.

---

## 🚀 Client Delivery Pipeline (After They Sign Up)

### Onboarding (Days 1-3)
```
1. Client signs agreement + pays $2,000 setup
2. Get access to their CRM / lead list export
3. Clean & deduplicate lead data
4. Segment leads by age (30d, 90d, 180d, 365d+)
5. Set up dedicated phone number(s) in their area code
6. Configure SMS sequences in Salesmessage
7. Configure email sequences (if email data available)
8. Test sequences with 10-20 leads
```

### Reactivation Sequences (Ongoing)

#### SMS Sequence (Primary)
```
Day 0 (SMS 1): "Hi [Name], this is [Agent] from [Client Business]. 
Quick question — are you still looking to get [service] done? 
We had your info from a while back."

Day 1 (SMS 2): "Just following up — we have some availability 
this [month] and wanted to see if you'd like to get that 
[service] taken care of. Want me to check on pricing for you?"

Day 3 (SMS 3): "Last check-in! If you're no longer interested 
no worries at all. But if timing was the issue before, 
we've got a window now. Want to chat?"

Day 7 (SMS 4 — breakup): "Hey [Name], I'll stop bugging you 😊 
If you ever need [service] in the future, just text this number. 
We'll be here!"
```

#### Email Sequence (Secondary)
```
Day 0: "Your [Service] Project — Still On Your Mind?"
Day 2: "[Case Study] How [Similar Business] Saved $X"  
Day 5: "Quick Question About Your [Service] Needs"
Day 8: "Last Email — Your [Service] Quote"
```

### Response Handling
- **AI monitors** all incoming replies via Salesmessage
- **Positive replies** → route to client's team for appointment booking
- **Questions about pricing** → AI responds with templated pricing info
- **Not interested** → mark as "closed-lost" and stop sequence
- **Wrong number/opt-out** → immediately stop + comply with regulations

### Reporting (Weekly)
```
- Total leads contacted this week
- Response rate (target: 15-25%)
- Appointments booked (target: 5-10% of contacted)
- Revenue generated per appointment (client tracks)
- Leads remaining in queue
```

---

## 💰 Unit Economics

| Metric | Conservative | Optimistic |
|--------|-------------|------------|
| Dead leads per client | 200 | 500+ |
| Contact rate (SMS) | 85% | 95% |
| Response rate | 15% | 25% |
| Appointment rate | 5% | 10% |
| **Appointments per client** | **10** | **50** |
| Revenue per appointment ($75 avg) | $750 | $3,750 |
| **Total per client** | **$2,750** ($2K setup + $750 success) | **$5,750** ($2K + $3,750) |
| Client's ROI (on a $5K avg job) | 25x–125x | — |

### Cost per Client Delivery
| Expense | Monthly |
|---------|---------|
| SMS platform | ~$50–100 |
| Phone numbers | ~$5 |
| SMS credits (~500 msgs) | ~$15 |
| Email tool (shared) | ~$20/client |
| **Total delivery cost** | **~$90–140/mo** |

**Margin on setup: ~90%+ → $2,000 - ~$200 first month = $1,800 gross**

---

## 👥 Team Structure

| Role | Person | Responsibility |
|------|--------|---------------|
| **Founder / Strategist** | You | Client relationships, Loom recordings, strategy |
| **Cold Callers** | Hired contractors | Outbound calling using SCRIPTS.md |
| **AI Agent Layer** | Automated | SMS/email sequences, response monitoring |
| **Operations** | You + AI | Onboarding, data cleaning, reporting |

---

## 📊 Current Infrastructure

### Supabase Database
- **Project:** jytnvlammcdlfcfdyvab (ap-northeast-1)
- **10 lead tables:** 5 US + 5 UK (all identical schema)
- **Schema per table:** company_name, phone_number, email_address, owner_gm_name, city_state, google_rating, website_url, stage, notes, pain_point_pitch, cold_email_copy, etc.
- **Profiles:** 3 users with role-based access (master/user)
- **Audit logs:** Table exists but empty (good for compliance tracking)

### CRM Interface
- **Location:** calling_temp2/
- **Features:** Kanban board, call scripts, niche filtering, stage management
- **Auth:** Supabase auth with role-based access

### Lead Generation
- **Exa AI Websets:** Automated pipeline generating 100 leads/niche/country
- **Deduplication:** Built into pipeline (checks against existing Supabase records)

---

## 🗺️ Milestone Roadmap

### M1: Foundation (Current Sprint)
| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Agency SOPs Document | 🔲 Not Started |
| 2 | Niche-Specific Loom Video Scripts (x5) | 🔲 Not Started |
| 3 | Delivery Tooling Setup (Salesmessage + email) | 🔲 Not Started |
| 4 | Client Onboarding SOP | 🔲 Not Started |
| 5 | Reactivation Sequence Templates (SMS + Email, x5 niches) | 🔲 Not Started |
| 6 | Reporting Dashboard / Template | 🔲 Not Started |

### M2: Scale
| Phase | Description | Status |
|-------|-------------|--------|
| 7 | AI Voice Calling Integration (Bland.ai / Vapi) | 🔲 Future |
| 8 | Client Portal (self-serve reporting) | 🔲 Future |
| 9 | Multi-niche expansion | 🔲 Future |

---

## 📁 File Structure
```
autoikigai-reborn/
├── .planning/              # GSD planning directory
│   ├── PROJECT.md          # This file
│   ├── REQUIREMENTS.md     # Detailed requirements
│   ├── ROADMAP.md          # Phase-by-phase execution
│   ├── sops/               # Standard Operating Procedures
│   └── loom-scripts/       # Loom video scripts per niche
├── calling_temp2/          # Internal CRM
├── src/                    # Next.js app (autoikigai-reborn)
├── _legacy_html/           # Old website
└── scripts/                # Automation scripts
```

---

*Last updated: 2026-03-28*
*Version: 1.0*
