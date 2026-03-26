import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    redirect('/login')
  }

  // Check role for conditional UI
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  const isMaster = profile?.role === 'master'

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-zinc-950 flex flex-col justify-between">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <h1 className="text-xl font-bebas tracking-widest text-[#00E0FF]">AUTOIKIGAI <span className="text-white">CRM</span></h1>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-zinc-300 hover:text-white">
              Pipeline
            </Link>
            <Link href="/dashboard/team" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-zinc-300 hover:text-white">
              Team
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-zinc-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              {session.user.email?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate">{session.user.email}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">{isMaster ? 'Super Admin' : 'Agent'}</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  )
}
