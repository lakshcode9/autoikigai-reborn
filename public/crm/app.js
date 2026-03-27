const SUPABASE_URL = 'https://jytnvlammcdlfcfdyvab.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dG52bGFtbWNkbGZjZmR5dmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDgzNzgsImV4cCI6MjA4ODI4NDM3OH0.Oyy_oO62B_iLrW9Gr7ggFm1ygCOoV0ONy71E5oUb0og';

console.log('[CRM] app.js starting');

const urlParams = new URLSearchParams(window.location.search);
const CRM_TOKEN = urlParams.get('t');
const CRM_REFRESH = urlParams.get('rt');
const CRM_USER_ID = urlParams.get('u');

let currentUserProfile = null;
let currentModalDms = [];

let db;
try {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[CRM] Supabase client initialized OK');

    if (CRM_TOKEN && CRM_REFRESH) {
        db.auth.setSession({ access_token: CRM_TOKEN, refresh_token: CRM_REFRESH })
          .then(({ data, error }) => {
              if (error) console.error('[CRM] Auth Session Error:', error);
              else console.log('[CRM] Auth Session set from URL successfully.');
          });
    }
} catch(e) {
    console.error('[CRM] Supabase init failed:', e);
    alert('Failed to initialize Supabase. Check console.');
}

const NICHES = {
    paving: { label: 'Commercial Paving', table: 'leads_paving', color: 'yellow', icon: 'road-horizon' },
    fire_security: { label: 'Fire & Security', table: 'leads_fire_security', color: 'red', icon: 'fire-extinguisher' },
    janitorial: { label: 'Janitorial', table: 'leads_janitorial', color: 'sky', icon: 'sparkle' },
    arborist: { label: 'Arborist', table: 'leads_arborist', color: 'emerald', icon: 'tree' },
    sleep_apnea: { label: 'Sleep Apnea', table: 'leads_sleep_apnea', color: 'purple', icon: 'moon-stars' }
};

const SCRIPTS = {
    universal: {
        intro: "Hi [Owner], this is [Name] from Autoikigai Systems. Catch you at a bad time?",
        value: "We help [Niche] businesses automate the follow-up for old estimates so you don't lose that 30% revenue leak. Act like a 24/7 sales assistant.",
        close: "Do you have 10 mins tomorrow to see a 2-min demo of how we recover those lost jobs?"
    },
    hooks: {
        paving: "helping paving contractors re-engage dead estimates for parking lot resurfacing to fill production schedules weeks in advance.",
        fire_security: "helping fire safety teams automate their inspection scheduling, specifically for monitoring contracts about to lapse.",
        janitorial: "helping commercial cleaners automate office service scheduling and client reactivation so the team can focus on operations.",
        arborist: "helping tree care companies get ahead of storm season by automated texting for unclosed tree removal quotes.",
        sleep_apnea: "helping clinics automate CPAP resupply orders so patients stay on track and you maximize recurring revenue."
    },
    objections: [
        { q: "Too busy", a: "Exactly why I called. We automate the follow-ups you don't have time for." },
        { q: "Send email", a: "Hard to show how the AI actually sounds/feels in email. Got 2 mins for a screen share tomorrow?" }
    ]
};

const PIPELINE_STAGES = [
    { id: 'new', label: 'New', color: 'slate', icon: 'asterisk' },
    { id: 'contacted', label: 'Contacted', color: 'blue', icon: 'phone-outgoing' },
    { id: 'interested', label: 'Interested', color: 'amber', icon: 'star' },
    { id: 'follow_up', label: 'Follow Up', color: 'purple', icon: 'clock-counter-clockwise' },
    { id: 'closed_won', label: 'Closed Won', color: 'emerald', icon: 'handshake' },
    { id: 'bad_lead', label: 'Bad Lead', color: 'red', icon: 'thumbs-down' }
];

let activeNiche = 'paving';
let activeRegion = 'us';
let allLeads = [];
let currentlyEditingLeadId = null;
let saveTimeout = null;
let sortableInstances = [];

