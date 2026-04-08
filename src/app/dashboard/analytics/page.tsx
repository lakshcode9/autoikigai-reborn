import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AnalyticsCharts from './AnalyticsCharts'

const LEAD_TABLES = [
  'leads_paving', 'leads_fire_security', 'leads_janitorial',
  'leads_sleep_apnea', 'leads_arborist',
  'leads_uk_paving', 'leads_uk_fire_security', 'leads_uk_janitorial',
  'leads_uk_sleep_apnea', 'leads_uk_arborist',
] as const

function nicheLabel(table: string): string {
  return table
    .replace('leads_uk_', '')
    .replace('leads_', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Verify master role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'master') {
    redirect('/dashboard')
  }

  // ── Fetch all data in parallel ──────────────────────────────────────

  // 1. All audit logs (every stage transition ever)
  const { data: allLogs } = await supabase
    .from('audit_logs')
    .select(`
      id,
      user_id,
      action_type,
      table_name,
      record_id,
      old_value,
      new_value,
      created_at
    `)
    .eq('action_type', 'update_stage')
    .order('created_at', { ascending: true })

  // 2. All profiles
  const { data: allProfiles } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')

  // 3. Count assigned leads per user across all tables
  const leadCountPromises = LEAD_TABLES.map(async (table) => {
    const { data } = await supabase
      .from(table)
      .select('assigned_user_id', { count: 'exact', head: false })
      .not('assigned_user_id', 'is', null)
    return { table, data: data || [] }
  })

  const leadCountResults = await Promise.all(leadCountPromises)

  // ── Process data ────────────────────────────────────────────────────

  const logs = allLogs || []
  const profiles = allProfiles || []
  const profileMap = new Map(profiles.map(p => [p.id, p]))

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  // Build per-user stats
  const userStatsMap = new Map<string, {
    id: string
    name: string
    email: string
    totalCalls: number
    leadsAssigned: number
    stageBreakdown: Record<string, number>
    nicheBreakdown: Record<string, number>
    activityByMonth: Map<string, number>
    recentActivity: number
  }>()

  // Initialize all profiles
  for (const p of profiles) {
    userStatsMap.set(p.id, {
      id: p.id,
      name: p.full_name || 'Unknown',
      email: p.email || '',
      totalCalls: 0,
      leadsAssigned: 0,
      stageBreakdown: {},
      nicheBreakdown: {},
      activityByMonth: new Map(),
      recentActivity: 0,
    })
  }

  // Global aggregations
  let totalCallsGlobal = 0
  let totalClosedWon = 0
  let totalBadLeads = 0
  const stageCountsGlobal: Record<string, number> = {}
  const nicheCountsGlobal: Record<string, { calls: number; closedWon: number }> = {}
  const timelineMap = new Map<string, { calls: number; closedWon: number }>()

  // Process each audit log entry
  for (const log of logs) {
    const userId = log.user_id
    const userStats = userStatsMap.get(userId)

    // A "call" = moving a lead FROM "new" to any other stage
    const isCall = log.old_value === 'new' && log.new_value !== 'new'
    const newStage = log.new_value?.toLowerCase() || ''
    const tableName = log.table_name || ''
    const logDate = new Date(log.created_at)
    const monthKey = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`

    if (isCall) {
      totalCallsGlobal++

      if (userStats) {
        userStats.totalCalls++

        // Stage breakdown
        userStats.stageBreakdown[newStage] = (userStats.stageBreakdown[newStage] || 0) + 1

        // Niche breakdown
        userStats.nicheBreakdown[tableName] = (userStats.nicheBreakdown[tableName] || 0) + 1

        // Monthly activity
        userStats.activityByMonth.set(monthKey, (userStats.activityByMonth.get(monthKey) || 0) + 1)

        // Recent activity
        if (logDate >= sevenDaysAgo) {
          userStats.recentActivity++
        }
      }

      // Global stage counts
      stageCountsGlobal[newStage] = (stageCountsGlobal[newStage] || 0) + 1

      // Global niche counts
      const nicheKey = nicheLabel(tableName)
      if (!nicheCountsGlobal[nicheKey]) {
        nicheCountsGlobal[nicheKey] = { calls: 0, closedWon: 0 }
      }
      nicheCountsGlobal[nicheKey].calls++
      if (newStage === 'closed_won') {
        nicheCountsGlobal[nicheKey].closedWon++
      }

      // Global closed won / bad leads
      if (newStage === 'closed_won') totalClosedWon++
      if (newStage === 'bad_lead') totalBadLeads++

      // Timeline
      if (!timelineMap.has(monthKey)) {
        timelineMap.set(monthKey, { calls: 0, closedWon: 0 })
      }
      const tm = timelineMap.get(monthKey)!
      tm.calls++
      if (newStage === 'closed_won') tm.closedWon++
    }
  }

  // Count assigned leads per user from all tables
  for (const { data } of leadCountResults) {
    for (const row of data) {
      const uid = (row as any).assigned_user_id
      const stats = userStatsMap.get(uid)
      if (stats) {
        stats.leadsAssigned++
      }
    }
  }

  // ── Format output for client component ──────────────────────────────

  const users = Array.from(userStatsMap.values())
    .filter(u => u.totalCalls > 0 || u.leadsAssigned > 0)
    .map(u => ({
      ...u,
      activityByMonth: Array.from(u.activityByMonth.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, calls]) => ({ month, calls })),
    }))
    .sort((a, b) => b.totalCalls - a.totalCalls)

  const teamTotals = {
    totalCalls: totalCallsGlobal,
    totalLeads: leadCountResults.reduce((sum, r) => sum + r.data.length, 0),
    totalClosedWon,
    totalBadLeads,
    avgCallsPerUser: users.length > 0 ? Math.round(totalCallsGlobal / users.length) : 0,
  }

  const stageFlow = Object.entries(stageCountsGlobal)
    .map(([stage, count]) => ({ stage: stage.replace(/_/g, ' '), count }))
    .sort((a, b) => b.count - a.count)

  const nichePerformance = Object.entries(nicheCountsGlobal)
    .map(([niche, data]) => ({ niche, ...data }))
    .sort((a, b) => b.calls - a.calls)

  const timelineData = Array.from(timelineMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }))

  // If no data exists yet, show an empty state
  const hasData = logs.length > 0

  return (
    <div className="p-10 font-sans tracking-tight overflow-y-auto h-full">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bebas tracking-widest uppercase mb-2 text-[#00E0FF]">
            Super Admin Analytics
          </h1>
          <p className="text-sm text-neutral-500 uppercase tracking-widest font-semibold">
            Team Performance Dashboard
          </p>
        </div>
        <div className="text-xs text-zinc-600">
          Data from {logs.length} audit log entries
        </div>
      </header>

      {hasData ? (
        <AnalyticsCharts
          users={users}
          teamTotals={teamTotals}
          stageFlow={stageFlow}
          nichePerformance={nichePerformance}
          timelineData={timelineData}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
            <span className="text-3xl text-zinc-600">0</span>
          </div>
          <h2 className="text-xl font-semibold text-zinc-300 mb-2">No Activity Yet</h2>
          <p className="text-sm text-zinc-500 max-w-md">
            Analytics will appear once agents start moving leads through the pipeline.
            A &quot;call&quot; is recorded whenever a lead is moved from the &quot;New&quot; stage to any other stage.
          </p>
        </div>
      )}
    </div>
  )
}
