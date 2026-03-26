import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function TeamPage() {
  const supabase = await createClient()

  // Require auth
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) redirect('/login')

  // We fetch everyone (could restrict to master, but normally team can see who is on the team)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="w-full h-full overflow-y-auto bg-black p-12 text-white">
      <h1 className="text-4xl font-bebas tracking-wide mb-2 uppercase">Team Directory</h1>
      <p className="text-zinc-400 mb-10 text-sm">View all registered agents and their access levels.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles?.map(p => (
          <div key={p.id} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl flex items-center gap-5 hover:bg-zinc-900 transition-colors">
             <div className="w-14 h-14 rounded-full bg-[#00E0FF]/10 border border-[#00E0FF]/20 text-[#00E0FF] flex items-center justify-center font-bold text-2xl uppercase">
               {p.full_name ? p.full_name[0] : p.email[0]}
             </div>
             <div>
               <h3 className="font-bold text-lg">{p.full_name || 'Agile Operator'}</h3>
               <p className="text-xs text-zinc-400 mt-0.5">{p.email}</p>
               <span className={`inline-block mt-3 px-2 py-0.5 text-[10px] uppercase tracking-widest rounded font-bold ${p.role === 'master' ? 'bg-indigo-500/20 text-indigo-400 outline outline-1 outline-indigo-500/30' : 'bg-zinc-800 text-zinc-300'}`}>
                 {p.role}
               </span>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