function init() {
    console.log('[CRM] init() called');
    renderNicheTabs();
    renderKanbanBoard();
    renderModalStageOptions();
    
    // Fetch profile before initial load
    if (CRM_USER_ID && db) {
        db.from('profiles').select('*').eq('id', CRM_USER_ID).single().then(({ data }) => {
            currentUserProfile = data;
            switchNiche('paving');
        });
    } else {
        switchNiche('paving');
    }

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allLeads.filter(l => 
            (l.company_name && l.company_name.toLowerCase().includes(term)) ||
            (l.city_state && l.city_state.toLowerCase().includes(term))
        );
        distributeCards(filtered);
    });

    document.getElementById('new-note-input').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    });

    // Make window functions globally accessible since they are called from HTML onclicks
    window.switchNiche = switchNiche;
    window.fetchLeads = fetchLeads;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openWebsite = openWebsite;
    window.debouncedSaveModalLead = debouncedSaveModalLead;
    window.saveModalLead = saveModalLead;
    window.addNote = addNote;
    window.unassignLead = unassignLead;
window.researchWithAiki = researchWithAiki;
window.askAiki = askAiki;
window.setAikiExpression = setAikiExpression;
    window.quickAction = quickAction;
    window.addDmField = addDmField;
    window.removeDm = removeDm;
    window.updateDmData = updateDmData;
    window.switchRegion = switchRegion;
}

function getActiveTable() {
    const baseTable = NICHES[activeNiche].table;
    if (activeRegion === 'uk') {
        return baseTable.replace('leads_', 'leads_uk_');
    }
    return baseTable;
}

async function switchRegion(region) {
    if (activeRegion === region) return;
    activeRegion = region;
    
    document.getElementById('btn-region-us').className = region === 'us' 
        ? "px-4 py-1.5 rounded text-xs font-bold transition-colors bg-white/10 text-white shadow-sm border border-white/5" 
        : "px-4 py-1.5 rounded text-xs font-bold transition-colors text-zinc-500 hover:text-white border border-transparent";
        
    document.getElementById('btn-region-uk').className = region === 'uk'
        ? "px-4 py-1.5 rounded text-xs font-bold transition-colors bg-white/10 text-white shadow-sm border border-white/5"
        : "px-4 py-1.5 rounded text-xs font-bold transition-colors text-zinc-500 hover:text-white border border-transparent";
        
    await fetchLeads();
}

function renderNicheTabs() {
    console.log('[CRM] rendering tabs');
    const container = document.getElementById('niche-tabs');
    container.innerHTML = Object.entries(NICHES).map(([key, niche]) => `
        <div class="niche-tab ${key === activeNiche ? 'active' : ''} text-${niche.color}-400" 
             onclick="switchNiche('${key}')" id="tab-${key}">
            <i class="ph-fill ph-${niche.icon}"></i> <span class="whitespace-nowrap">${niche.label}</span>
            <span class="ml-1 bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-md text-xs font-bold" id="count-${key}">-</span>
        </div>
    `).join('');
}

function renderKanbanBoard() {
    console.log('[CRM] rendering board columns');
    const container = document.getElementById('kanban-board');
    container.innerHTML = PIPELINE_STAGES.map(stage => `
        <div class="kanban-column" id="col-${stage.id}">
            <div class="kanban-column-header text-${stage.color}-400">
                <div class="flex items-center gap-2">
                    <i class="ph-fill ph-${stage.icon}"></i>
                    <span class="uppercase tracking-wider text-sm">${stage.label}</span>
                </div>
                <span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-bold" id="col-count-${stage.id}">0</span>
            </div>
            <div class="kanban-cards h-full scrollbar-hide py-2" id="cards-${stage.id}"></div>
        </div>
    `).join('');

    initSortable();
}

function initSortable() {
    // Destroy previous instances
    sortableInstances.forEach(s => s.destroy());
    sortableInstances = [];

    PIPELINE_STAGES.forEach(stage => {
        const el = document.getElementById(`cards-${stage.id}`);
        if (!el) return;

        const s = new Sortable(el, {
            group: 'leads',
            animation: 200,
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onAdd: async (evt) => {
                const leadId = evt.item.getAttribute('data-id');
                const newStage = evt.to.id.replace('cards-', '');
                console.log(`[CRM] Lead ${leadId} moved to ${newStage}`);
                await updateLeadStage(leadId, newStage);
            }
        });
        sortableInstances.push(s);
    });
}

function renderModalStageOptions() {
    const select = document.getElementById('modal-stage-select');
    select.innerHTML = PIPELINE_STAGES.map(s => `<option value="${s.id}">${s.label}</option>`).join('');
}

