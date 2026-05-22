'use client';
import { hex2rgba, onColor, imgShadow, darkShadow, TemplateProps } from './shared';

// EDITORIAL — newspaper-style: masthead → left-aligned headline → image band → offer + CTA
export default function TemplateEditorial({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const isTall = pvH > pvW * 1.3;
  const sc    = isWide ? 0.82 : 1;

  const PAD  = pvW * 0.075;
  const HL   = pvW * 0.072 * sc;
  const OFF  = pvW * 0.032 * sc;
  const CTA  = pvW * 0.024 * sc;
  const BIZ  = pvW * 0.018 * sc;
  const CON  = pvW * 0.026 * sc;
  const SUB  = pvW * 0.024 * sc;

  const mastheadH  = pvH * 0.12;
  const imageStripH = isWide ? pvH * 0.22 : pvH * 0.26;
  const bottomH    = isWide ? pvH * 0.30 : pvH * 0.28;
  const headlineH  = pvH - mastheadH - imageStripH - bottomH;

  const onAccent   = onColor(accent);

  const dc = copy || {
    headline:    'Your Headline Here',
    subheadline: 'Premium quality, unbeatable prices',
    offer:       business.exampleOffer,
    body: '', urgency: '',
    cta:         'Learn More',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Georgia','Times New Roman',serif", flexShrink: 0, background: bgColor }}>
      {/* Subtle bg texture */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: `linear-gradient(160deg, ${hex2rgba(accent, 0.05)} 0%, transparent 50%)` }} />

      {/* ── Masthead ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: mastheadH, zIndex: 20, padding: `0 ${PAD}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2.5px solid ${accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4, minWidth: 0, flex: 1 }}>
          {logoImage && <img src={logoImage} alt="" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: BIZ, color: '#ffffff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {businessName || business.label}
            </div>
            {tagline && !isWide && (
              <div style={{ fontSize: BIZ * 0.82, color: accent, fontStyle: 'italic', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tagline}</div>
            )}
          </div>
        </div>
        <div style={{ fontSize: pvW * 0.026, flexShrink: 0, marginLeft: PAD * 0.3 }}>{business.emoji}</div>
      </div>

      {/* ── Headline zone ── */}
      <div style={{ position: 'absolute', top: mastheadH, left: PAD, right: PAD, height: headlineH, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.28 }}>
        {/* Left-side column rule — editorial signature */}
        <div style={{ position: 'absolute', left: -PAD * 0.45, top: '15%', bottom: '15%', width: 3, background: `linear-gradient(180deg, transparent, ${accent}, transparent)`, borderRadius: 2 }} />
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.10, wordBreak: 'break-word', textShadow: darkShadow, fontStyle: 'italic' }}>
          {dc.headline}
        </div>
        {dc.subheadline && !isWide && (
          <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.62)', lineHeight: 1.40, wordBreak: 'break-word', fontStyle: 'normal', fontFamily: "'Inter',sans-serif" }}>
            — {dc.subheadline}
          </div>
        )}
      </div>

      {/* ── Image band ── */}
      <div style={{ position: 'absolute', top: mastheadH + headlineH, left: 0, right: 0, height: imageStripH, zIndex: 20, overflow: 'hidden' }}>
        {bgImage ? (
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(115deg, ${accent} 0%, ${light} 60%, ${hex2rgba(accent, 0.55)} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: pvW * 0.08, opacity: 0.25 }}>{business.emoji}</div>
          </div>
        )}
        {/* Gradient fade at bottom for readability of offer text below */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: `linear-gradient(0deg, ${bgColor}, transparent)` }} />
        {/* Offer text overlaid on image band */}
        {dc.offer && (
          <div style={{ position: 'absolute', bottom: PAD * 0.45, left: PAD, right: PAD, fontSize: OFF, fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.4, lineHeight: 1.2, wordBreak: 'break-word', textShadow: imgShadow }}>
            {dc.offer}
          </div>
        )}
      </div>

      {/* ── Bottom: CTA + contact ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: bottomH, zIndex: 20, padding: `${PAD * 0.45}px ${PAD}px`, borderTop: `1.5px solid ${hex2rgba(accent, 0.30)}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, color: onAccent, padding: `${PAD * 0.38}px ${PAD * 1.0}px`, borderRadius: 5, fontWeight: 800, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: "'Inter',sans-serif", boxShadow: `0 3px 14px ${hex2rgba(accent, 0.40)}` }}>
            {dc.cta} →
          </div>
        </div>
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.45)', letterSpacing: 0.5, fontFamily: "'Inter',sans-serif" }}>
            {phone && `☎ ${phone}`}{phone && location && '  |  '}{location}
          </div>
        )}
      </div>
    </div>
  );
}
