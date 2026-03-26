import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    redirect('/login')
  }

  // Pass session tokens and the user id securely through query params to the embedded iframe
  const { access_token, refresh_token, user } = session

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <iframe 
        src={`/crm/index.html?t=${access_token}&rt=${refresh_token}&u=${user.id}`} 
        className="w-full h-full border-none"
        title="CRM Pipeline"
      />
    </div>
  )
}
