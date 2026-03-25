import { createClient } from '@/lib/supabase/server'
import { updateLeadStage } from './actions'

// Using one table as an example: leads_paving
async function getLeads(supabase: any) {
  const { data: leads } = await supabase
    .from('leads_paving')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  return leads || []
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const leads = await getLeads(supabase)

  return (
    <div className="p-10 font-sans tracking-tight">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bebas tracking-widest uppercase mb-2">Paving Leads Pipeline</h1>
          <p className="text-sm text-neutral-500 uppercase tracking-widest font-semibold">Active Prospects</p>
        </div>
      </header>

      <div className="w-full bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/50">
              <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Company</th>
              <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Contact</th>
              <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Location</th>
              <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">Stage</th>
              <th className="p-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {leads.map((lead: any) => (
              <tr key={lead.id} className="hover:bg-neutral-900/30 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-neutral-200">{lead.company_name}</div>
                  <div className="text-xs text-neutral-500">{lead.website_url}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-neutral-300">{lead.owner_gm_name || 'Unknown'}</div>
                  <div className="text-xs text-neutral-500">{lead.phone_number}</div>
                </td>
                <td className="p-4 text-sm text-neutral-400">{lead.city_state}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider
                    ${lead.stage === 'new' ? 'bg-blue-500/10 text-blue-400' : 
                      lead.stage === 'contacted' ? 'bg-amber-500/10 text-amber-400' :
                      lead.stage === 'interested' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-neutral-800 text-neutral-400'}`}>
                    {lead.stage}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <form action={updateLeadStage} className="inline-flex gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="table" value="leads_paving" />
                    <input type="hidden" name="old_stage" value={lead.stage} />
                    
                    <select 
                      name="new_stage" 
                      defaultValue={lead.stage}
                      className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-600 uppercase tracking-wider"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button type="submit" className="px-3 py-1 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded hover:bg-neutral-200 transition-colors">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
