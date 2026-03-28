import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json({ error: 'Perplexity API key not configured' }, { status: 500 });
    }

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
            content: `You are Aiki, the Autoikigai Neural Overseer. You are a Japanese-inspired Cyber-Daruma tactical researcher. 
            Your mission: Provide "Genius-level" sales forensics on a company to help a rep close the deal.
            
            STRICT GUIDELINES:
            1. TECH STACK: Look for clues of their current software (CRM, ERP, CMS) to find automated gaps.
            2. GROWTH SIGNALS: Search for recent hires, office expansions, or funding news within the last 6 months.
            3. PAIN POINTS: Based on their niche and current online presence, deduce one specific operational friction point they likely experience.
            4. POWER OPENER: Generate one sharp, ultra-personalized "Power Opener" for a cold call that references a specific detail found in your research. It must sound "insider," not generic.
            
            TONE: Professional, tactical, and slightly "Cyber-Vibe."
            FORMATTING: Use bold headers and clean bullet points. Keep it under 150 words total.` 
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: [],
        search_recency_filter: 'month',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Perplexity API Error]', errorData);
      return NextResponse.json({ error: 'Perplexity API error', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[Aiki API Internal Error]:', err);
    return NextResponse.json({ error: 'Failed to fetch Aiki insight' }, { status: 500 });
  }
}
