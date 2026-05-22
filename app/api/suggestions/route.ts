import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const { offer, bizLabel, name, location, extraDetails, language } = await req.json();

    if (!offer?.trim()) {
      return NextResponse.json({ error: 'Offer is required' }, { status: 400 });
    }

    const lang = language || 'english';

    const prompt = `You are an expert marketing copywriter for Indian local businesses.

Business: ${name} (${bizLabel})${location ? ` in ${location}` : ''}
Extra info: ${extraDetails || 'N/A'}
Current offer: ${offer}
Language: ${lang}

Generate marketing suggestions in ${lang}. Return ONLY valid JSON, no markdown:
{
  "hooks": [
    "hook 1 — powerful attention-grabbing headline, 5-9 words",
    "hook 2",
    "hook 3",
    "hook 4",
    "hook 5"
  ],
  "ctas": [
    "CTA 1 (2-4 words)",
    "CTA 2",
    "CTA 3",
    "CTA 4",
    "CTA 5"
  ]
}

hooks: must be scroll-stopping, curiosity-driven or urgency-based headlines directly tied to the offer. Use power words. No generic lines.
ctas: short action phrases that match the offer's intent (e.g. "Grab This Deal", "Book Free Trial", "Call & Save"). No generic "Click Here".`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json({
      hooks: Array.isArray(data.hooks) ? data.hooks.slice(0, 5) : [],
      ctas:  Array.isArray(data.ctas)  ? data.ctas.slice(0, 5)  : [],
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    return NextResponse.json({ error: 'Failed to get suggestions' }, { status: 500 });
  }
}
