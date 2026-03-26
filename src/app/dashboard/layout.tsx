import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col justify-between bg-zinc-950 p-6">
        <div>
          <h2 className="text-2xl font-bebas tracking-widest text-[#00E0FF] mb-12">AUTOIKIGAI<br/><span className="text-white">CRM</span></h2>
          <nav className="flex flex-col gap-4 tracking-widest font-bebas">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">LEADS PIPELINE</Link>
            {profile?.role === 'master' && (
              <Link href="/dashboard/audit" className="text-white/70 hover:text-[#00E0FF] transition-colors">ACTIVITY LOG (MASTER)</Link>
            )}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bebas tracking-widest text-sm text-white/90">{profile?.full_name || profile?.email}</span>
            <span className="font-bebas tracking-widest text-xs text-[#00E0FF] uppercase">{profile?.role}</span>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-white/50 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0,transparent_100%)]">
        {children}
      </main>
    </div>
  )
}