async function switchNiche(nicheKey) {
    console.log('[CRM] switching to niche:', nicheKey);
    activeNiche = nicheKey;
    document.querySelectorAll('.niche-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${nicheKey}`).classList.add('active');
    document.getElementById('searchInput').value = '';
    await fetchLeads();
}

async function fetchLeads() {
    showLoader();
    try {
        console.log('[CRM] Fetching leads for', getActiveTable());
        let query = db
            .from(getActiveTable())
            .select('*, profiles(full_name, email)')
            .order('created_at', { ascending: false });
            
        // If not a master user, restrict leads to their own or unassigned
        if (currentUserProfile && currentUserProfile.role !== 'master') {
            query = query.or(`assigned_user_id.is.null,assigned_user_id.eq.${CRM_USER_ID}`);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        allLeads = data || [];
        console.log(`[CRM] Fetched ${allLeads.length} leads`);
        document.getElementById(`count-${activeNiche}`).textContent = allLeads.length;
        distributeCards(allLeads);
    } catch (err) {
        console.error("[CRM] Error fetching leads:", err);
        showToast("Failed to load leads", true);
    }
    hideLoader();
}

function distributeCards(leadsToRender) {
    // Clear
    PIPELINE_STAGES.forEach(s => {
        const el = document.getElementById(`cards-${s.id}`);
        if(el) el.innerHTML = '';
        const cnt = document.getElementById(`col-count-${s.id}`);
        if(cnt) cnt.textContent = '0';
    });

    const counts = {};
    PIPELINE_STAGES.forEach(s => counts[s.id] = 0);

    leadsToRender.forEach(lead => {
        const stage = lead.stage && PIPELINE_STAGES.find(s=>s.id === lead.stage) ? lead.stage : 'new';
        counts[stage]++;
        const container = document.getElementById(`cards-${stage}`);
        if (container) {
            container.appendChild(createCardElement(lead));
        }
    });

    PIPELINE_STAGES.forEach(s => {
        const cnt = document.getElementById(`col-count-${s.id}`);
        if(cnt) animateValue(cnt, parseInt(cnt.textContent) || 0, counts[s.id], 400);
    });
}

function animateValue(obj, start, end, duration) {
    if (start === end) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function escapeHtml(unsafe) {
    if(!unsafe) return '';
    return typeof unsafe === 'string' ? unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : unsafe;
}

function createCardElement(lead) {
    const el = document.createElement('div');
    el.className = 'kanban-card group';
    el.id = `card-${lead.id}`;
    el.setAttribute('data-id', lead.id);
    
    el.addEventListener('click', () => openModal(lead.id));

    const ratingHtml = lead.google_rating ? `<div class="flex items-center text-yellow-500 text-xs font-bold gap-1 mt-1"><i class="ph-fill ph-star"></i> ${lead.google_rating}</div>` : '';
    const lastContacted = lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString([], {month:'short', day:'numeric'}) : 'Never';
    
    // Render an assignment tag if someone is working on it
    let tagHtml = '';
    if (lead.profiles) {
        const name = lead.profiles.full_name || lead.profiles.email.split('@')[0];
        tagHtml = `<div class="mt-2"><span class="bg-[#00E0FF]/15 text-[#00E0FF] border border-[#00E0FF]/20 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider inline-flex items-center gap-1"><i class="ph-fill ph-user"></i> ${escapeHtml(name)}</span></div>`;
    }
    
    let actionBtns = '';
    if (lead.stage === 'new' || !lead.stage) {
        actionBtns = `<button onclick="quickAction(event, ${lead.id}, 'contacted')" class="mt-2 text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-2 py-1.5 rounded transition-colors w-full text-center font-semibold">Mark Contacted</button>`;
    } else if (lead.stage === 'contacted' || lead.stage === 'follow_up' || lead.stage === 'interested') {
        actionBtns = `
            <div class="flex gap-1.5 mt-2">
                <button onclick="quickAction(event, ${lead.id}, 'closed_won')" class="flex-1 text-[10px] bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white py-1 rounded transition-colors font-medium">Won</button>
                <button onclick="quickAction(event, ${lead.id}, 'bad_lead')" class="flex-1 text-[10px] bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-1 rounded transition-colors font-medium">Bad</button>
            </div>`;
    }

    el.innerHTML = `
        <div class="flex justify-between items-start gap-2">
            <h4 class="font-bold text-sm text-slate-100 leading-tight">${escapeHtml(lead.company_name) || 'Unknown Company'}</h4>
            ${lead.website_url ? `<a href="${lead.website_url}" target="_blank" onclick="event.stopPropagation()" class="text-slate-500 hover:text-blue-400 shrink-0"><i class="ph-bold ph-globe"></i></a>` : ''}
        </div>
        
        <div class="text-xs text-slate-400 flex flex-col gap-1 mt-1">
            ${lead.city_state ? `<span class="flex items-center gap-1.5"><i class="ph ph-map-pin"></i> ${escapeHtml(lead.city_state)}</span>` : ''}
            ${lead.phone_number ? `<span class="flex items-center gap-1.5"><i class="ph ph-phone"></i> ${escapeHtml(lead.phone_number)}</span>` : ''}
        </div>
        ${ratingHtml}
        
        <div class="mt-auto pt-3 border-t border-slate-700/50 flex justify-between items-center w-full">
            <span class="text-[10px] text-slate-500 font-medium flex items-center gap-1" title="Last Contacted">
                <i class="ph-bold ph-clock"></i> ${lastContacted}
            </span>
            <span class="text-[10px] text-slate-500 font-medium flex items-center gap-1" title="Created On">
                <i class="ph-bold ph-calendar-plus"></i> ${new Date(lead.created_at).toLocaleDateString([], {month:'short', day:'numeric'})}
            </span>
        </div>
        ${tagHtml}
        ${actionBtns}
    `;
    return el;
}

async function quickAction(ev, leadId, newStage) {
    ev.stopPropagation();
    await updateLeadStage(leadId, newStage);
}

async function updateLeadStage(leadId, newStage) {
    const leadIndex = allLeads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) return;

    const oldStage = allLeads[leadIndex].stage || 'new';
    const updates = { stage: newStage };
    
    // User tags an unassigned lead by acting on it
    if (CRM_USER_ID && !allLeads[leadIndex].assigned_user_id) {
        updates.assigned_user_id = CRM_USER_ID;
        allLeads[leadIndex].profiles = currentUserProfile;
    }
    
    if (newStage === 'contacted' || newStage === 'follow_up' || newStage === 'interested') {
        updates.last_contacted = new Date().toISOString();
    }

    allLeads[leadIndex] = { ...allLeads[leadIndex], ...updates };
    distributeCards(document.getElementById('searchInput').value ? allLeads.filter(l => (l.company_name && l.company_name.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase())) || (l.city_state && l.city_state.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))) : allLeads);

    try {
        const { error } = await db.from(getActiveTable()).update(updates).eq('id', leadId);
        if (error) throw error;
        showToast("Stage updated");
    } catch (err) {
        console.error("Update failed:", err);
        allLeads[leadIndex].stage = oldStage;
        if(updates.last_contacted) delete allLeads[leadIndex].last_contacted;
        distributeCards(allLeads);
        showToast("Failed to update stage", true);
    }
}

