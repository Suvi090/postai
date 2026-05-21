import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';
import { getBusiness } from '@/lib/businesses';

export async function POST(req: NextRequest) {
  try {
    const { offer, profile, language, bizTone, bizLayout } = await req.json();

    const biz = getBusiness(profile.bizType);
    const langName = language || 'english';
    const tone = bizTone || biz.tone;

    const prompt = `You are an expert marketing copywriter for Indian local businesses.

Business: ${profile.name} (${biz.label})
Location: ${profile.location} | Phone: ${profile.phone}
Tagline: ${profile.tagline || 'N/A'}
Extra details: ${profile.extraDetails || 'N/A'}
Offer: ${offer}
Tone: ${tone}
Layout style: ${bizLayout || biz.layout}

Language: Write ALL copy in ${langName}. Use natural conversational tone that locals use. Keep prices in numerals (₹). DO NOT use formal translation — use everyday language.

Generate compelling marketing copy. Return ONLY valid JSON (no markdown, no explanation):
{
  "headline": "powerful 4-8 word headline in caps",
  "subheadline": "supporting line that elaborates the offer",
  "offer": "the core offer in 1 punchy line",
  "body": "2-3 lines of persuasive body copy",
  "urgency": "urgency line without the ⚡ prefix",
  "cta": "call to action button text (3-5 words)",
  "caption": "Instagram caption: 3-4 lines with emojis relevant to the business, then a 7th line with 6 relevant hashtags starting with #"
}`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const copy = JSON.parse(jsonMatch[0]);
    return NextResponse.json(copy);
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate copy' }, { status: 500 });
  }
}
