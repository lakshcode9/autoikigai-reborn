const SUPABASE_URL = 'https://jytnvlammcdlfcfdyvab.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dG52bGFtbWNkbGZjZmR5dmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDgzNzgsImV4cCI6MjA4ODI4NDM3OH0.Oyy_oO62B_iLrW9Gr7ggFm1ygCOoV0ONy71E5oUb0og';

console.log('[CRM] app.js starting');

const urlParams = new URLSearchParams(window.location.search);
const CRM_TOKEN = urlParams.get('t');
const CRM_REFRESH = urlParams.get('rt');
const CRM_USER_ID = urlParams.get('u');

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
let allLeads = [];
let currentlyEditingLeadId = null;
let saveTimeout = null;

function init() {
    console.log('[CRM] init() called');
    renderNicheTabs();
    renderKanbanBoard();
    renderModalStageOptions();
    switchNiche('paving');

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
    window.allowDrop = allowDrop;
    window.dragLeave = dragLeave;
    window.drop = drop;
    window.quickAction = quickAction;
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
        <div class="kanban-column" id="col-${stage.id}" ondragover="allowDrop(event)" ondragleave="dragLeave(event)" ondrop="drop(event, '${stage.id}')">
            <div class="kanban-column-header text-${stage.color}-400">
                <div class="flex items-center gap-2">
                    <i class="ph-fill ph-${stage.icon}"></i>
                    <span class="uppercase tracking-wider text-sm">${stage.label}</span>
                </div>
                <span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs font-bold" id="col-count-${stage.id}">0</span>
            </div>
            <div class="kanban-cards scrollbar-hide" id="cards-${stage.id}"></div>
        </div>
    `).join('');
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
        console.log('[CRM] Fetching leads for', NICHES[activeNiche].table);
        const { data, error } = await db
            .from(NICHES[activeNiche].table)
            .select('*')
            .order('created_at', { ascending: false });

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
        if(cnt) cnt.textContent = counts[s.id];
    });
}

function escapeHtml(unsafe) {
    if(!unsafe) return '';
    return typeof unsafe === 'string' ? unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : unsafe;
}

function createCardElement(lead) {
    const el = document.createElement('div');
    el.className = 'kanban-card group';
    el.draggable = true;
    el.id = `card-${lead.id}`;
    el.setAttribute('data-id', lead.id);
    
    el.addEventListener('dragstart', (e) => {
        el.classList.add('dragging');
        e.dataTransfer.setData('text/plain', lead.id);
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
    el.addEventListener('click', () => openModal(lead.id));

    const ratingHtml = lead.google_rating ? `<div class="flex items-center text-yellow-500 text-xs font-bold gap-1 mt-1"><i class="ph-fill ph-star"></i> ${lead.google_rating}</div>` : '';
    const lastContacted = lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString([], {month:'short', day:'numeric'}) : 'Never';
    
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
        ${actionBtns}
    `;
    return el;
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('column-drag-over');
}

function dragLeave(ev) {
    ev.currentTarget.classList.remove('column-drag-over');
}

async function drop(ev, newStage) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('column-drag-over');
    const leadId = parseInt(ev.dataTransfer.getData('text/plain'));
    if (!leadId) return;

    const lead = allLeads.find(l => l.id === leadId);
    if (!lead || (lead.stage || 'new') === newStage) return;

    await updateLeadStage(leadId, newStage);
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
    if (CRM_USER_ID) {
        updates.assigned_user_id = CRM_USER_ID;
    }
    
    if (newStage === 'contacted' || newStage === 'follow_up' || newStage === 'interested') {
        updates.last_contacted = new Date().toISOString();
    }

    allLeads[leadIndex] = { ...allLeads[leadIndex], ...updates };
    distributeCards(document.getElementById('searchInput').value ? allLeads.filter(l => (l.company_name && l.company_name.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase())) || (l.city_state && l.city_state.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))) : allLeads);

    try {
        const { error } = await db.from(NICHES[activeNiche].table).update(updates).eq('id', leadId);
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
    document.getElementById('modal-created-at').textContent = new Date(lead.created_at).toLocaleDateString();
    document.getElementById('modal-last-contacted').textContent = lead.last_contacted ? new Date(lead.last_contacted).toLocaleDateString() : 'Never';
    
    document.getElementById('modal-stage-select').value = lead.stage || 'new';
    
    document.getElementById('modal-input-phone').value = lead.phone_number || '';
    document.getElementById('modal-input-website').value = lead.website_url || '';
    document.getElementById('modal-input-city-state').value = lead.city_state || '';
    document.getElementById('modal-input-rating').value = lead.google_rating || '';
    
    // Fall back to empty since columns were renamed
    document.getElementById('modal-input-context').value = lead.pain_point_pitch || '';
    
    const bd = document.getElementById('modal-header-bg');
    bd.className = `px-8 py-6 border-b border-slate-800 flex justify-between items-start sticky top-0 bg-slate-900/95 backdrop-blur z-20 rounded-t-[1rem] border-t-4 border-${NICHES[activeNiche].color}-500`;

    renderNotes(lead.notes);
    renderScript(lead);

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
        stage: document.getElementById('modal-stage-select').value,
    };
    if (CRM_USER_ID) {
        updates.assigned_user_id = CRM_USER_ID;
    }

    const leadIndex = allLeads.findIndex(l => l.id === leadId);
    if (leadIndex !== -1) {
        const oldStage = allLeads[leadIndex].stage || 'new';
        if ((updates.stage === 'contacted' || updates.stage === 'follow_up') && oldStage !== updates.stage) {
            updates.last_contacted = new Date().toISOString();
            document.getElementById('modal-last-contacted').textContent = new Date().toLocaleDateString();
        }
        allLeads[leadIndex] = { ...allLeads[leadIndex], ...updates };
        distributeCards(document.getElementById('searchInput').value ? allLeads.filter(l => (l.company_name && l.company_name.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase())) || (l.city_state && l.city_state.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()))) : allLeads);
    }

    try {
        const { error } = await db.from(NICHES[activeNiche].table).update(updates).eq('id', leadId);
        if (error) throw error;
        showToast("Saved");
    } catch (err) {
        console.error("Save failed:", err);
        showToast("Error saving", true);
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
    
    const formattedNote = `[${timestamp}] ${newContent}`;
    
    const existingNotes = lead.notes ? lead.notes : '';
    const updatedNotes = existingNotes ? `${existingNotes}\n---\n${formattedNote}` : formattedNote;

    input.value = '';
    lead.notes = updatedNotes;
    renderNotes(updatedNotes);

    try {
        const { error } = await db.from(NICHES[activeNiche].table).update({ notes: updatedNotes }).eq('id', currentlyEditingLeadId);
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
