import { createClient } from '@/lib/supabase/server'
import ProfileSelector from './ProfileSelector'

export default async function LoginPage() {
  const supabase = await createClient()

  // Fetch all profiles to display on the login page
  const { data: profiles, error } = await supabase.from('profiles').select('email, full_name, avatar_url, role')
  
  // If we don't have profiles yet (db just created), we can show some default layout or handle it inside ProfileSelector
  const displayProfiles = profiles || []

  return (
    <main className="min-h-screen flex items-center justify-center bg-black tracking-tight relative overflow-hidden text-neutral-200">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] bg-white opacity-[0.015] blur-3xl pointer-events-none rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            AUTOIKIGAI
          </h1>
          <p className="text-neutral-500 text-sm tracking-widest uppercase">Operating System</p>
        </div>

        <ProfileSelector profiles={displayProfiles} />
      </div>
    </main>
  )
}
