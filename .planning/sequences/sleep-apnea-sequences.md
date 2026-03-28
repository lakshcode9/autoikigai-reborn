# 😴 Reactivation Sequences — Sleep Apnea Clinics

> These are the actual messages sent to your CLIENT'S inactive patients.
> Key angle: PATIENT CARE. Empathetic, not salesy. These people have a medical condition.
> IMPORTANT: Be HIPAA-conscious. Never reference specific diagnoses in SMS/email.
> Use language like "follow-up visit" and "treatment options" not "your sleep apnea."

---

## SMS Sequence (4 Touches Over 10 Days)
*Longer cadence — medical audience requires more sensitivity*

### SMS 1 — Day 0 (The Gentle Check-In)
```
Hi {Patient First Name}, this is {Clinic Name}. We wanted 
to check in — it's been a while since your last visit and 
we wanted to make sure you're doing well. Would you like 
to schedule a follow-up? We're happy to help 😊
```

### SMS 2 — Day 2 (The New Options Angle)
```
Hey {Patient First Name}, just a quick note from {Clinic Name}. 
We've got some new treatment options that a lot of patients 
are finding really comfortable. If you'd like to learn more, 
we can set up a quick visit. No pressure at all!
```

### SMS 3 — Day 5 (The Ease Angle)
```
Hi {Patient First Name} — checking in one more time from 
{Clinic Name}. If scheduling has been tricky, we have 
{early morning / evening / Saturday} availability now. 
Want me to find a time that works? Just text back 
a day that works best.
```

### SMS 4 — Day 10 (The Soft Close)
```
Hi {Patient First Name}, this is {Clinic Name}. Last check-in 
from us — we're here whenever you're ready. Your health 
and comfort are what matter most. Just save this number 
and reach out anytime. Take care! 💙
```

---

## Email Sequence (4 Touches Over 10 Days)

### Email 1 — Day 0
**Subject:** `Checking in from {Clinic Name} 💙`
```
Hi {Patient First Name},

This is {Agent Name} from {Clinic Name}. We noticed it's 
been a little while since your last visit and wanted to 
check in.

How have you been sleeping? If you've had any challenges 
with your treatment, or just want to explore what's new, 
we'd love to see you again.

We have appointments available {this week / next week} 
and can work around your schedule.

Click here to book: {BOOKING LINK}
Or just reply to this email and we'll call you.

Wishing you restful nights,
{Agent Name}
{Clinic Name}
```

### Email 2 — Day 3
**Subject:** `New options you might not know about`
```
Hi {Patient First Name},

A lot has changed in sleep treatment over the past year. 
We've added some new options that patients are finding 
much more comfortable and easier to use than before.

If your previous experience wasn't quite right, it might 
be worth another look. Many patients find a much better 
fit the second time around.

Would you like to schedule a 15-minute consultation? 
No commitment — just a conversation about what might 
work better for you.

Reply "yes" and we'll get you on the calendar.

Best,
{Agent Name}
{Clinic Name}
```

### Email 3 — Day 6
**Subject:** `We're here when you're ready`
```
Hi {Patient First Name},

Just a gentle reminder that {Clinic Name} is here for you. 
We know life gets busy, and sometimes health appointments 
get pushed down the list.

If you'd like to come in for a follow-up — even just to 
check on your progress — we have flexible scheduling:

• {Early morning appointments}
• {Evening availability}
• {Saturday slots}

Book online: {BOOKING LINK}
Or reply "call me" and we'll reach out.

{Agent Name}
{Clinic Name}
```

### Email 4 — Day 10
**Subject:** `Last note from {Clinic Name} 💙`
```
Hi {Patient First Name},

This is my last follow-up. Your well-being is important 
to us, and we want you to know that whenever you're ready 
to come back in, we'll be here with open arms.

No pressure, no judgment — just good care.

Save our number: {Clinic Phone}
Book anytime: {BOOKING LINK}

Wishing you all the best,
{Agent Name}
{Clinic Name}
```

---

## Response Handling Rules

| Response | Action |
|----------|--------|
| "Yes" / "I'd like to come in" / "Book me" | Forward to clinic's scheduling team IMMEDIATELY. Priority response. |
| "What new options?" | Forward to clinician for personalized response (don't have AI answer medical questions). |
| "I moved" / "Different provider now" | Remove from sequence. Mark as "relocated/switched." |
| "My insurance changed" | Forward to clinic's billing team — may still be able to help. |
| "STOP" / "Unsubscribe" | Remove immediately. Log for HIPAA compliance. |
| "I lost my CPAP" / "Machine broke" | URGENT forward — this is a re-engagement opportunity for equipment replacement. |
| No response after full sequence | Mark as EXHAUSTED. Re-contact in 120 days (longer gap for medical — respect boundaries). |

---

## Compliance Notes (CRITICAL)
- **NEVER** reference specific diagnoses in SMS (HIPAA)
  - ❌ "Your sleep apnea appointment"
  - ✅ "Your follow-up visit at {Clinic Name}"
- **NEVER** share patient info between messages/channels without consent
- **ALWAYS** include opt-out option (built into Salesmessage)
- **Patient data** must be handled per clinic's HIPAA policies
- If in doubt about any message → ask the clinic first

## Timing Notes
- **Best SMS send times:** Tuesday-Thursday, 10AM-12PM and 6PM-8PM (patients check personal texts outside work)
- **Avoid:** Early morning (6-8AM) — sleep patients may be sensitive about morning interruptions
- **Longer cadence:** 10 days instead of 7 — medical context requires more patience
- **Seasonal priority:** January (New Year health resolutions), September (back to routine after summer)
- **Max daily sends per client:** 30 leads/day (lower threshold for medical — more sensitive audience)
