import { createClient } from './supabase/server'

type LeadNicheTable = 
  | 'leads_paving'
  | 'leads_fire_security'
  | 'leads_janitorial'
  | 'leads_sleep_apnea'
  | 'leads_arborist';

/**
 * Updates a lead's stage and tags it with the currently authenticated user's ID.
 * This ensures every contact moved through a stage is marked as the operator's lead.
 */
export async function updateLeadStageAndTagUser(
  table: LeadNicheTable,
  leadId: string,
  newStage: string
) {
  const supabase = await createClient()

  // 1. Get current authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthorized. You must be logged in to move leads.')
  }

  // 2. Update the lead with the new stage AND the assigned_user_id
  const { data, error: updateError } = await supabase
    .from(table)
    .update({ 
      stage: newStage,
      assigned_user_id: user.id 
    })
    .eq('id', leadId)
    .select()

  if (updateError) {
    throw new Error(`Failed to update lead: ${updateError.message}`)
  }

  return data
}