function openModal(leadId) {
    const lead = allLeads.find(l => l.id === leadId);
    if (!lead) return;
    currentlyEditingLeadId = leadId;

    document.getElementById('modal-input-company').value = lead.company_name || '';
    document.getElementById('modal-location').innerHTML = `<i class="ph-fill ph-map-pin"></i> ${escapeHtml(lead.city_state) || '-'}`;
    document.getElementById('modal-created-at').textContent = new Date(lead.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('modal-last-contacted').textContent = lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString() : 'Never';
    
    document.getElementById('modal-stage-select').value = lead.stage || 'new';
    
    document.getElementById('modal-input-phone').value = lead.phone_number || '';
    document.getElementById('modal-input-website').value = lead.website_url || '';
    document.getElementById('modal-input-city-state').value = lead.city_state || '';
    document.getElementById('modal-input-rating').value = lead.google_rating || '';
    
    // Fall back to empty since columns were renamed
    document.getElementById('modal-input-context').value = lead.context || '';
    
    // Reset Aiki State
    setAikiExpression('happy');
    document.getElementById('aiki-content').innerHTML = `"I'm standing by to research ${lead.company_name}. Click below to pull live web data."`;
    document.getElementById('aiki-chat-input').value = '';
    
    // Render notesarray from DB
    const meta = lead.metadata || {};
    let dbDms = meta.dms;
    
    if (!dbDms || !Array.isArray(dbDms) || dbDms.length === 0) {
        // Backwards compatibility with the static fields from before arrays were introduced
        if (lead.owner_gm_name || lead.email_address || meta.dm_phone) {
            dbDms = [{
                name: lead.owner_gm_name || '',
                title: '',
                phone: meta.dm_phone || '',
                email: lead.email_address || ''
            }];
        } else {
            dbDms = [];
        }
    }
    
    currentModalDms = JSON.parse(JSON.stringify(dbDms)); // deep copy
    renderDms();
    
    document.getElementById('modal-check-email').checked = !!lead.metadata?.outreach_email;
    document.getElementById('modal-check-linkedin').checked = !!lead.metadata?.outreach_linkedin;
    document.getElementById('modal-check-instagram').checked = !!lead.metadata?.outreach_instagram;

    const bd = document.getElementById('modal-header-bg');
    bd.className = `px-8 py-6 border-b border-slate-800 flex justify-between items-start sticky top-0 bg-slate-900/95 backdrop-blur z-20 rounded-t-[1rem] border-t-4 border-${NICHES[activeNiche].color}-500`;

    renderNotes(lead.notes);
    renderScript(lead);

    const assignmentEl = document.getElementById('modal-assignment');
    if (lead.profiles) {
        assignmentEl.innerHTML = `
            <div class="bg-white/5 border border-white/10 rounded-full pl-1 pr-3 py-1 flex items-center gap-2 group">
                <img src="${lead.profiles.avatar_url || 'https://via.placeholder.com/32'}" class="w-6 h-6 rounded-full border border-slate-700">
                <span class="text-slate-200 font-medium">${lead.profiles.full_name || lead.profiles.email}</span>
                ${lead.assigned_user_id === CRM_USER_ID ? `
                    <button onclick="unassignLead('${lead.id}')" class="ml-2 text-[10px] text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest font-black flex items-center gap-1 pl-2 border-l border-white/10">
                        <i class="ph-bold ph-user-minus"></i> Untag
                    </button>
                ` : ''}
            </div>
        `;
    } else {
        assignmentEl.innerHTML = `<span class="text-slate-500 italic flex items-center gap-1"><i class="ph ph-user"></i> Unassigned</span>`;
    }

    document.getElementById('leadModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('leadModal').classList.remove('active');
    document.body.style.overflow = '';
    currentlyEditingLeadId = null;
}

function openWebsite() {
    let url = document.getElementById('modal-input-website').value;
    if (url) {
        if (!url.startsWith('http')) url = 'https://' + url;
        window.open(url, '_blank');
    }
}

function debouncedSaveModalLead() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveModalLead, 1000);
}

