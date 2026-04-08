'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

// ── Types ──────────────────────────────────────────────────────────────
interface UserStats {
  id: string
  name: string
  email: string
  totalCalls: number
  leadsAssigned: number
  stageBreakdown: Record<string, number>
  nicheBreakdown: Record<string, number>
  activityByMonth: { month: string; calls: number }[]
  recentActivity: number
}

interface AnalyticsChartsProps {
  users: UserStats[]
  teamTotals: {
    totalCalls: number
    totalLeads: number
    totalClosedWon: number
    totalBadLeads: number
    avgCallsPerUser: number
  }
  stageFlow: { stage: string; count: number }[]
  nichePerformance: { niche: string; calls: number; closedWon: number }[]
  timelineData: { month: string; calls: number; closedWon: number }[]
}

// ── Colors ─────────────────────────────────────────────────────────────
const CYAN = '#00E0FF'
const PURPLE = '#A855F7'
const GREEN = '#34D399'
const RED = '#F87171'
const AMBER = '#FBBF24'
const BLUE = '#60A5FA'

const STAGE_COLORS: Record<string, string> = {
  contacted: CYAN,
  interested: PURPLE,
  follow_up: AMBER,
  closed_won: GREEN,
  bad_lead: RED,
}

const NICHE_COLORS = [CYAN, PURPLE, GREEN, AMBER, BLUE, RED]

