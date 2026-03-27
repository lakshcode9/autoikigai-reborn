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
          { role: 'system', content: 'You are Aiki, the Autoikigai mascot. You are a Japanese-inspired Cyber-Daruma real-time research assistant. Your goal is to provide concise, tactical research on a company to help a sales rep sound extremely prepared. Always provide: 1. A summary of what they do. 2. A recent company update or unique characteristic. 3. A highly personalized, one-sentence "Power Opener" for a cold call. Keep formatting clean using markdown.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
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
