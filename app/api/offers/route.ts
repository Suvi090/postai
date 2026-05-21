import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const { bizLabel, name, location, extraDetails } = await req.json();

    const prompt = `You are a marketing expert for Indian local businesses.

Business: ${name} (${bizLabel}) in ${location}
Extra info: ${extraDetails || 'N/A'}

Give 6 proven short offer ideas for this ${bizLabel}. These should be real, actionable offers that drive customers in.
Return ONLY a valid JSON array of 6 strings, max 10 words each. No markdown, no explanation:
["offer 1", "offer 2", "offer 3", "offer 4", "offer 5", "offer 6"]`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array in response');

    const offers = JSON.parse(jsonMatch[0]);
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Offers error:', error);
    return NextResponse.json({ error: 'Failed to get offer suggestions' }, { status: 500 });
  }
}
