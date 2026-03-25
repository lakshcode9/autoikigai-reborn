'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { login } from './actions'
import { User } from 'lucide-react'

type Profile = {
  email: string
  full_name: string | null
  avatar_url: string | null
  role: string
}

export default function ProfileSelector({ profiles }: { profiles: Profile[] }) {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  
  // Always include master explicitly if no profiles fetched (for local dev fallback)
  const masterFallback: Profile = {
    email: 'laksh@autoikigai.systems',
    full_name: 'Laksh',
    avatar_url: null,
    role: 'master'
  }

  const defaultUsers: Profile[] = [masterFallback, {
    email: 'caller1@autoikigai.systems',
    full_name: 'Alpha Dialer',
    avatar_url: null,
    role: 'user'
  }, {
    email: 'caller2@autoikigai.systems',
    full_name: 'Beta Dialer',
    avatar_url: null,
    role: 'user'
  }]

  const renderProfiles = profiles.length > 0 ? profiles : defaultUsers

  const handleLogin = async (formData: FormData) => {
    // Inject the selected email
    if (selectedUser) {
      formData.append('email', selectedUser.email)
    }
    await login(formData)
  }

  return (
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {!selectedUser ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {renderProfiles.map((p) => (
              <motion.button
                key={p.email}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedUser(p)}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden transition-colors group-hover:border-neutral-500 shadow-xl">
                  {p.avatar_url ? (
                    <img src={p.avatar_url} alt={p.full_name || p.email} className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} className="text-neutral-500 group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-lg text-white group-hover:text-neutral-200 transition-colors">
                    {p.full_name || p.email.split('@')[0]}
                  </h3>
                  <p className="text-xs text-neutral-600 uppercase tracking-widest mt-1">
                    {p.role}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center w-full max-w-sm mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center overflow-hidden mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              {selectedUser.avatar_url ? (
                <img src={selectedUser.avatar_url} alt={selectedUser.full_name || selectedUser.email} className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-white" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">
              {selectedUser.full_name || selectedUser.email.split('@')[0]}
            </h2>
            <p className="text-sm text-neutral-500 mb-8">{selectedUser.email}</p>

            <form action={handleLogin} className="w-full flex flex-col gap-4">
              <input
                type="password"
                name="password"
                placeholder="Enter workspace password"
                required
                autoFocus
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-all text-center tracking-widest"
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-3 px-4 rounded-lg bg-transparent border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors uppercase tracking-widest text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-white text-black hover:bg-neutral-200 transition-colors uppercase tracking-widest text-xs font-semibold"
                >
                  Enter
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
