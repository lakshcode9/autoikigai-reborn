import { signup } from './actions'
import Link from 'next/link'

export default async function SignupPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;
  const message = searchParams?.message;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,224,255,0.1),transparent_40%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-zinc-950/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bebas tracking-widest text-center mb-2">INITIALIZE</h1>
        <p className="text-white/50 text-center mb-6 font-sans text-sm">Create your operator ID</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center font-sans tracking-wide">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-[#00E0FF]/10 border border-[#00E0FF]/50 text-[#00E0FF] text-sm p-3 rounded mb-6 text-center font-sans tracking-wide">
            {message}
          </div>
        )}

        <form className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="first_name" className="text-sm font-bebas tracking-widest text-[#00E0FF]">First Name</label>
            <input 
              id="first_name" 
              name="first_name" 
              type="text" 
              required 
              className="bg-black border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E0FF] transition-colors font-sans"
              placeholder="Laksh"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bebas tracking-widest text-[#00E0FF]">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="bg-black border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E0FF] transition-colors font-sans"
              placeholder="operator@autoikigai.systems"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bebas tracking-widest text-[#00E0FF]">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-black border border-white/20 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00E0FF] transition-colors font-sans"
              placeholder="••••••••"
            />
          </div>

          <button 
            formAction={signup} 
            className="w-full mt-4 bg-transparent border-2 border-[#00E0FF] hover:bg-[#00E0FF] text-[#00E0FF] hover:text-black font-bebas font-bold text-xl tracking-widest py-4 rounded transition-all shadow-[0_0_20px_rgba(0,224,255,0.1)] hover:shadow-[0_0_30px_rgba(0,224,255,0.4)]"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white/50 font-sans">
          Already have an account? <Link href="/login" className="text-[#00E0FF] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
