# Autoikigai — Delivery Tooling Setup Guide

> Step-by-step guide for setting up the reactivation delivery stack.
> Follow this ONCE per new client onboarding.

---

## 1. Salesmessage Account Setup

### Initial Setup (One-Time)
1. **Sign up** at [salesmessage.com](https://salesmessage.com)
2. **Plan:** Start with the SMB plan (~$25-49/mo base)
3. **Verify your business** — required for SMS sending compliance (A2P 10DLC registration)
4. **Add payment method** for per-message charges (~$0.01-0.03/SMS)

### A2P 10DLC Registration (CRITICAL for US)
> Without this, your messages will be filtered/blocked by carriers.

1. In Salesmessage → Settings → Compliance
2. Register your brand:
   - Business name: [Client's Business Name]
   - EIN / Tax ID: [Client provides]
   - Business type: Sole Proprietor / LLC / Corporation
   - Use case: "Customer follow-up and appointment reminders"
3. Register campaign:
   - Campaign type: "Mixed" or "Marketing"
   - Sample messages: Use SMS 1 from the niche sequence
   - Opt-out message: "Reply STOP to unsubscribe"
4. Wait for approval (typically 1-3 business days)

### UK Compliance
- UK numbers send via standard routes — no 10DLC needed
- Ensure GDPR compliance: only contact leads who had prior business relationship
- Include business identity in first message
- Provide opt-out in every message

---

## 2. Phone Number Provisioning

### Per Client
1. In Salesmessage → Phone Numbers → Add Number
2. **Select local area code** matching client's service area
   - Example: Client in Virginia → get a (703) or (571) number
   - Example: Client in London → get a UK mobile number
3. **Set the caller ID name** to client's business name
4. **Label** the number: `[Client Name] - [Niche]`

### Number Strategy
| Scenario | Numbers Needed |
|----------|---------------|
| Single-location client | 1 number |
| Multi-city client | 1 number per major city/area code |
| US + UK client | 1 US number + 1 UK number |

### Cost
- US local: ~$1-2/month/number
- UK local: ~$2-3/month/number
- Toll-free: ~$3-5/month (not recommended — lower trust for local businesses)

---

## 3. Salesmessage AI Agent Configuration

### Create Automation Workflow
1. Go to Automations → Create New
2. **Name:** `[Client Name] - [Niche] Reactivation`
3. **Trigger:** Contact added to list `[Client] Dead Leads`
4. **Sequence:**

```
Step 1: Send SMS 1 (Day 0)
  → Wait 24 hours
Step 2: Send SMS 2 (Day 1)
  → Wait 48 hours  
Step 3: Send SMS 3 (Day 3)
  → Wait 96 hours
Step 4: Send SMS 4 (Day 7)
  → End sequence
```

5. **Exit conditions:**
   - Contact replies → pause sequence, notify team
   - Contact texts STOP → remove from sequence, add to opt-out list
   - Contact marked as booked → end sequence

### AI Response Rules
Configure the AI textbot to handle common responses:

| Incoming Message Contains | AI Response |
|---------------------------|-------------|
| "yes" / "interested" / "how much" | "Great! Let me connect you with our team to get you scheduled. What's the best time to call you?" + NOTIFY client team |
| "not right now" / "maybe later" | "No problem at all! We'll check back in a few weeks. Just text us anytime if you change your mind." + tag NURTURE |
| "stop" / "unsubscribe" / "remove" | [Auto-handled by Salesmessage — removes from all sequences] |
| "who is this?" | "Hi! This is {Business Name}. We connected a while back about {service type}. Just wanted to check in!" |
| "wrong number" | "So sorry about that! I'll remove you from our list right away. Have a great day!" + REMOVE |

---

## 4. Email Integration (Secondary Channel)

### Option A: GoHighLevel (If Using)
1. Set up sub-account for each client
2. Import leads with email addresses
3. Create email workflow matching the niche email sequence
4. Set sending domain: `send@[clientdomain].com` (or use GHL's shared domain)

### Option B: Instantly.ai (Budget Alternative)
1. Create campaign per client
2. Import leads with email addresses
3. Paste email sequence from `.planning/sequences/[niche]-sequences.md`
4. Set daily send limit: 30-50/day (warm up gradually)
5. Configure reply detection and notifications

### Option C: Manual (Simplest Start)
1. Use Gmail/Outlook with templates
2. Send emails manually for first 1-2 clients
3. Automate only after validating sequences work

**Recommendation:** Start with Option C for your first client, then move to A or B once you've validated the sequences.

---

## 5. Supabase Integration (Internal Tracking)

### Purpose
Track which clients' leads have been contacted, response status, and appointments booked.

### New Table: `client_campaigns`
```sql
CREATE TABLE client_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  client_name TEXT NOT NULL,
  client_niche TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  total_leads_imported INT DEFAULT 0,
  leads_contacted INT DEFAULT 0,
  responses_received INT DEFAULT 0,
  appointments_booked INT DEFAULT 0,
  setup_fee_paid BOOLEAN DEFAULT false,
  success_fee_per_appointment NUMERIC(10,2),
  status TEXT DEFAULT 'onboarding',  -- onboarding, active, paused, completed
  salesmessage_campaign_id TEXT,
  notes TEXT DEFAULT ''
);
```

### New Table: `reactivated_leads`
```sql
CREATE TABLE reactivated_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  campaign_id UUID REFERENCES client_campaigns(id),
  lead_name TEXT,
  lead_phone TEXT,
  lead_email TEXT,
  service_type TEXT,
  response_type TEXT,  -- positive, question, nurture, opt_out, wrong_number
  appointment_booked BOOLEAN DEFAULT false,
  appointment_date TIMESTAMPTZ,
  success_fee_billed BOOLEAN DEFAULT false,
  notes TEXT DEFAULT ''
);
```

### Webhook (Future)
When ready to automate:
1. Salesmessage → Settings → Webhooks
2. Create webhook for "Incoming Message" events
3. Point to a Supabase Edge Function that:
   - Parses the response
   - Updates `reactivated_leads` table
   - Sends notification to your team

---

## 6. Monitoring Dashboard

### Daily Check (5 Minutes)
1. Open Salesmessage dashboard
2. Check:
   - [ ] New responses overnight
   - [ ] Any delivery failures
   - [ ] Any opt-outs to process
3. Forward positive responses to client

### Weekly Check (15 Minutes)
1. Export Salesmessage analytics
2. Update `client_campaigns` table in Supabase
3. Generate weekly report (see REPORTING.md)
4. Send report to client

---

## 7. Cost Summary Per Client

| Item | One-Time | Monthly |
|------|----------|---------|
| Phone number | — | $2 |
| A2P registration | $15 | — |
| SMS credits (500 msgs) | — | $15 |
| Salesmessage platform (shared) | — | ~$10-20/client |
| Email tool (shared) | — | ~$5-10/client |
| **Total** | **$15** | **~$32-47** |

**Margin on $2,000 setup fee:** ~97% gross margin (first month)

---

## 8. Launch Checklist (Per Client)

```
PRE-LAUNCH
- [ ] Salesmessage account active
- [ ] A2P 10DLC approved (US) or GDPR-compliant (UK)
- [ ] Local phone number provisioned
- [ ] Client lead data imported and cleaned
- [ ] SMS sequences loaded with client-specific variables
- [ ] Email sequences loaded (if applicable)
- [ ] AI response rules configured
- [ ] Test message sent to yourself — verified formatting
- [ ] Test message sent to client — they approve the tone

GO LIVE
- [ ] Send first batch (Hot segment: 20 leads)
- [ ] Monitor for 4 hours
- [ ] If clean → expand to full Hot batch
- [ ] Notify client: "We're live!"

POST-LAUNCH (Day 1-3)
- [ ] Check responses daily
- [ ] Forward positive leads to client
- [ ] Handle opt-outs
- [ ] Send Day 1 update to client
- [ ] Launch Warm segment (Day 3-5)
```

---

*Last updated: 2026-03-28*
