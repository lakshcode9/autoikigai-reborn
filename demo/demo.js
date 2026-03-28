/* ============================================
   AUTOIKIGAI — Loom Demo Engine
   ============================================
   Press Space to advance messages.
   Niche-specific conversations simulate 
   a real SMS reactivation in real-time.
   ============================================ */

// ============================================
// NICHE DATA — All 5 conversations
// ============================================

const NICHE_DATA = {
    paving: {
        clientName: "Mike's Paving Co.",
        contactName: "John Rivera",
        contactInitials: "JR",
        contactNumber: "+1 (703) 555-0147",
        totalLeads: 247,
        avgJobValue: 4200,
        sequence: [
            {
                type: "outgoing",
                text: "Hey John, this is Mike's Paving. Back in October you asked about getting your driveway resurfaced — are you still thinking about it, or did you end up going with someone else?",
                feedText: "SMS 1 sent to John Rivera",
                feedType: "sent",
                step: 1
            },
            {
                type: "delay",
                duration: 2000,
                feedText: "Waiting for response...",
                feedType: "normal"
            },
            {
                type: "typing",
                duration: 2500
            },
            {
                type: "incoming",
                text: "Hey! No I actually never got it done. Life got busy. Is Mike still doing work in my area?",
                feedText: "🔥 POSITIVE RESPONSE from John Rivera!",
                feedType: "positive",
                reactivated: true
            },
            {
                type: "outgoing",
                text: "Absolutely! Mike's booked out about 2 weeks right now but we could squeeze you in before summer hits. Want me to have him swing by Thursday or Friday for a quick look?",
                feedText: "Follow-up sent — booking attempt",
                feedType: "sent",
                step: 2
            },
            {
                type: "typing",
                duration: 1800
            },
            {
                type: "incoming",
                text: "Thursday works. After 3pm if possible. Same address on Maple St.",
                feedText: "🎯 APPOINTMENT BOOKED — John Rivera, Thursday 3pm",
                feedType: "positive",
                appointment: true
            },
            {
                type: "notification",
                title: "Appointment Booked!",
                body: "<strong>John Rivera</strong> — Driveway Resurfacing<br>Thursday after 3pm • Maple St address<br>Estimated value: <strong>$4,200</strong>",
                feedText: "💰 Est. revenue: $4,200 — previously a dead lead",
                feedType: "positive"
            }
        ]
    },

    fire: {
        clientName: "SafeGuard Fire Systems",
        contactName: "Diana Chen",
        contactInitials: "DC",
        contactNumber: "+1 (571) 555-0283",
        totalLeads: 189,
        avgJobValue: 8500,
        sequence: [
            {
                type: "outgoing",
                text: "Hi Diana, this is SafeGuard Fire Systems. We spoke earlier this year about upgrading the fire alarm panel at your building on Commerce Dr. Your current system may not meet the updated NFPA codes — wanted to check if you've addressed that yet?",
                feedText: "SMS 1 sent to Diana Chen — compliance angle",
                feedType: "sent",
                step: 1
            },
            {
                type: "delay",
                duration: 2000,
                feedText: "Waiting for response...",
                feedType: "normal"
            },
            {
                type: "typing",
                duration: 3000
            },
            {
                type: "incoming",
                text: "No we haven't done anything yet. Our insurance company actually just mentioned something about this too. What would it cost to get compliant?",
                feedText: "🔥 POSITIVE RESPONSE from Diana Chen — insurance urgency!",
                feedType: "positive",
                reactivated: true
            },
            {
                type: "outgoing",
                text: "That's exactly what we help with. It depends on your panel type and building size — would it work if our tech came by for a free 20-min assessment this week? We can give you a compliance report you can show your insurer.",
                feedText: "Follow-up sent — free assessment offer",
                feedType: "sent",
                step: 2
            },
            {
                type: "typing",
                duration: 2000
            },
            {
                type: "incoming",
                text: "Yes that would be great. Can someone come Wednesday morning?",
                feedText: "🎯 APPOINTMENT BOOKED — Diana Chen, Wednesday AM",
                feedType: "positive",
                appointment: true
            },
            {
                type: "notification",
                title: "Appointment Booked!",
                body: "<strong>Diana Chen</strong> — Fire Panel Upgrade / Compliance<br>Wednesday morning • Commerce Dr<br>Estimated value: <strong>$8,500</strong>",
                feedText: "💰 Est. revenue: $8,500 — dead lead since February",
                feedType: "positive"
            }
        ]
    },

    janitorial: {
        clientName: "CleanPro Commercial",
        contactName: "Marcus Thompson",
        contactInitials: "MT",
        contactNumber: "+1 (410) 555-0391",
        totalLeads: 312,
        avgJobValue: 2800,
        sequence: [
            {
                type: "outgoing",
                text: "Hi Marcus, this is CleanPro Commercial. We connected back in January about janitorial services for your office space. I know you mentioned you had a contract at the time — is that still working out, or has anything changed?",
                feedText: "SMS 1 sent to Marcus Thompson — contract check-in",
                feedType: "sent",
                step: 1
            },
            {
                type: "delay",
                duration: 2000,
                feedText: "Waiting for response...",
                feedType: "normal"
            },
            {
                type: "typing",
                duration: 2800
            },
            {
                type: "incoming",
                text: "Actually yeah, our current crew has been inconsistent. We've had 3 different teams in the last 2 months. I'm open to hearing what you can offer.",
                feedText: "🔥 POSITIVE RESPONSE from Marcus Thompson — competitor failing!",
                feedType: "positive",
                reactivated: true
            },
            {
                type: "outgoing",
                text: "I hear that a lot — turnover is the #1 complaint. We assign dedicated teams so you see the same faces every visit. Can I send our ops manager by this week for a quick walkthrough? No pressure, just want to see the space and give you a real number.",
                feedText: "Follow-up sent — walkthrough request",
                feedType: "sent",
                step: 2
            },
            {
                type: "typing",
                duration: 1500
            },
            {
                type: "incoming",
                text: "Sure. Friday afternoon works best. We're at 4200 York Rd, Suite 200.",
                feedText: "🎯 APPOINTMENT BOOKED — Marcus Thompson, Friday PM",
                feedType: "positive",
                appointment: true
            },
            {
                type: "notification",
                title: "Appointment Booked!",
                body: "<strong>Marcus Thompson</strong> — Commercial Janitorial Contract<br>Friday afternoon • 4200 York Rd, Suite 200<br>Estimated value: <strong>$2,800/mo recurring</strong>",
                feedText: "💰 Est. value: $2,800/mo RECURRING — previously dead lead",
                feedType: "positive"
            }
        ]
    },

    arborist: {
        clientName: "Summit Tree Care",
        contactName: "Robert Kazinski",
        contactInitials: "RK",
        contactNumber: "+1 (615) 555-0712",
        totalLeads: 198,
        avgJobValue: 3200,
        sequence: [
            {
                type: "outgoing",
                text: "Hey Robert, this is Summit Tree Care. You reached out last fall about the oak tree near your fence line. With storm season coming up, wanted to check — is that tree still a concern, or did you get it handled?",
                feedText: "SMS 1 sent to Robert Kazinski — seasonal trigger",
                feedType: "sent",
                step: 1
            },
            {
                type: "delay",
                duration: 2000,
                feedText: "Waiting for response...",
                feedType: "normal"
            },
            {
                type: "typing",
                duration: 2200
            },
            {
                type: "incoming",
                text: "Ha, no it's still there. Actually got worse over the winter — it's leaning more now. I've been meaning to call someone.",
                feedText: "🔥 POSITIVE RESPONSE from Robert Kazinski — urgent need!",
                feedType: "positive",
                reactivated: true
            },
            {
                type: "outgoing",
                text: "If it's leaning more that's definitely something to look at before spring storms. Our arborist can come assess it and give you a plan — would early next week work?",
                feedText: "Follow-up sent — urgency + assessment offer",
                feedType: "sent",
                step: 2
            },
            {
                type: "typing",
                duration: 1600
            },
            {
                type: "incoming",
                text: "Yeah, Tuesday would be good. Morning is better. I'll be home.",
                feedText: "🎯 APPOINTMENT BOOKED — Robert Kazinski, Tuesday AM",
                feedType: "positive",
                appointment: true
            },
            {
                type: "notification",
                title: "Appointment Booked!",
                body: "<strong>Robert Kazinski</strong> — Oak Tree Removal/Trimming<br>Tuesday morning • On-site<br>Estimated value: <strong>$3,200</strong>",
                feedText: "💰 Est. revenue: $3,200 — lead from last fall brought back",
                feedType: "positive"
            }
        ]
    },

    sleep: {
        clientName: "RestWell Sleep Center",
        contactName: "Patricia Simmons",
        contactInitials: "PS",
        contactNumber: "+1 (703) 555-0845",
        totalLeads: 211,
        avgJobValue: 5200,
        sequence: [
            {
                type: "outgoing",
                text: "Hi Patricia, this is RestWell Sleep Center. You visited us a while back for a consultation. We have some new treatment options available and wanted to check if you'd like to come in for a follow-up. Would that be of interest?",
                feedText: "SMS 1 sent to Patricia Simmons — HIPAA-safe",
                feedType: "sent",
                step: 1
            },
            {
                type: "delay",
                duration: 2000,
                feedText: "Waiting for response...",
                feedType: "normal"
            },
            {
                type: "typing",
                duration: 2600
            },
            {
                type: "incoming",
                text: "Hi, yes actually. I've been meaning to come back. The treatment I was on before wasn't really working for me. What new options do you have?",
                feedText: "🔥 POSITIVE RESPONSE from Patricia Simmons — re-engagement!",
                feedType: "positive",
                reactivated: true
            },
            {
                type: "outgoing",
                text: "There are a few newer approaches our doctors can walk you through — it really depends on your specific situation. Would you like to schedule a follow-up visit? We have openings this week and next.",
                feedText: "Follow-up sent — scheduling offer (HIPAA-compliant)",
                feedType: "sent",
                step: 2
            },
            {
                type: "typing",
                duration: 1800
            },
            {
                type: "incoming",
                text: "Yes please. Do you have anything available next Thursday? Late morning would be ideal.",
                feedText: "🎯 APPOINTMENT BOOKED — Patricia Simmons, Next Thursday",
                feedType: "positive",
                appointment: true
            },
            {
                type: "notification",
                title: "Appointment Booked!",
                body: "<strong>Patricia Simmons</strong> — Follow-up Consultation<br>Next Thursday, late morning<br>Estimated value: <strong>$5,200</strong> (treatment cycle)",
                feedText: "💰 Est. value: $5,200 — patient re-engaged after months",
                feedType: "positive"
            }
        ]
    }
};

