'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first_name') as string

  // Domain Restrictions
  if (!email || !email.toLowerCase().endsWith('@autoikigai.space')) {
    redirect('/signup?error=' + encodeURIComponent('Only @autoikigai.space emails are authorized to register.'))
  }

  // Determine the base URL for the redirect
  // Use Vercel URL if present, otherwise local dev
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: firstName
      },
      emailRedirectTo: `${siteUrl}/login`
    }
  })

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }
  
  // Instruct user to check email for verification. 
  redirect('/signup?message=Verification email sent. Please check your inbox to verify your account before logging in.')
}
