'use client';

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface DashboardClientProps {
  isMaster: boolean
  email?: string
  children: ReactNode
}

export default function DashboardClient({
  isMaster,
  email,
  children,
}: DashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', label: 'Pipeline', icon: '📊' },
    { href: '/dashboard/team', label: 'Team', icon: '👥' },
    ...(isMaster ? [{ href: '/dashboard/analytics', label: 'Analytics', icon: '📈' }] : []),
  ]

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop Fixed, Mobile Slide-out */}
      <motion.aside
        className={`fixed md:relative md:flex-shrink-0 z-40 flex flex-col justify-between border-r border-depth-3 bg-depth-1 transition-all w-64 h-screen`}
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-depth-3">
            <h1 className="text-lg md:text-xl font-playfair font-bold text-radium">
              AutoIkigai
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-light hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-3 md:p-4 space-y-1">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ scale: 1.02 }}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 md:py-3 rounded-sm hover:bg-depth-2 transition-all text-sm text-muted-light hover:text-radium font-mono-tight uppercase tracking-wider"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* User Profile Footer */}
        <motion.div
          className="p-3 md:p-4 border-t border-depth-3"
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-depth-2 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-radium/20 text-radium flex items-center justify-center font-bold text-xs flex-shrink-0">
              {email?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden min-w-0">
              <span className="truncate text-xs font-mono-tight text-white">{email}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted">
                {isMaster ? 'Master' : 'Agent'}
              </span>
            </div>
          </Link>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden h-12 flex items-center px-4 border-b border-depth-3 bg-depth-1">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-radium hover:text-white transition-colors"
          >
            ☰
          </button>
          <h2 className="ml-4 text-sm font-mono-tight uppercase tracking-wider text-muted-light">
            Dashboard
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