// ── Custom Tooltip ─────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-widest">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────
export default function AnalyticsCharts({
  users,
  teamTotals,
  stageFlow,
  nichePerformance,
  timelineData,
}: AnalyticsChartsProps) {
  const [insights, setInsights] = useState<string | null>(null)
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  async function generateInsights() {
    setLoadingInsights(true)
    setInsights(null)
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: users }),
      })
      const data = await res.json()
      if (data.error) {
        setInsights(`Error: ${data.error}`)
      } else {
        setInsights(data.insights)
      }
    } catch (err) {
      setInsights('Failed to generate insights. Check your Perplexity API key.')
    } finally {
      setLoadingInsights(false)
    }
  }

  // Per-user data for the selected user's detail view
  const activeUser = selectedUser ? users.find(u => u.id === selectedUser) : null

  // Prepare user comparison bar chart data
  const userComparisonData = users.map(u => ({
    name: u.name?.split(' ')[0] || u.email.split('@')[0],
    calls: u.totalCalls,
    closedWon: u.stageBreakdown.closed_won || 0,
    badLeads: u.stageBreakdown.bad_lead || 0,
  }))

  // Prepare radar chart data for selected user
  const radarData = activeUser
    ? Object.entries(activeUser.nicheBreakdown).map(([niche, count]) => ({
        niche: niche.replace('leads_', '').replace('leads_uk_', '').replace(/_/g, ' '),
        count,
      }))
    : []

  return (
    <div className="space-y-8">
      {/* ── KPI Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="Total Calls" value={teamTotals.totalCalls} color={CYAN} />
        <KPICard label="Total Leads" value={teamTotals.totalLeads} color={BLUE} />
        <KPICard label="Closed Won" value={teamTotals.totalClosedWon} color={GREEN} />
        <KPICard label="Bad Leads" value={teamTotals.totalBadLeads} color={RED} />
        <KPICard
          label="Avg Calls/Agent"
          value={teamTotals.avgCallsPerUser}
          color={PURPLE}
        />
      </div>

      {/* ── Timeline: Calls & Closes Over Time ──────────────────── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
          Activity Over Time
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={timelineData}>
            <defs>
              <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CYAN} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="closedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GREEN} stopOpacity={0.3} />
                <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 11 }} />
            <YAxis stroke="#71717a" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone" dataKey="calls" name="Calls"
              stroke={CYAN} fill="url(#callsGrad)" strokeWidth={2}
            />
            <Area
              type="monotone" dataKey="closedWon" name="Closed Won"
              stroke={GREEN} fill="url(#closedGrad)" strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Agent Comparison + Stage Funnel ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Comparison */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
            Agent Performance
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={userComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#71717a" tick={{ fontSize: 11 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="calls" name="Calls" fill={CYAN} radius={[4, 4, 0, 0]} />
              <Bar dataKey="closedWon" name="Closed Won" fill={GREEN} radius={[4, 4, 0, 0]} />
              <Bar dataKey="badLeads" name="Bad Leads" fill={RED} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Funnel */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
            Pipeline Funnel (All Transitions)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stageFlow}
                dataKey="count"
                nameKey="stage"
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={100}
                paddingAngle={3}
                label={({ name, value }: any) => `${name} (${value})`}
                labelLine={{ stroke: '#71717a' }}
              >
                {stageFlow.map((entry, i) => (
                  <Cell
                    key={entry.stage}
                    fill={STAGE_COLORS[entry.stage] || NICHE_COLORS[i % NICHE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Niche Performance ───────────────────────────────────── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
          Performance by Niche
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={nichePerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis type="number" stroke="#71717a" tick={{ fontSize: 11 }} />
            <YAxis dataKey="niche" type="category" stroke="#71717a" tick={{ fontSize: 11 }} width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="calls" name="Total Calls" fill={CYAN} radius={[0, 4, 4, 0]} />
            <Bar dataKey="closedWon" name="Closed Won" fill={GREEN} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Per-User Deep Dive ──────────────────────────────────── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
          Agent Deep Dive
        </h3>

        {/* User selector tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => setSelectedUser(selectedUser === u.id ? null : u.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedUser === u.id
                  ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/40'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {u.name || u.email.split('@')[0]}
            </button>
          ))}
        </div>

        {activeUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stats summary */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <MiniStat label="Total Calls" value={activeUser.totalCalls} />
                <MiniStat label="Leads Assigned" value={activeUser.leadsAssigned} />
                <MiniStat
                  label="Close Rate"
                  value={`${activeUser.totalCalls > 0 ? ((activeUser.stageBreakdown.closed_won || 0) / activeUser.totalCalls * 100).toFixed(1) : 0}%`}
                />
                <MiniStat label="Last 7 Days" value={activeUser.recentActivity} />
              </div>

              {/* Stage breakdown list */}
              <div className="space-y-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Stage Breakdown</p>
                {Object.entries(activeUser.stageBreakdown).map(([stage, count]) => (
                  <div key={stage} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: STAGE_COLORS[stage] || BLUE }}
                      />
                      <span className="text-sm text-zinc-300 capitalize">{stage.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-200">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Niche radar */}
            {radarData.length > 0 && (
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Niche Coverage</p>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis dataKey="niche" stroke="#71717a" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis stroke="#71717a" tick={{ fontSize: 10 }} />
                    <Radar
                      dataKey="count" name="Activity"
                      stroke={CYAN} fill={CYAN} fillOpacity={0.2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">Select an agent above to view their detailed breakdown.</p>
        )}
      </div>

      {/* ── Perplexity AI Insights ──────────────────────────────── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase">
              AI Performance Insights
            </h3>
            <p className="text-xs text-zinc-600 mt-1">Powered by Perplexity Sonar</p>
          </div>
          <button
            onClick={generateInsights}
            disabled={loadingInsights}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              loadingInsights
                ? 'bg-zinc-800 text-zinc-500 cursor-wait'
                : 'bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/30 hover:bg-[#00E0FF]/20'
            }`}
          >
            {loadingInsights ? 'Analyzing...' : 'Generate Insights'}
          </button>
        </div>

        {loadingInsights && (
          <div className="flex items-center gap-3 py-8">
            <div className="w-5 h-5 border-2 border-[#00E0FF] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-zinc-400">Perplexity is analyzing your team performance data...</span>
          </div>
        )}

        {insights && !loadingInsights && (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed">
              {insights}
            </div>
          </div>
        )}

        {!insights && !loadingInsights && (
          <p className="text-zinc-600 text-sm py-4">
            Click &quot;Generate Insights&quot; to get AI-powered analysis of your team&apos;s performance with specific recommendations.
          </p>
        )}
      </div>

      {/* ── User Activity Table ─────────────────────────────────── */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase">
            Lifetime Activity Log
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Agent</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Calls</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Assigned</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Closed Won</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Bad Leads</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Close Rate</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-zinc-400 uppercase">Last 7d</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {users.map(u => {
                const closeRate = u.totalCalls > 0
                  ? ((u.stageBreakdown.closed_won || 0) / u.totalCalls * 100).toFixed(1)
                  : '0.0'
                return (
                  <tr key={u.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-zinc-200">{u.name || 'Unknown'}</div>
                      <div className="text-xs text-zinc-500">{u.email}</div>
                    </td>
                    <td className="p-4 text-sm font-bold text-[#00E0FF]">{u.totalCalls}</td>
                    <td className="p-4 text-sm text-zinc-300">{u.leadsAssigned}</td>
                    <td className="p-4 text-sm font-bold text-emerald-400">{u.stageBreakdown.closed_won || 0}</td>
                    <td className="p-4 text-sm text-red-400">{u.stageBreakdown.bad_lead || 0}</td>
                    <td className="p-4 text-sm">
                      <span className={`font-bold ${parseFloat(closeRate) >= 20 ? 'text-emerald-400' : parseFloat(closeRate) >= 10 ? 'text-amber-400' : 'text-red-400'}`}>
                        {closeRate}%
                      </span>
                    </td>
                    <td className="p-4 text-sm text-zinc-300">{u.recentActivity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ───────────────────────────────────────────────────
function KPICard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
      <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">{label}</p>
      <p className="text-3xl font-bebas tracking-wider" style={{ color }}>{value}</p>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">{label}</p>
      <p className="text-xl font-bold text-zinc-200 mt-1">{value}</p>
    </div>
  )
}