// ============================================
// STATE
// ============================================

let currentNiche = null;
let currentStep = 0;
let isAnimating = false;
let stats = {
    reactivated: 0,
    responseRate: 0,
    appointments: 0,
    revenue: 0
};

// ============================================
// DEMO CONTROLLER
// ============================================

function startDemo(niche) {
    currentNiche = NICHE_DATA[niche];
    currentStep = 0;
    stats = { reactivated: 0, responseRate: 0, appointments: 0, revenue: 0 };

    // Hide selector, show demo
    document.getElementById('nicheSelector').style.display = 'none';
    document.getElementById('demoContainer').style.display = 'flex';

    // Set client info
    document.getElementById('clientName').textContent = currentNiche.clientName;
    document.getElementById('phoneContactName').textContent = currentNiche.contactName;
    document.getElementById('phoneContactNumber').textContent = currentNiche.contactNumber;
    document.getElementById('phoneAvatar').textContent = currentNiche.contactInitials;
    document.getElementById('statLeads').textContent = currentNiche.totalLeads;

    // Reset
    document.getElementById('phoneMessages').innerHTML = '<div class="message-date">Today</div>';
    document.getElementById('feedItems').innerHTML = `
        <div class="feed-item">
            <span class="feed-time">Now</span>
            <span class="feed-text sent">Campaign started for ${currentNiche.clientName}</span>
        </div>
    `;
    resetSequenceSteps();

    // Auto-advance first message after 1s
    setTimeout(() => advanceDemo(), 1000);
}

