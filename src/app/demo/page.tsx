"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// --- DATA ---
const NICHE_DATA: Record<string, any> = {
    paving: {
        clientName: "Mike's Paving Co.",
        contactName: "John Rivera",
        contactInitials: "JR",
        contactNumber: "+1 (703) 555-0147",
        totalLeads: 247,
        avgJobValue: 4200,
        sequence: [
            { type: "outgoing", text: "Hey John, this is Mike's Paving. Back in October you asked about getting your driveway resurfaced — are you still thinking about it, or did you end up going with someone else?", feedText: "SMS 1 sent to John Rivera", feedType: "sent", step: 1 },
            { type: "delay", duration: 2000, feedText: "Waiting for response...", feedType: "normal" },
            { type: "typing", duration: 2500 },
            { type: "incoming", text: "Hey! No I actually never got it done. Life got busy. Is Mike still doing work in my area?", feedText: "🔥 POSITIVE RESPONSE from John Rivera!", feedType: "positive", reactivated: true },
            { type: "outgoing", text: "Absolutely! Mike's booked out about 2 weeks right now but we could squeeze you in before summer hits. Want me to have him swing by Thursday or Friday for a quick look?", feedText: "Follow-up sent — booking attempt", feedType: "sent", step: 2 },
            { type: "typing", duration: 1800 },
            { type: "incoming", text: "Thursday works. After 3pm if possible. Same address on Maple St.", feedText: "🎯 APPOINTMENT BOOKED — John Rivera, Thursday 3pm", feedType: "positive", appointment: true },
            { type: "notification", title: "Appointment Booked!", body: "<strong>John Rivera</strong> — Driveway Resurfacing<br>Thursday after 3pm • Maple St address<br>Estimated value: <strong>$4,200</strong>", feedText: "💰 Est. revenue: $4,200 — previously a dead lead", feedType: "positive" }
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
            { type: "outgoing", text: "Hi Diana, this is SafeGuard Fire Systems. We spoke earlier this year about upgrading the fire alarm panel at your building on Commerce Dr. Your current system may not meet the updated NFPA codes — wanted to check if you've addressed that yet?", feedText: "SMS 1 sent to Diana Chen — compliance angle", feedType: "sent", step: 1 },
            { type: "delay", duration: 2000, feedText: "Waiting for response...", feedType: "normal" },
            { type: "typing", duration: 3000 },
            { type: "incoming", text: "No we haven't done anything yet. Our insurance company actually just mentioned something about this too. What would it cost to get compliant?", feedText: "🔥 POSITIVE RESPONSE from Diana Chen — insurance urgency!", feedType: "positive", reactivated: true },
            { type: "outgoing", text: "That's exactly what we help with. It depends on your panel type and building size — would it work if our tech came by for a free 20-min assessment this week? We can give you a compliance report you can show your insurer.", feedText: "Follow-up sent — free assessment offer", feedType: "sent", step: 2 },
            { type: "typing", duration: 2000 },
            { type: "incoming", text: "Yes that would be great. Can someone come Wednesday morning?", feedText: "🎯 APPOINTMENT BOOKED — Diana Chen, Wednesday AM", feedType: "positive", appointment: true },
            { type: "notification", title: "Appointment Booked!", body: "<strong>Diana Chen</strong> — Fire Panel Upgrade / Compliance<br>Wednesday morning • Commerce Dr<br>Estimated value: <strong>$8,500</strong>", feedText: "💰 Est. revenue: $8,500 — dead lead since February", feedType: "positive" }
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
            { type: "outgoing", text: "Hi Marcus, this is CleanPro Commercial. We connected back in January about janitorial services for your office space. I know you mentioned you had a contract at the time — is that still working out, or has anything changed?", feedText: "SMS 1 sent to Marcus Thompson — contract check-in", feedType: "sent", step: 1 },
            { type: "delay", duration: 2000, feedText: "Waiting for response...", feedType: "normal" },
            { type: "typing", duration: 2800 },
            { type: "incoming", text: "Actually yeah, our current crew has been inconsistent. We've had 3 different teams in the last 2 months. I'm open to hearing what you can offer.", feedText: "🔥 POSITIVE RESPONSE from Marcus Thompson — competitor failing!", feedType: "positive", reactivated: true },
            { type: "outgoing", text: "I hear that a lot — turnover is the #1 complaint. We assign dedicated teams so you see the same faces every visit. Can I send our ops manager by this week for a quick walkthrough? No pressure, just want to see the space and give you a real number.", feedText: "Follow-up sent — walkthrough request", feedType: "sent", step: 2 },
            { type: "typing", duration: 1500 },
            { type: "incoming", text: "Sure. Friday afternoon works best. We're at 4200 York Rd, Suite 200.", feedText: "🎯 APPOINTMENT BOOKED — Marcus Thompson, Friday PM", feedType: "positive", appointment: true },
            { type: "notification", title: "Appointment Booked!", body: "<strong>Marcus Thompson</strong> — Commercial Janitorial Contract<br>Friday afternoon • 4200 York Rd, Suite 200<br>Estimated value: <strong>$2,800/mo recurring</strong>", feedText: "💰 Est. value: $2,800/mo RECURRING — previously dead lead", feedType: "positive" }
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
            { type: "outgoing", text: "Hey Robert, this is Summit Tree Care. You reached out last fall about the oak tree near your fence line. With storm season coming up, wanted to check — is that tree still a concern, or did you get it handled?", feedText: "SMS 1 sent to Robert Kazinski — seasonal trigger", feedType: "sent", step: 1 },
            { type: "delay", duration: 2000, feedText: "Waiting for response...", feedType: "normal" },
            { type: "typing", duration: 2200 },
            { type: "incoming", text: "Ha, no it's still there. Actually got worse over the winter — it's leaning more now. I've been meaning to call someone.", feedText: "🔥 POSITIVE RESPONSE from Robert Kazinski — urgent need!", feedType: "positive", reactivated: true },
            { type: "outgoing", text: "If it's leaning more that's definitely something to look at before spring storms. Our arborist can come assess it and give you a plan — would early next week work?", feedText: "Follow-up sent — urgency + assessment offer", feedType: "sent", step: 2 },
            { type: "typing", duration: 1600 },
            { type: "incoming", text: "Yeah, Tuesday would be good. Morning is better. I'll be home.", feedText: "🎯 APPOINTMENT BOOKED — Robert Kazinski, Tuesday AM", feedType: "positive", appointment: true },
            { type: "notification", title: "Appointment Booked!", body: "<strong>Robert Kazinski</strong> — Oak Tree Removal/Trimming<br>Tuesday morning • On-site<br>Estimated value: <strong>$3,200</strong>", feedText: "💰 Est. revenue: $3,200 — lead from last fall brought back", feedType: "positive" }
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
            { type: "outgoing", text: "Hi Patricia, this is RestWell Sleep Center. You visited us a while back for a consultation. We have some new treatment options available and wanted to check if you'd like to come in for a follow-up. Would that be of interest?", feedText: "SMS 1 sent to Patricia Simmons — HIPAA-safe", feedType: "sent", step: 1 },
            { type: "delay", duration: 2000, feedText: "Waiting for response...", feedType: "normal" },
            { type: "typing", duration: 2600 },
            { type: "incoming", text: "Hi, yes actually. I've been meaning to come back. The treatment I was on before wasn't really working for me. What new options do you have?", feedText: "🔥 POSITIVE RESPONSE from Patricia Simmons — re-engagement!", feedType: "positive", reactivated: true },
            { type: "outgoing", text: "There are a few newer approaches our doctors can walk you through — it really depends on your specific situation. Would you like to schedule a follow-up visit? We have openings this week and next.", feedText: "Follow-up sent — scheduling offer (HIPAA-compliant)", feedType: "sent", step: 2 },
            { type: "typing", duration: 1800 },
            { type: "incoming", text: "Yes please. Do you have anything available next Thursday? Late morning would be ideal.", feedText: "🎯 APPOINTMENT BOOKED — Patricia Simmons, Next Thursday", feedType: "positive", appointment: true },
            { type: "notification", title: "Appointment Booked!", body: "<strong>Patricia Simmons</strong> — Follow-up Consultation<br>Next Thursday, late morning<br>Estimated value: <strong>$5,200</strong> (treatment cycle)", feedText: "💰 Est. value: $5,200 — patient re-engaged after months", feedType: "positive" }
        ]
    }
};

