# Autoikigai — Master Standard Operating Procedures

> **Version:** 1.0 | **Last Updated:** 2026-03-28
> **Owner:** Laksh (Founder)

---

## Table of Contents
1. [SOP-001: Lead Generation Pipeline](#sop-001-lead-generation-pipeline)
2. [SOP-002: Cold Calling Outreach](#sop-002-cold-calling-outreach)
3. [SOP-003: Loom Video Outreach](#sop-003-loom-video-outreach)
4. [SOP-004: Client Onboarding](#sop-004-client-onboarding)
5. [SOP-005: Reactivation Delivery](#sop-005-reactivation-delivery)
6. [SOP-006: Reporting & Client Communication](#sop-006-reporting--client-communication)
7. [SOP-007: Billing & Success Fee Tracking](#sop-007-billing--success-fee-tracking)

---

## SOP-001: Lead Generation Pipeline

### Purpose
Continuously generate qualified leads (local service businesses) across 5 niches in the US and UK for cold outreach.

### Trigger
- Daily (automated) OR when lead count per niche drops below 50 uncontacted

### Process

**Step 1 — Run Exa AI Websets**
1. Open the lead generation script (see `scripts/` directory or conversation #e7123539)
2. Configure 10 websets:
   - 5 US niches × 1 query each
   - 5 UK niches × 1 query each
3. Target: 100 leads per webset
4. Enrichment fields: company_name, phone_number, email, owner/GM name, city/state, website, estimated revenue, Google rating

**Step 2 — Poll for Completion**
- Websets run asynchronously (typically 5-15 minutes)
- Poll every 60 seconds until all 10 complete

**Step 3 — Deduplicate Against Supabase**
1. Pull all existing phone numbers from the corresponding `leads_[niche]` or `leads_uk_[niche]` table
2. Filter out any duplicates from the new batch
3. Log: "X new leads found, Y duplicates removed"

**Step 4 — Insert New Leads**
1. Map enriched data to Supabase schema:
   - `company_name`, `phone_number` (unique), `email_address`, `owner_gm_name`
   - `city_state`, `google_rating`, `website_url`, `estimated_revenue`
   - `niche` (auto-set by table), `status` = 'new', `stage` = 'new'
2. Insert into the correct table (US or UK, per niche)
3. Generate `pain_point_pitch` using niche-specific hooks from SCRIPTS.md

**Step 5 — Verify**
- Confirm row counts increased in Supabase
- Spot-check 3-5 random leads for data quality (valid phone, correct niche, etc.)

### Output
- New leads in Supabase, ready for cold calling
- Daily summary: total new leads by niche/country

### Owner
Automated pipeline (manual oversight by Laksh)

---

## SOP-002: Cold Calling Outreach

### Purpose
Contact decision-makers at target businesses to pitch the reactivation service and book discovery calls.

### Trigger
- Daily, during business hours (9AM-5PM local time for US/UK leads)

### Process

**Step 1 — Load Leads into CRM**
1. Open the CRM (calling_temp2/index.html)
2. Select niche tab
3. Filter by stage = "new"
4. Callers work top-to-bottom (oldest leads first)

**Step 2 — Pre-Call Research (30 seconds per lead)**
1. Open lead's website in a new tab
2. Note: company size, services offered, any recent reviews
3. Check Google reviews for complaints about "never called back" or "slow response" (goldmine for our pitch)

**Step 3 — Make the Call**
Use the niche-specific script from SCRIPTS.md:

**Gatekeeper Script (Peer-to-Peer Tone):**
> "Hey! This is [Name] — I was actually looking at [Company]'s website and had a quick question about how you guys handle your old quotes and estimates. Is [Owner Name] around? Or whoever handles that?"

**Decision-Maker Script:**
> "Hey [Owner], quick question — when someone requests a quote from you and then goes cold, what happens to that lead? ... Right, so what we do is take those dead leads and bring them back to life using automated follow-up. On average our clients book [X] appointments from leads they'd already written off. Would it make sense to walk you through how it works with a quick 2-minute video?"

**Niche-Specific Hooks:**
| Niche | Hook |
|-------|------|
| Paving | "You quoted 200 driveways last year. How many ghosted you? We bring those back." |
| Fire & Security | "Every expired fire safety quote is a compliance risk someone else will close." |
| Janitorial | "Your old facility manager contacts moved buildings — but they still need cleaning." |
| Arborist | "Storm season is coming. Every old estimate is a homeowner who still has that tree." |
| Sleep Apnea | "60% of CPAP patients abandon treatment. Those are YOUR patients sitting in your CRM." |

**Step 4 — Handle Objections**

| Objection | Response |
|-----------|----------|
| "We already follow up" | "That's great — but do you follow up 4-5 times over 2 weeks with automated SMS and email? Most businesses stop after 1-2 attempts. We fill that gap." |
| "Not interested / too busy" | "Totally get it. Quick question though — roughly how many quotes did you send last year that never turned into jobs? ... Even if it's 50, that could be 5-10 booked appointments you're leaving on the table. Want me to send you a 2-minute video showing exactly how it works?" |
| "How much does it cost?" | "There's a one-time setup fee to build everything out for your business — we can walk through the specifics on a quick call. The important thing is you only pay for results after that." |
| "Send me an email" | "Absolutely — what's the best email? I'll send you a quick video walkthrough instead of a boring PDF. It's 90 seconds and shows you exactly what we'd do with your leads." |

**Step 5 — Update CRM**
After every call, update the lead in the CRM:
- **Reached DM → Interested:** Move to "Interested" stage, add notes
- **Reached DM → Not Now:** Move to "Follow Up" stage, set callback date
- **Reached DM → Hard No:** Move to "Bad Lead" stage
- **Voicemail:** Keep in "Contacted" stage, note VM left
- **Gatekeeper Block:** Keep in "Contacted" stage, try again in 2 days
- **Wrong Number:** Move to "Bad Lead" stage

**Step 6 — Send Loom (if DM reached)**
If you spoke to the decision-maker and they showed any interest:
1. Send the niche-specific Loom video via email within 1 hour
2. Follow up with SMS linking to Loom within 24 hours (see SOP-003)

### Metrics (per caller per day)
| Metric | Target |
|--------|--------|
| Calls made | 50-80 |
| Decision-makers reached | 8-15 |
| Interested / Loom sent | 2-5 |
| Meetings booked | 1-2 |

### Owner
Cold callers (supervised by Laksh)

---

## SOP-003: Loom Video Outreach

### Purpose
Send personalized, niche-specific Loom videos to decision-makers after cold call contact to convert interest into booked discovery calls.

### Trigger
- After any cold call where the decision-maker was reached and showed interest
- OR as a first-touch for warm leads / referrals

### Process

**Step 1 — Select the Correct Niche Loom**
Each niche has its own pre-recorded Loom video (see Phase 2 scripts):
| Niche | Loom File |
|-------|-----------|
| Paving | `loom-paving-reactivation.mp4` |
| Fire & Security | `loom-fire-security-reactivation.mp4` |
| Janitorial | `loom-janitorial-reactivation.mp4` |
| Arborist | `loom-arborist-reactivation.mp4` |
| Sleep Apnea | `loom-sleep-apnea-reactivation.mp4` |

**Step 2 — Send Via Email (Within 1 Hour of Call)**
Subject line: `Quick video for {Company Name} — re: our call`

Body:
```
Hey {Owner First Name},

Great chatting earlier. As promised, here's the 90-second walkthrough 
showing what we'd do with your old {service type} leads:

[LOOM THUMBNAIL / LINK]

No pressure at all — just wanted to show you what it looks like 
in action. If it makes sense, happy to set it up for you.

Talk soon,
Laksh
```

**Step 3 — SMS Follow-Up (24 Hours Later)**
```
Hey {First Name}, it's Laksh from Autoikigai. 
Sent you a quick video yesterday about reviving your old 
{service} leads — did you get a chance to watch it? 
Here's the link again: {LOOM_URL}
```

**Step 4 — Final Follow-Up (Day 3 — Email)**
Subject: `Worth 90 seconds?`
```
Hey {Owner First Name},

Just bumping this up — the video I sent is only 90 seconds 
and shows exactly how we'd turn your old quotes into 
booked appointments.

{LOOM LINK}

If the timing isn't right, no worries at all. 
Just didn't want it to get buried in your inbox.

Best,
Laksh
```

**Step 5 — Update CRM**
- Loom sent → update notes: "Loom sent [date]"
- If they reply/watch → move to "Interested" if not already
- If no response after Day 3 follow-up → move to "Follow Up" stage for re-contact in 2 weeks

### Key Rules
- **NEVER mention pricing in the Loom** — the success fee is negotiated live
- **NEVER mention pricing in the email** — if asked, say "we can walk through specifics on a call"
- Face-on-camera Looms ONLY (no screen-only recordings)
- Keep every Loom under 90 seconds — respect their time

### Owner
Laksh (personally records and sends)

---

## SOP-004: Client Onboarding

### Purpose
Smoothly onboard a signed client from contract to live reactivation sequences in ≤3 business days.

### Trigger
- Client agrees to the deal and pays the $2,000 setup fee

### Process

**Day 1 — Agreement & Payment**
1. Send service agreement (scope, setup fee, success fee terms, timeline)
2. Collect payment ($2,000 setup fee via Stripe/wire)
3. Send welcome email with onboarding form link
4. Schedule kickoff call (30 minutes) for Day 2

**Day 1 — Data Collection**
Send client the Data Intake Form requesting:
- [ ] CRM access OR CSV export of old leads/quotes
- [ ] Business name and address (for caller ID)
- [ ] Preferred area code(s) for SMS sending
- [ ] Services they offer (for personalized messaging)
- [ ] Average job value (for ROI projections)
- [ ] Any leads to EXCLUDE (active clients, do-not-contact, etc.)
- [ ] Logo/brand guidelines (for professional messaging)
- [ ] Preferred appointment booking method (phone call, calendar link, etc.)

**Day 2 — Kickoff Call**
Agenda (30 minutes):
1. Confirm data received and review lead list quality
2. Walk through the SMS/email sequence they'll see
3. Set expectations: "Here's what the first 2 weeks look like"
4. Confirm appointment booking process (who handles inbound calls?)
5. Agree on success fee per appointment
6. Answer any questions

**Day 2 — Data Processing**
1. Import lead data into Salesmessage
2. Clean data:
   - Remove duplicates
   - Validate phone numbers (US: +1, UK: +44)
   - Remove any numbers on client's exclusion list
   - Flag leads with email addresses for dual-channel
3. Segment by age:
   - Hot (30-90 days old) — priority batch
   - Warm (90-180 days) — second batch
   - Cold (180-365+ days) — third batch
4. Provision dedicated phone number(s) in client's local area code

**Day 3 — Sequence Configuration**
1. Load niche-specific SMS templates into Salesmessage
2. Customize templates with client's business name and services
3. Load email templates (if email data available)
4. Configure response routing:
   - Positive reply → notification to client + our team
   - Pricing question → AI-templated response
   - Opt-out/stop → immediate removal
   - Wrong number → remove from sequence
5. Set up weekly reporting automation

**Day 3 — Test & Launch**
1. Send test sequence to yourself (verify formatting, links, caller ID)
2. Launch with "Hot" segment first (10-20 leads)
3. Monitor responses for 4-8 hours
4. If clean → expand to full "Hot" batch
5. Send client "We're live!" confirmation with first-day stats

### Go-Live Checklist
- [ ] Payment received
- [ ] Lead data imported and cleaned
- [ ] Phone number provisioned
- [ ] SMS sequences loaded and customized
- [ ] Email sequences loaded (if applicable)
- [ ] Response routing configured
- [ ] Test messages sent and verified
- [ ] Client notified of launch
- [ ] First batch sent (Hot segment)
- [ ] Monitoring active

### Owner
Laksh (with AI agent support for data processing)

---

## SOP-005: Reactivation Delivery

### Purpose
Run ongoing reactivation sequences for signed clients, monitor responses, and book appointments.

### Trigger
- After client onboarding is complete (SOP-004)
- Ongoing: new batches launched every 3-7 days as previous batches complete

### Process

**Daily Monitoring**
1. Check Salesmessage dashboard every morning:
   - New responses overnight
   - Delivery failures (bad numbers)
   - Opt-outs to process
2. Categorize responses:
   | Response Type | Action |
   |---------------|--------|
   | "Yes, interested" | Forward to client immediately + log as reactivated |
   | "What's the price?" | AI sends pre-approved pricing response |
   | "Not right now, maybe later" | Tag as "nurture" — re-contact in 30 days |
   | "STOP" / "Unsubscribe" | Immediately remove — log for compliance |
   | "Wrong number" | Remove from all sequences |
   | No response (after full sequence) | Mark as "exhausted" — do not re-contact for 90 days |

**Batch Management**
- Week 1: Hot leads (30-90 days old) — highest conversion probability
- Week 2-3: Warm leads (90-180 days old)
- Week 4+: Cold leads (180-365+ days old)
- Never contact more than 50 leads/day per client (maintains deliverability)

**Appointment Booking Process**
When a lead responds positively:
1. Immediately notify client (via SMS/email/Slack depending on preference)
2. Include the lead's name, phone number, service interest, and full conversation history
3. Client's team calls the lead to book the appointment
4. Client confirms appointment to us → we log it for success fee billing
5. If client doesn't follow up within 2 hours → we send them a reminder

**Quality Assurance**
- Review AI responses weekly for accuracy and tone
- Check for any leads that fell through the cracks
- Verify opt-out compliance (zero tolerance for continued messaging after "STOP")

### SMS Sequence Templates
See: `.planning/sequences/[niche]-sequences.md` for niche-specific copy.

### Metrics Dashboard (Per Client)
| Metric | How to Track |
|--------|-------------|
| Total leads loaded | Salesmessage contact count |
| Messages sent | Salesmessage analytics |
| Delivery rate | Sent ÷ Delivered (target: >95%) |
| Response rate | Replies ÷ Delivered (target: 15-25%) |
| Positive response rate | Interested ÷ Total replies (target: 30-50%) |
| Appointments booked | Manual log from client confirmations |
| Revenue generated | Appointments × success fee |

### Owner
Laksh + AI agent (automated monitoring, manual escalation for complex responses)

---

## SOP-006: Reporting & Client Communication

### Purpose
Keep clients informed, demonstrate ROI, and maintain the relationship through structured reporting.

### Trigger
- Weekly (every Friday)
- Monthly (first Monday of month)

### Process

**Weekly Report (Email — Every Friday)**
```
Subject: Weekly Reactivation Report — {Client Business Name}

Hi {Client First Name},

Here's your reactivation snapshot for the week of {Date}:

📊 THIS WEEK
• Leads contacted: {X}
• Responses received: {Y} ({Y/X}% response rate)
• Appointments booked: {Z}
• Leads remaining in queue: {N}

💰 CUMULATIVE (Since Launch)
• Total leads contacted: {Total}
• Total appointments booked: {Total Appointments}
• Estimated revenue generated: ${Total × Avg Job Value}

📝 NOTES
• {Any notable wins, patterns, or observations}
• {Any adjustments made to sequences}

Next week we'll be contacting your {warm/cold} segment.

Questions? Just reply to this email.

Best,
Laksh — Autoikigai
```

**Monthly QBR (Quick Call — 15 Minutes)**
Agenda:
1. Review monthly metrics vs. targets
2. Highlight top wins and success stories
3. Discuss any new lead lists or data to add
4. Address any concerns
5. Plan next month's approach (new batches, seasonal adjustments)

**Communication Rules**
- Respond to client messages within 4 hours during business hours
- Proactively flag issues (delivery problems, low response rates) — never let clients discover problems
- Always frame results in terms of ROI: "Your 12 appointments at an average job value of $5K = $60K in revenue from leads you'd written off"

### Owner
Laksh

---

## SOP-007: Billing & Success Fee Tracking

### Purpose
Track reactivated appointments and bill success fees accurately and transparently.

### Trigger
- When a client confirms a booked appointment
- Monthly billing cycle (1st of each month for previous month's success fees)

### Process

**Tracking Appointments**
1. Client confirms appointment via email/SMS/Slack
2. Log in tracking spreadsheet:
   - Date of appointment
   - Lead name + phone number
   - Service type
   - Appointment date/time
   - Agreed success fee amount
3. Send client a confirmation: "Logged! That's appointment #{X} this month."

**Monthly Invoicing**
1. On the 1st of each month, generate invoice for previous month:
   - Line items: each confirmed appointment with date and lead name
   - Total: {count} × ${success fee per appointment}
2. Send invoice via Stripe / email
3. Payment terms: Net 15
4. Follow up on Day 7 if unpaid
5. Follow up on Day 14 if still unpaid (phone call)

**Dispute Handling**
If client disputes an appointment:
1. Pull the full SMS/email conversation from Salesmessage
2. Show the lead's positive response and appointment confirmation
3. Resolve within 48 hours
4. If legitimate dispute (e.g., lead no-showed), negotiate — consider waiving that fee as goodwill

**Financial Tracking**
Maintain a master spreadsheet/dashboard:
| Client | Setup Fee Paid | Month | Appointments | Success Fee | Total Billed | Paid? |
|--------|---------------|-------|-------------|-------------|-------------|-------|
| Example Paving Co | $2,000 | Mar 2026 | 8 | $75/ea | $600 | ✅ |

### Owner
Laksh

---

## Appendix: Quick Reference

### Niche Codes
| Code | Niche | US Table | UK Table |
|------|-------|----------|----------|
| PAV | Commercial Paving | leads_paving | leads_uk_paving |
| FIR | Fire & Security | leads_fire_security | leads_uk_fire_security |
| JAN | Commercial Janitorial | leads_janitorial | leads_uk_janitorial |
| ARB | Arborist / Tree Care | leads_arborist | leads_uk_arborist |
| SLP | Sleep Apnea Clinics | leads_sleep_apnea | leads_uk_sleep_apnea |

### Pipeline Stages
```
New → Contacted → Interested → Follow Up → Closed Won → Bad Lead
```

### Key Tools
| Tool | Purpose | URL |
|------|---------|-----|
| Supabase | Lead database + CRM backend | supabase.co |
| Salesmessage | SMS AI agent for reactivation delivery | salesmessage.com |
| Exa AI | Lead generation websets | exa.ai |
| Loom | Video outreach | loom.com |
| CRM UI | Internal calling interface | calling_temp2/ |

---

*End of Master SOP v1.0*