function advanceDemo() {
    if (isAnimating || !currentNiche) return;
    if (currentStep >= currentNiche.sequence.length) return;

    const action = currentNiche.sequence[currentStep];
    currentStep++;

    switch (action.type) {
        case 'outgoing':
            isAnimating = true;
            addSmsBubble(action.text, 'outgoing');
            addFeedItem(action.feedText, action.feedType);
            if (action.step) activateSequenceStep(action.step);
            setTimeout(() => {
                isAnimating = false;
                autoAdvanceIfNeeded();
            }, 600);
            break;

        case 'incoming':
            isAnimating = true;
            addSmsBubble(action.text, 'incoming');
            addFeedItem(action.feedText, action.feedType);
            if (action.reactivated) updateStatReactivated();
            if (action.appointment) updateStatAppointment();
            setTimeout(() => {
                isAnimating = false;
            }, 600);
            break;

        case 'typing':
            isAnimating = true;
            showTypingIndicator();
            addFeedItem(action.feedText || 'Lead is typing...', action.feedType || 'normal');
            setTimeout(() => {
                removeTypingIndicator();
                isAnimating = false;
                advanceDemo(); // Auto-advance to the incoming message
            }, action.duration);
            break;

        case 'delay':
            isAnimating = true;
            addFeedItem(action.feedText, action.feedType);
            setTimeout(() => {
                isAnimating = false;
                autoAdvanceIfNeeded();
            }, action.duration);
            break;

        case 'notification':
            showNotification(action.title, action.body);
            addFeedItem(action.feedText, action.feedType);
            break;
    }
}

