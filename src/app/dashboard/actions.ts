'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateLeadStage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const leadId = formData.get('id') as string
  const tableName = formData.get('table') as string
  const oldStage = formData.get('old_stage') as string
  const newStage = formData.get('new_stage') as string

  if (oldStage === newStage) return // no changes

  // Update lead stage
  const { error: updateError } = await supabase
    .from(tableName as any)
    .update({ stage: newStage, last_contacted: new Date().toISOString() })
    .eq('id', leadId)

  if (updateError) {
    console.error("Error updating lead stage:", updateError)
    throw new Error("Failed to update lead")
  }

  // Log the action to audit_logs
  const { error: logError } = await supabase
    .from('audit_logs')
    .insert({
      user_id: user.id,
      action_type: 'update_stage',
      table_name: tableName,
      record_id: leadId,
      old_value: oldStage,
      new_value: newStage
    })

  if (logError) {
    console.error("Failed to write to audit log:", logError)
    // We don't necessarily want to ruin the user experience if logging fails, but it's noted.
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/audit')
}
