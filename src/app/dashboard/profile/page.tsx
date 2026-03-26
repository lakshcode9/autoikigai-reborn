import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="w-full h-full bg-black p-12 text-white overflow-y-auto">
      <h1 className="text-4xl font-bebas tracking-wide mb-2 uppercase">My Profile</h1>
      <p className="text-zinc-400 mb-10 text-sm">Manage your operator details.</p>

      <div className="max-w-xl bg-zinc-900/50 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#00E0FF]/10 text-[#00E0FF] border border-[#00E0FF]/20 flex items-center justify-center font-bold text-4xl uppercase">
            {profile?.full_name ? profile.full_name[0] : profile?.email[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile?.full_name || 'Agile Operator'}</h2>
            <p className="text-zinc-400">{profile?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-1">Access Level</label>
            <div className="bg-black/50 border border-white/5 py-2 px-4 rounded text-zinc-300 capitalize font-medium">
              {profile?.role === 'master' ? '👑 Super Admin' : 'Agent'}
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold block mb-1">Account ID</label>
            <div className="bg-black/50 border border-white/5 py-2 px-4 rounded text-zinc-600 font-mono text-sm break-all">
              {profile?.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