async function saveModalLead() {
    if (!currentlyEditingLeadId) return;

    const leadId = currentlyEditingLeadId;
    const updates = {
        company_name: document.getElementById('modal-input-company').value,
        phone_number: document.getElementById('modal-input-phone').value,
        website_url: document.getElementById('modal-input-website').value,
        city_state: document.getElementById('modal-input-city-state').value,
        google_rating: document.getElementById('modal-input-rating').value || null,
        pain_point_pitch: document.getElementById('modal-input-context').value,
        stage: document.getElementById('modal-stage-select').value
    };
    
    // Sync array to primary columns
    if (currentModalDms.length > 0) {
        updates.owner_gm_name = currentModalDms[0].name;
        updates.email_address = currentModalDms[0].email;
    } else {
        updates.owner_gm_name = '';
        updates.email_address = '';
    }
    
    const leadIndex = allLeads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) return;
    
    // Merge metadata
    const currentMeta = allLeads[leadIndex].metadata || {};
    updates.metadata = {
        ...currentMeta,
        dms: currentModalDms,
        outreach_email: document.getElementById('modal-check-email').checked,
        outreach_linkedin: document.getElementById('modal-check-linkedin').checked,
        outreach_instagram: document.getElementById('modal-check-instagram').checked
    };
    // Ensure we delete legacy dm_phone if it conflicts (optional, but good for cleanliness)
    delete updates.metadata.dm_phone;
    
    const oldStage = allLeads[leadIndex].stage || 'new';
    if (updates.stage !== oldStage) {
        // Only auto-assign on STAGE CHANGE if currently unassigned
        if (CRM_USER_ID && !allLeads[leadIndex].assigned_user_id) {
            updates.assigned_user_id = CRM_USER_ID;
            allLeads[leadIndex].profiles = currentUserProfile;
        }
    }
    if ((updates.stage === 'contacted' || updates.stage === 'follow_up') && oldStage !== updates.stage) {
        updates.last_contacted = new Date().toISOString();
        document.getElementById('modal-last-contacted').textContent = new Date().toLocaleDateString();
    }
    allLeads[leadIndex] = { ...allLeads[leadIndex], ...updates };
    distributeCards(document.getElementById('searchInput').value ? allLeads.filter(l => (l.company_name && l.company_name.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase())) || (l.city_state && l.city_state.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))) : allLeads);

    try {
        const { error } = await db.from(getActiveTable()).update(updates).eq('id', leadId);
        if (error) throw error;
        showToast("Saved");
    } catch (err) {
        console.error("Save failed:", err);
        showToast("Error saving", true);
    }
}

