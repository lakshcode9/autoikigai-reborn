import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getAuditLogs(supabase: any) {
  // Join audit logs with profiles to get the user's name
  const { data: logs, error } = await supabase
    .from('audit_logs')
    .select(`
      id,
      action_type,
      table_name,
      record_id,
      old_value,
      new_value,
      created_at,
      profiles ( full_name, email )
    `)
    .order('created_at', { ascending: false })
    .limit(100)
    
  if (error) {
    console.error("Error fetching logs:", error)
  }
  return logs || []
}

export default async function AuditDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Only master role can see this page
  if (profile?.role !== 'master') {
    redirect('/dashboard')
  }

  const logs = await getAuditLogs(supabase)

  return (
    <div className="p-10 font-sans tracking-tight">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bebas tracking-widest uppercase mb-2 text-[#00E0FF]">Master Audit Log</h1>
          <p className="text-sm text-neutral-500 uppercase tracking-widest font-semibold">Live System Activity</p>
        </div>
      </header>

      <div className="w-full bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 uppercase tracking-widest text-sm font-semibold">
            No activity recorded yet
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/50">
                <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Timestamp</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Agent</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Action</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Table</th>
                <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 flex-1">
              {logs.map((log: any) => (
                <tr key={log.id} className="hover:bg-neutral-900/30 transition-colors">
                  <td className="p-4 text-xs text-neutral-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-neutral-200">{log.profiles?.full_name || 'System'}</div>
                    <div className="text-xs text-neutral-500">{log.profiles?.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-800 text-neutral-300 text-xs font-mono uppercase">
                      {log.action_type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-400">
                    {log.table_name}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-red-400">{log.old_value || 'NULL'}</span>
                      <span className="text-neutral-500">→</span>
                      <span className="text-emerald-400">{log.new_value || 'NULL'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