function autoAdvanceIfNeeded() {
    const nextAction = currentNiche.sequence[currentStep];
    if (nextAction && (nextAction.type === 'delay' || nextAction.type === 'typing')) {
        advanceDemo();
    }
}

// ============================================
// UI UPDATES
// ============================================

function addSmsBubble(text, direction) {
    const container = document.getElementById('phoneMessages');
    const bubble = document.createElement('div');
    bubble.className = `sms-bubble ${direction}`;
    bubble.textContent = text;
    container.appendChild(bubble);

    const time = document.createElement('div');
    const now = new Date();
    time.className = `sms-time ${direction === 'incoming' ? 'left' : ''}`;
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    container.appendChild(time);

    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('phoneMessages');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

function addFeedItem(text, type) {
    const container = document.getElementById('feedItems');
    const item = document.createElement('div');
    item.className = 'feed-item';
    const now = new Date();
    item.innerHTML = `
        <span class="feed-time">${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span class="feed-text ${type}">${text}</span>
    `;
    container.prepend(item);
}

function activateSequenceStep(step) {
    // Mark previous steps as done
    for (let i = 1; i < step; i++) {
        const el = document.getElementById(`seqStep${i}`);
        if (el) {
            el.classList.remove('active');
            el.classList.add('done');
        }
    }
    // Mark current as active
    const current = document.getElementById(`seqStep${step}`);
    if (current) {
        current.classList.remove('done');
        current.classList.add('active');
    }
}

function resetSequenceSteps() {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`seqStep${i}`);
        if (el) {
            el.classList.remove('active', 'done');
        }
    }
    document.getElementById('seqStep1').classList.add('active');
}

function updateStatReactivated() {
    stats.reactivated++;
    const el = document.getElementById('statReactivated');
    el.textContent = stats.reactivated;
    el.parentElement.classList.add('success');
    document.getElementById('statReactivatedSub').textContent = 'from dead leads!';

    // Update response rate
    stats.responseRate = Math.round((stats.reactivated / 50) * 100);
    const rateEl = document.getElementById('statResponse');
    animateNumber(rateEl, 0, 24, '%');
    rateEl.parentElement.querySelector('.stat-sub').textContent = '8x industry average';

    // Activate step 4
    activateSequenceStep(4);
    const step4 = document.getElementById('seqStep4');
    if (step4) {
        step4.classList.remove('active');
        step4.classList.add('done');
    }
}

function updateStatAppointment() {
    stats.appointments++;
    stats.revenue += currentNiche.avgJobValue;
    const apptEl = document.getElementById('statAppointments');
    apptEl.textContent = stats.appointments;
    apptEl.parentElement.classList.add('success');
    document.getElementById('statRevenue').textContent = `$${stats.revenue.toLocaleString()} revenue`;
}

function animateNumber(el, from, to, suffix = '') {
    const duration = 800;
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (to - from) * eased) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function showNotification(title, body) {
    // Remove existing
    const existing = document.querySelector('.notification-popup');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'notification-popup';
    notif.innerHTML = `
        <div class="notif-header">
            <span class="notif-icon">🎉</span>
            <span class="notif-title">${title}</span>
        </div>
        <div class="notif-body">${body}</div>
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        notif.style.opacity = '0';
        notif.style.transform = 'translateY(-10px)';
        setTimeout(() => notif.remove(), 500);
    }, 6000);
}

// ============================================
// KEYBOARD LISTENER
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && currentNiche) {
        e.preventDefault();
        advanceDemo();
    }
    // ESC to go back to selector
    if (e.code === 'Escape') {
        document.getElementById('nicheSelector').style.display = 'flex';
        document.getElementById('demoContainer').style.display = 'none';
        currentNiche = null;
    }
});
