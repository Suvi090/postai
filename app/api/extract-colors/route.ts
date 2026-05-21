import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const mediaTypeMatch = imageBase64.match(/data:([^;]+);/);
    const mediaType = (mediaTypeMatch?.[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp') || 'image/jpeg';

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64Data },
            },
            {
              type: 'text',
              text: 'Extract dominant brand colors from this image. Return ONLY valid JSON (no markdown): {"accent": "main brand color as hex", "light": "lighter version of main color as hex", "bg": "very dark background color that complements the brand as hex"}. No explanation.',
            },
          ],
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const colors = JSON.parse(jsonMatch[0]);
    return NextResponse.json(colors);
  } catch (error) {
    console.error('Extract colors error:', error);
    return NextResponse.json({ error: 'Failed to extract colors' }, { status: 500 });
  }
}