// --- COMPONENTS ---

const TypingIndicator = () => (
    <div className="flex gap-1 p-3 px-4 bg-[#e5e5ea] rounded-2xl rounded-bl border border-black/5 self-start w-16 shadow-sm">
        <span className="w-1.5 h-1.5 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-1.5 h-1.5 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-1.5 h-1.5 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </div>
);

export default function DemoPage() {
    const [currentNicheKey, setCurrentNicheKey] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const [stats, setStats] = useState({
        reactivated: 0,
        responseRate: 0,
        appointments: 0,
        revenue: 0,
        baseLeads: 0
    });
    
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [feed, setFeed] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [activeSequenceStep, setActiveSequenceStep] = useState(1);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const feedContainerRef = useRef<HTMLDivElement>(null);

    // Auto scroll messages locally
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);
    
    // Auto scroll feed
    useEffect(() => {
        if (feedContainerRef.current) {
            feedContainerRef.current.scrollTop = feedContainerRef.current.scrollHeight;
        }
    }, [feed]);

    const addToFeed = (text: string, type: string) => {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setFeed(prev => [{ time, text, type, id: Math.random() }, ...prev]);
    };

    const currentStepRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const currentNicheKeyRef = useRef<string | null>(null);

    const autoAdvanceCheck = useCallback(() => {
        const nicheKey = currentNicheKeyRef.current;
        if (!nicheKey) return;
        const currentNiche = NICHE_DATA[nicheKey];
        const step = currentStepRef.current;
        
        if (step < currentNiche.sequence.length) {
            const nextAction = currentNiche.sequence[step];
            // Auto advance if next is delay, typing, or notification
            if (nextAction.type === 'delay' || nextAction.type === 'typing' || nextAction.type === 'notification') {
                setTimeout(() => advanceDemoTrigger(), 50);
            }
        }
    }, []);

    const advanceDemoTrigger = useCallback(() => {
        const nicheKey = currentNicheKeyRef.current;
        if (isAnimatingRef.current || !nicheKey) return;
        
        const currentNiche = NICHE_DATA[nicheKey];
        const step = currentStepRef.current;
        if (step >= currentNiche.sequence.length) return;

        const action = currentNiche.sequence[step];
        currentStepRef.current = step + 1;
        setCurrentStep(step + 1);

        switch (action.type) {
            case 'outgoing':
            case 'incoming':
                isAnimatingRef.current = true;
                setIsAnimating(true);
                
                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                setMessages(prev => [...prev, {
                    id: Math.random(),
                    type: action.type,
                    text: action.text,
                    time: timeStr
                }]);
                
                if (action.feedText) addToFeed(action.feedText, action.feedType);
                if (action.step) setActiveSequenceStep(action.step);
                
                if (action.reactivated) {
                    setStats(s => ({
                        ...s, 
                        reactivated: s.reactivated + 1,
                        responseRate: Math.round(((s.reactivated + 1) / 50) * 100)
                    }));
                    setActiveSequenceStep(4);
                }
                
                if (action.appointment) {
                    setStats(s => ({
                        ...s,
                        appointments: s.appointments + 1,
                        revenue: s.revenue + currentNiche.avgJobValue
                    }));
                }
                
                setTimeout(() => {
                    isAnimatingRef.current = false;
                    setIsAnimating(false);
                    autoAdvanceCheck();
                }, 600);
                break;

            case 'typing':
                isAnimatingRef.current = true;
                setIsAnimating(true);
                setIsTyping(true);
                if (action.feedText) addToFeed(action.feedText, action.feedType || 'normal');
                
                setTimeout(() => {
                    setIsTyping(false);
                    isAnimatingRef.current = false;
                    setIsAnimating(false);
                    autoAdvanceCheck();
                }, action.duration);
                break;

            case 'delay':
                isAnimatingRef.current = true;
                setIsAnimating(true);
                if (action.feedText) addToFeed(action.feedText, action.feedType);
                
                setTimeout(() => {
                    isAnimatingRef.current = false;
                    setIsAnimating(false);
                    autoAdvanceCheck();
                }, action.duration);
                break;

            case 'notification':
                const notifId = Math.random();
                setNotifications(prev => [...prev, { id: notifId, title: action.title, body: action.body }]);
                if (action.feedText) addToFeed(action.feedText, action.feedType);
                
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notifId));
                }, 6000);
                
                isAnimatingRef.current = false;
                setIsAnimating(false);
                autoAdvanceCheck();
                break;
        }
    }, [autoAdvanceCheck]);

    const startDemo = (nicheKey: string) => {
        const nicheContent = NICHE_DATA[nicheKey];
        setCurrentNicheKey(nicheKey);
        currentNicheKeyRef.current = nicheKey;
        
        setCurrentStep(0);
        currentStepRef.current = 0;
        
        setIsAnimating(false);
        isAnimatingRef.current = false;

        setStats({
            reactivated: 0,
            responseRate: 0,
            appointments: 0,
            revenue: 0,
            baseLeads: nicheContent.totalLeads
        });
        setMessages([]);
        setIsTyping(false);
        setActiveSequenceStep(1);
        setFeed([]);
        
        setTimeout(() => {
            addToFeed(`Campaign started for ${nicheContent.clientName}`, 'sent');
        }, 100);

        setTimeout(() => {
            advanceDemoTrigger();
        }, 1000);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                advanceDemoTrigger();
            }
            if (e.code === 'Escape' && currentNicheKey) {
                setCurrentNicheKey(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentNicheKey, advanceDemoTrigger]);

    // Handle clicks for advancing demo on mobile/no-keyboard
    const handleScreenClick = () => {
        if (currentNicheKey) {
             advanceDemoTrigger();
        }
    };

    if (!currentNicheKey) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans p-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,224,255,0.1),transparent_50%)]" />
                </div>
                
                <div className="absolute top-8 left-8 z-10">
                   <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-[#00E0FF] transition-colors font-bebas tracking-widest text-lg">
                     <ArrowLeft className="w-5 h-5"/> BACK TO HOME
                   </Link>
                </div>
                
                <div className="z-10 relative flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00E0FF] tracking-widest font-bebas mb-12 text-center drop-shadow-[0_0_15px_rgba(0,224,255,0.4)]">
                        SELECT NICHE FOR DEMO
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center max-w-2xl w-full">
                        {Object.keys(NICHE_DATA).map(key => {
                            const info = NICHE_DATA[key];
                            return (
                                <button 
                                    key={key}
                                    onClick={() => startDemo(key)}
                                    className="bg-white/5 border border-white/10 font-bold py-4 px-6 rounded-xl text-lg hover:bg-white/10 hover:border-[#00E0FF] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,224,255,0.3)] transition-all font-bebas tracking-widest text-white/80 hover:text-white uppercase"
                                >
                                    {key === 'paving' && '🛣️ Paving'}
                                    {key === 'fire' && '🔥 Fire & Security'}
                                    {key === 'janitorial' && '🧹 Janitorial'}
                                    {key === 'arborist' && '🌳 Arborist'}
                                    {key === 'sleep' && '😴 Sleep Apnea'}
                                </button>
                            )
                        })}
                    </div>
                </div>
                
                <p className="text-white/40 text-sm mt-12 text-center animate-pulse z-10 font-mono tracking-wide">
                    Press <kbd className="bg-white/10 px-2 py-1 rounded border border-white/20 mx-1">Space</kbd> or click anywhere to advance messages during demo
                </p>
            </div>
        );
    }

    const currentNiche = NICHE_DATA[currentNicheKey];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-black text-white font-sans overflow-hidden" onClick={handleScreenClick}>
            
            {/* LEFT PANEL: DASHBOARD */}
            <div className="flex-1 bg-black p-6 md:p-8 flex flex-col gap-6 overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 h-[50vh] md:h-full hide-scrollbar relative">
                
                {/* Background glow matching the home page */}
                <div className="absolute pointer-events-none top-0 left-0 w-[500px] h-[500px] bg-[#00E0FF]/5 blur-[120px] rounded-full" />
                
                <div className="relative z-10 flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 border border-[#00E0FF]/30 bg-[#00E0FF]/10 rounded-xl flex items-center justify-center text-[#00E0FF] text-lg shadow-[0_0_15px_rgba(0,224,255,0.3)]">⚡</div>
                        <span className="text-2xl font-bebas tracking-widest text-[#00E0FF]">AUTOIKIGAI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={(e) => { e.stopPropagation(); setCurrentNicheKey(null); }} className="text-white/40 hover:text-[#00E0FF] text-xs font-bebas tracking-widest border border-white/10 hover:border-[#00E0FF]/50 px-3 py-1.5 rounded-full transition-colors">EXIT DEMO</button>
                        <div className="text-white/70 text-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/10 font-bebas tracking-wide">
                            {currentNiche.clientName.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl transition-all">
                        <div className="text-[11px] font-bold text-white/50 uppercase font-bebas tracking-widest mb-1">Dead Leads Loaded</div>
                        <div className="text-4xl font-bebas mb-1">{stats.baseLeads}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wide font-mono">from your CRM export</div>
                    </div>
                    <div className={`p-4 rounded-2xl transition-all duration-500 border ${stats.reactivated > 0 ? 'bg-[#00E0FF]/10 border-[#00E0FF] shadow-[0_0_20px_rgba(0,224,255,0.2)]' : 'bg-white/5 border-white/10'}`}>
                        <div className="text-[11px] font-bold text-white/50 uppercase font-bebas tracking-widest mb-1">Reactivated</div>
                        <div className={`text-4xl font-bebas mb-1 transition-colors ${stats.reactivated > 0 ? 'text-[#00E0FF] drop-shadow-[0_0_10px_rgba(0,224,255,0.8)]' : 'text-white/50'}`}>
                            {stats.reactivated}
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wide font-mono">{stats.reactivated > 0 ? 'from dead leads!' : 'watching...'}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl transition-all">
                        <div className="text-[11px] font-bold text-white/50 uppercase font-bebas tracking-widest mb-1">Response Rate</div>
                        <div className="text-4xl font-bebas mb-1">{stats.responseRate}%</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wide font-mono">{stats.responseRate > 0 ? '8x industry avg' : 'industry avg: 3%'}</div>
                    </div>
                    <div className={`p-4 rounded-2xl transition-all duration-500 border ${stats.appointments > 0 ? 'bg-[#00E0FF]/10 border-[#00E0FF] shadow-[0_0_20px_rgba(0,224,255,0.2)]' : 'bg-white/5 border-white/10'}`}>
                        <div className="text-[11px] font-bold text-white/50 uppercase font-bebas tracking-widest mb-1">Appointments Booked</div>
                        <div className={`text-4xl font-bebas mb-1 transition-colors ${stats.appointments > 0 ? 'text-[#00E0FF] drop-shadow-[0_0_10px_rgba(0,224,255,0.8)]' : 'text-white/50'}`}>
                            {stats.appointments}
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wide font-mono">${stats.revenue.toLocaleString()} revenue</div>
                    </div>
                </div>

                {/* LIVE FEED */}
                <div ref={feedContainerRef} className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex-1 min-h-[140px] max-h-[220px] overflow-y-auto hide-scrollbar">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#00E0FF] font-bebas tracking-widest mb-3">
                        <span className="w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,224,255,1)]"></span>
                        LIVE ACTIVITY FEED
                    </div>
                    <div className="flex flex-col gap-2">
                        {feed.map((item) => (
                            <div key={item.id} className="flex gap-3 text-xs py-1.5 border-b border-white/5 last:border-0 animate-in fade-in slide-in-from-top-1 duration-300">
                                <span className="text-white/40 font-mono min-w-[50px] shrink-0 font-medium">{item.time}</span>
                                <span className={`${item.type === 'positive' ? 'text-[#00E0FF] font-bold tracking-wide' : item.type === 'sent' ? 'text-white font-medium' : 'text-white/50'}`}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEQUENCE VIZ */}
                <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
                    <div className="text-sm font-bold text-white/50 font-bebas tracking-widest mb-4">REACTIVATION SEQUENCE</div>
                    <div className="flex flex-col relative w-full">
                        {/* Connecting Line background */}
                        <div className="absolute left-[5.5px] top-6 bottom-6 w-[2px] bg-white/5 rounded"></div>
                        
                        {[
                            { step: 1, label: "SMS 1 — THE OPENER" },
                            { step: 2, label: "SMS 2 — VALUE ADD" },
                            { step: 3, label: "SMS 3 — THE NUDGE" },
                            { step: 4, label: "LEAD RESPONDS ✨" },
                        ].map((s) => {
                            let status = "pending";
                            if (activeSequenceStep > s.step) status = "done";
                            if (activeSequenceStep === s.step) status = "active";
                            
                            // Color mapping
                            const dotColor = status === 'done' ? 'bg-[#00E0FF] shadow-[0_0_10px_rgba(0,224,255,0.6)]' : status === 'active' ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]' : 'bg-white/20';
                            const textColor = status === 'done' ? 'text-[#00E0FF] font-bebas tracking-wider' : status === 'active' ? 'text-white font-bebas tracking-wider text-[15px]' : 'text-white/40 font-bebas tracking-wider';

                            return (
                                <div key={s.step} className="flex items-center gap-3 py-2.5 relative z-10">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${dotColor} shrink-0`}></div>
                                    <span className={`transition-colors duration-300 ${textColor}`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* RIGHT PANEL: PHONE MOCKUP */}
            <div className="w-full md:w-[460px] flex items-center justify-center bg-black shrink-0 h-[50vh] md:h-full relative overflow-hidden">
                
                {/* Visual Flair in the background behind phone */}
                <div className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00E0FF]/10 blur-[100px] rounded-full" />
                
                {/* Notifications overlay */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
                    {notifications.map(n => (
                        <div key={n.id} className="bg-zinc-950/95 backdrop-blur-md border border-[#00E0FF]/50 rounded-2xl p-4 pr-6 max-w-[320px] shadow-[0_10px_30px_rgba(0,224,255,0.15)] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[#00E0FF]">⚡</span>
                                <span className="font-bebas tracking-widest text-[#00E0FF] text-lg mt-0.5">{n.title}</span>
                            </div>
                            <div className="text-sm text-white/70 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: n.body }}></div>
                        </div>
                    ))}
                </div>

                {/* iPhone wrapper */}
                <div className="w-[320px] md:w-[340px] h-[640px] md:h-[700px] bg-white rounded-[46px] border-[4px] border-[#2a2a2a] flex flex-col overflow-hidden relative shadow-[0_0_0_2px_#1a1a1a,0_20px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(0,224,255,0.15)] scale-90 md:scale-100 transform origin-center">
                    
                    {/* Dynamic Island / Notch */}
                    <div className="w-[120px] h-[26px] bg-[#1a1a1a] rounded-b-3xl mx-auto absolute top-0 left-0 right-0 z-20"></div>

                    {/* App Header */}
                    <div className="bg-[#f6f6f6] pt-10 pb-3 px-4 flex items-center gap-2 border-b border-black/5 shrink-0 relative z-10">
                        <div className="text-[#007aff] text-3xl font-light leading-none -mt-1 cursor-default">‹</div>
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-9 h-9 bg-[#00e0ff] rounded-full flex items-center justify-center text-[13px] font-bold text-black shadow-sm tracking-wide">
                                {currentNiche.contactInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-black font-semibold text-[15px] truncate leading-tight">{currentNiche.contactName}</div>
                                <div className="text-[#888] text-[11px] truncate leading-none mt-0.5">{currentNiche.contactNumber}</div>
                            </div>
                        </div>
                        <div className="text-lg">📞</div>
                    </div>

                    {/* Messages Area */}
                    <div ref={messagesContainerRef} className="flex-1 bg-white p-3 md:p-4 overflow-y-auto flex flex-col gap-1.5 relative hide-scrollbar">
                        <div className="text-center text-[10px] font-medium text-[#999] my-1 mb-3">Today</div>
                        
                        {messages.map((m) => (
                            <div key={m.id} className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-[18px] text-[15px] leading-[1.35] shadow-sm
                                    ${m.type === 'outgoing' 
                                        ? 'bg-[#34c759] text-white self-end rounded-br-sm' 
                                        : 'bg-[#e5e5ea] text-black self-start rounded-bl-sm'}
                                `}>
                                    {m.text}
                                </div>
                                <div className={`text-[9px] text-black/30 mt-1 ${m.type === 'outgoing' ? 'self-end' : 'self-start'}`}>
                                    {m.time}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="mt-1">
                                <TypingIndicator />
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-2 w-full shrink-0" />
                    </div>

                    {/* Input Bar */}
                    <div className="bg-[#f6f6f6] px-3.5 py-2.5 flex items-center gap-2.5 border-t border-black/5 shrink-0">
                        <div className="text-2xl text-[#888] font-light mt-[-2px]">+</div>
                        <div className="flex-1 bg-white border border-black/10 rounded-full py-1.5 px-4 text-sm text-[#bbb] min-h-[34px] flex items-center">
                            iMessage
                        </div>
                        <div className="w-[30px] h-[30px] bg-[#34c759] rounded-full flex items-center justify-center text-white text-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Add these custom utilities to globals.css if they don't exist, or just rely on inline setup.
// We'll use hide-scrollbar class
