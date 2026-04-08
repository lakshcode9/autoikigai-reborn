import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify master role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'master') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userData } = await req.json()

    if (!userData || !Array.isArray(userData)) {
      return NextResponse.json({ error: 'Missing userData array' }, { status: 400 })
    }

    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json({ error: 'Perplexity API key not configured' }, { status: 500 })
    }

    // Build a summary of all user performance data for Perplexity to analyze
    const performanceSummary = userData.map((u: any) => {
      const conversionRate = u.totalCalls > 0
        ? ((u.stageBreakdown.closed_won || 0) / u.totalCalls * 100).toFixed(1)
        : '0'

      return `
Agent: ${u.name} (${u.email})
- Total Calls (leads moved from New): ${u.totalCalls}
- Leads Assigned: ${u.leadsAssigned}
- Stage Breakdown: ${Object.entries(u.stageBreakdown).map(([k, v]) => `${k}: ${v}`).join(', ')}
- Niche Activity: ${Object.entries(u.nicheBreakdown).map(([k, v]) => `${k}: ${v}`).join(', ')}
- Close Rate: ${conversionRate}%
- Most Active Period: ${u.activityByMonth?.length > 0 ? u.activityByMonth[u.activityByMonth.length - 1]?.month : 'N/A'}
- Recent Activity (last 7 days): ${u.recentActivity} actions`
    }).join('\n\n')

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: `You are a B2B sales performance analyst for Autoikigai, a company that helps local service businesses reactivate dormant customers using AI.

Your job: Analyze each agent's CRM pipeline data and give SPECIFIC, ACTIONABLE insights on what they should improve.

Context on the business:
- Agents work leads across 5 niches: Arborist, Fire & Security, Commercial Paving, Commercial Janitorial, Sleep Apnea
- Pipeline stages: New -> Contacted -> Interested -> Follow Up -> Closed Won / Bad Lead
- A "call" = moving a lead from "New" to any other stage (first contact attempt)
- Goal is to maximize Closed Won while maintaining high activity volume

ANALYSIS FORMAT (for each agent):
**[Agent Name]**
- **Strengths**: What they're doing well (be specific, reference their numbers)
- **Red Flags**: Concerning patterns (low conversion, neglecting follow-ups, niche imbalance, etc.)
- **Top 3 Actions**: Numbered list of the most impactful things they should do THIS WEEK

After individual analysis, provide:
**TEAM-WIDE INSIGHTS**
- Overall pipeline health assessment
- Bottleneck identification (which stage loses the most leads?)
- Recommended focus areas for the team lead

Keep it sharp and tactical. No fluff. Reference actual numbers from the data.`
          },
          {
            role: 'user',
            content: `Analyze this team's CRM performance data and give actionable insights:\n\n${performanceSummary}`
          }
        ],
        temperature: 0.2,
        return_images: false,
        return_related_questions: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[Perplexity Insights Error]', errorData)
      return NextResponse.json({ error: 'Perplexity API error', details: errorData }, { status: response.status })
    }

    const data = await response.json()
    const insightText = data.choices?.[0]?.message?.content || 'No insights generated.'

    return NextResponse.json({ insights: insightText })
  } catch (err) {
    console.error('[Insights API Error]:', err)
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 })
  }
}