async function unassignLead(leadId) {
    const leadIndex = allLeads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) return;
    
    showLoader();
    try {
        const { error } = await db.from(getActiveTable())
            .update({ assigned_user_id: null })
            .eq('id', leadId);
            
        if (error) throw error;
        
        allLeads[leadIndex].assigned_user_id = null;
        allLeads[leadIndex].profiles = null;
        
        // Refresh UI
        distributeCards(document.getElementById('searchInput').value ? allLeads.filter(l => (l.company_name && l.company_name.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase())) || (l.city_state && l.city_state.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))) : allLeads);
        openModal(leadId); // Refresh modal view
        showToast('Lead unassigned successfully', 'success');
    } catch (err) {
        console.error('[CRM] unassign error:', err);
        showToast('Failed to unassign lead', 'error');
    } finally {
        hideLoader();
    }
}

// --- AIKI AI ASSISTANT ---
const AIKI_ASSETS = {
    happy: 'assets/aiki/happy.jpg',
    angry: 'assets/aiki/angry.jpg',
    joy: 'assets/aiki/joy.jpg',
    sparkle: 'assets/aiki/sparkle.jpg',
    thinking: 'aiki-gif.gif' // Using the GIF for research state
};

function setAikiExpression(exp) {
    const img = document.getElementById('aiki-avatar');
    const scanner = document.getElementById('aiki-scanner');
    const dot = document.getElementById('aiki-status-dot');
    if (!img) return;
    
    img.src = AIKI_ASSETS[exp] || `https://via.placeholder.com/64?text=${exp}`;
    
    if (exp === 'thinking') {
        img.classList.add('animate-pulse');
        if (scanner) scanner.classList.add('scanning-line');
        if (dot) dot.className = 'absolute bottom-0 right-1 w-3 h-3 rounded-full bg-yellow-400 border-2 border-[#050505] z-30 animate-ping';
    } else {
        img.classList.remove('animate-pulse');
        if (scanner) scanner.classList.remove('scanning-line');
        if (dot) {
            dot.className = 'absolute bottom-0 right-1 w-3 h-3 rounded-full border-2 border-[#050505] z-30 transition-colors duration-500';
            dot.classList.add(exp === 'angry' ? 'bg-red-500' : (exp === 'joy' || exp === 'sparkle' ? 'bg-cyan-400' : 'bg-cyan-500'));
        }
    }
}

