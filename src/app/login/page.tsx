'use client';

import { login } from './actions'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'

export default function LoginPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  useEffect(() => {
    props.searchParams.then(params => {
      if (params.error) setErrorMsg(decodeURIComponent(params.error))
      if (params.message) setSuccessMsg(decodeURIComponent(params.message))
    })
  }, [props.searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formDataObj = new FormData(e.currentTarget)
      await login(formDataObj)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-0">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-radium"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse_at_bottom_right,rgba(168, 85, 247, 0.1),transparent 60%)'
          }}
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Login Container */}
      <motion.div 
        className="relative z-10 w-full max-w-sm md:max-w-md"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Card */}
        <div className="card-elevated p-6 sm:p-8 md:p-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-2 text-radium">
              Access
            </h1>
            <p className="text-xs sm:text-sm text-muted uppercase tracking-wider font-mono-tight">
              AutoIkigai Operations
            </p>
          </motion.div>

          {/* Messages */}
          {(errorMsg || successMsg) && (
            <motion.div 
              className={`p-3 rounded-lg text-sm mb-6 text-center font-mono-tight ${
                errorMsg ? 'bg-red-500/20 border border-red-500/50 text-red-200' : 'bg-green-500/20 border border-green-500/50 text-green-200'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {errorMsg || successMsg}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Email Address"
              type="email"
              name="email"
              placeholder="operator@autoikigai.systems"
              value={formData.email}
              onChange={handleChange}
              required
              variant="default"
              icon="✉"
            />

            <FormField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              variant="default"
              icon="🔐"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
                size="lg"
                variant="primary"
                className="mt-4 font-mono-tight"
              >
                AUTHORIZE
              </Button>
            </motion.div>
          </form>

          {/* Signup Link */}
          <motion.p
            className="mt-8 text-center text-xs sm:text-sm text-muted font-mono-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            New here?{' '}
            <Link 
              href="/signup" 
              className="text-radium hover:text-accent-pink transition-colors underline-accent"
            >
              Create an account
            </Link>
          </motion.p>
        </div>

        {/* Footer Info - Mobile Optimized */}
        <motion.div
          className="mt-6 text-center text-xs text-muted-light font-mono-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Part of the AutoIkigai Intelligence Platform</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