async function researchWithAiki() {
    const leadId = currentlyEditingLeadId;
    const lead = allLeads.find(l => l.id === leadId);
    if (!lead) return;

    const contentEl = document.getElementById('aiki-content');
    const btn = document.getElementById('btn-aiki-research');
    
    setAikiExpression('thinking');
    contentEl.innerHTML = '<span class="text-cyan-400 flex items-center gap-2"><i class="ph-bold ph-broadcast animate-pulse"></i> Syncing with neural network...</span>';
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
    btn.innerHTML = '<i class="ph-bold ph-activity animate-spin"></i> SCANNING WEB...';

    try {
        const prompt = `Research ${lead.company_name} in ${lead.city_state || 'their local area'}. URL: ${lead.website_url || 'Unknown'}. 
        Find: 1. Their core specialty. 2. A recent victory or news. 3. A killer one-sentence cold call opener. 
        Formatting: Use short bullet points. Heading: "AIKI INSIGHT"`;

        const response = await fetch('/api/aiki', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const result = await response.json();
        if (result.error) throw new Error(result.error);

        const insight = result.choices[0].message.content;
        contentEl.classList.remove('italic');
        contentEl.innerHTML = `<div class="aiki-result text-[11px] space-y-3 font-medium text-zinc-100">${insight.replace(/\n/g, '<br>')}</div>`;
        setAikiExpression('sparkle');
        showToast('Deep research complete!', 'success');
    } catch (err) {
        console.error('[Aiki] Research error:', err);
        contentEl.innerHTML = '<span class="text-red-400">My signals are crossed. Connection dropped.</span>';
        setAikiExpression('angry');
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.innerHTML = '<i class="ph-bold ph-lightning"></i> Initialize Deep Research';
    }
}

async function askAiki() {
    const input = document.getElementById('aiki-chat-input');
    const question = input.value.trim();
    if (!question) return;

    const leadId = currentlyEditingLeadId;
    const lead = allLeads.find(l => l.id === leadId);
    const contentEl = document.getElementById('aiki-content');
    
    input.value = '';
    setAikiExpression('thinking');
    contentEl.innerHTML = `<span class="text-cyan-400 italic">Thinking about "${question}"...</span>`;

    try {
        const prompt = `Lead: ${lead.company_name}. Question: ${question}. Answer as Aiki, the Cyber-Daruma assistant. Be concise and sharp. Use the live web if needed.`;
        
        const response = await fetch('/api/aiki', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const result = await response.json();
        if (result.error) throw new Error(result.error);

        contentEl.innerHTML = `<div class="aiki-chat-response text-[11px] border-l-2 border-cyan-500/30 pl-3 py-1 text-zinc-300 font-medium">${result.choices[0].message.content}</div>`;
        setAikiExpression('joy');
    } catch (err) {
        contentEl.innerHTML = '<span class="text-red-400">Connection drop. Try again?</span>';
        setAikiExpression('angry');
    }
}

function renderNotes(notesStr) {
    const container = document.getElementById('notes-list');
    if (!notesStr) {
        container.innerHTML = '<div class="text-slate-500 text-sm italic text-center py-4">No activity logged yet.</div>';
        return;
    }

    let notes = notesStr.split('\\n---\\n').filter(n => n.trim() !== '');
    if(notes.length === 0 || (notesStr.indexOf('---\\n') === -1 && notesStr.indexOf('---') === -1)) {
        container.innerHTML = `<div class="bg-slate-800/80 p-4 rounded-xl text-sm border border-slate-700/50 whitespace-pre-wrap leading-relaxed shadow-sm text-slate-300">${escapeHtml(notesStr)}</div>`;
        return;
    }

    if (notesStr.includes('---')) {
         notes = notesStr.split('---').filter(n => n.trim() !== '');
    }

    container.innerHTML = notes.reverse().map(note => `<div class="bg-slate-800/80 p-4 rounded-xl text-sm border border-slate-700/50 whitespace-pre-wrap leading-relaxed shadow-sm text-slate-300">${escapeHtml(note.trim())}</div>`).join('');
}

async function addNote() {
    if (!currentlyEditingLeadId) return;
    const input = document.getElementById('new-note-input');
    const newContent = input.value.trim();
    if (!newContent) return;

    const leadIndex = allLeads.findIndex(l => l.id === currentlyEditingLeadId);
    if (leadIndex === -1) return;
    const lead = allLeads[leadIndex];

    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const timestamp = formatter.format(new Date());
    const userName = currentUserProfile ? (currentUserProfile.full_name || currentUserProfile.email.split('@')[0]) : 'User';
    const formattedNote = `[${timestamp}, ${userName}] ${newContent}`;
    
    const existingNotes = lead.notes ? lead.notes : '';
    const updatedNotes = existingNotes ? `${existingNotes}\n---\n${formattedNote}` : formattedNote;

    input.value = '';
    lead.notes = updatedNotes;
    renderNotes(updatedNotes);

    try {
        const { error } = await db.from(getActiveTable()).update({ notes: updatedNotes }).eq('id', currentlyEditingLeadId);
        if (error) throw error;
        showToast("Note added");
    } catch (err) {
        console.error("Add note failed:", err);
        showToast("Failed to add note", true);
        lead.notes = existingNotes;
        renderNotes(existingNotes);
        input.value = newContent;
    }
}

function showLoader() { document.getElementById('loader').classList.add('active'); }
function hideLoader() { document.getElementById('loader').classList.remove('active'); }

let toastTimeout;

function renderScript(lead) {
    const box = document.getElementById('modal-script-box');
    const hook = SCRIPTS.hooks[activeNiche] || "[Niche Hook]";
    const owner = lead.owner_gm_name || lead.company_name || "there";
    
    box.innerHTML = `
        <div class="space-y-3">
            <p><span class="text-cyan-400 font-bold uppercase">Intro:</span><br> "Hi ${owner}, this is [Name] from Autoikigai. Catch you at a bad time?"</p>
            <p><span class="text-cyan-400 font-bold uppercase">Hook:</span><br> "I'm calling because we're <strong>${hook}</strong>"</p>
            <p><span class="text-cyan-400 font-bold uppercase">Close:</span><br> "Do you have 10 mins tomorrow to see a 2-min demo of how we recover those lost jobs?"</p>
            <div class="mt-4 pt-3 border-t border-slate-800">
                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Objections:</span>
                <div class="grid grid-cols-2 gap-2 mt-2">
                    ${SCRIPTS.objections.map(ob => `
                        <div class="bg-black/30 p-2 rounded border border-white/5 cursor-help" title="${ob.a}">
                            <div class="text-[10px] font-bold text-slate-400">${ob.q}</div>
                            <div class="text-[9px] text-slate-500 italic mt-0.5 line-clamp-1">${ob.a}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = msg;
    const icon = document.getElementById('toast-icon');
    if(isError) {
        toast.style.background = '#ef4444';
        icon.className = 'ph-fill ph-warning text-xl';
    } else {
        toast.style.background = '#10b981';
        icon.className = 'ph-fill ph-check-circle text-xl';
    }
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

function renderDms() {
    const container = document.getElementById('modal-dms-container');
    container.innerHTML = currentModalDms.map((dm, i) => `
        <div class="rounded-xl p-4 space-y-2.5 relative group" style="background:var(--card);border:1px solid var(--border)">
            <button onclick="removeDm(${i})" class="absolute top-2 right-2 text-xs text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove DM"><i class="ph-bold ph-trash"></i></button>
            <div class="flex items-center gap-3"><i class="ph-fill ph-user w-4 text-zinc-500"></i><input type="text" class="editable-input text-sm font-semibold text-white dm-input" data-index="${i}" data-field="name" value="${escapeHtml(dm.name || '')}" placeholder="Decision Maker Name" oninput="updateDmData(this)"></div>
            <div class="flex items-center gap-3"><i class="ph-fill ph-briefcase w-4 text-zinc-500"></i><input type="text" class="editable-input text-xs uppercase tracking-wider text-zinc-400 dm-input" data-index="${i}" data-field="title" value="${escapeHtml(dm.title || '')}" placeholder="Job Title (e.g., CEO, Facility Manager)" oninput="updateDmData(this)"></div>
            <div class="flex items-center gap-3"><i class="ph-fill ph-phone w-4 text-zinc-500"></i><input type="text" class="editable-input text-sm font-mono dm-input" data-index="${i}" data-field="phone" value="${escapeHtml(dm.phone || '')}" placeholder="Direct Phone / Cell" oninput="updateDmData(this)"></div>
            <div class="flex items-center gap-3"><i class="ph-fill ph-envelope w-4 text-zinc-500"></i><input type="text" class="editable-input text-sm font-mono dm-input" data-index="${i}" data-field="email" value="${escapeHtml(dm.email || '')}" placeholder="Direct Email" oninput="updateDmData(this)"></div>
        </div>
    `).join('');
}

function addDmField() {
    currentModalDms.push({ name: '', title: '', phone: '', email: '' });
    renderDms();
    debouncedSaveModalLead();
}

function removeDm(i) {
    currentModalDms.splice(i, 1);
    renderDms();
    debouncedSaveModalLead();
}

function updateDmData(input) {
    const i = parseInt(input.dataset.index);
    const field = input.dataset.field;
    currentModalDms[i][field] = input.value;
    debouncedSaveModalLead();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
