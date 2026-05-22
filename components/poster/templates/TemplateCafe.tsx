'use client';
import { hex2rgba, onColor, imgShadow, darkShadow, TemplateProps } from './shared';

// DIAGONAL — bold skewed accent band; text is NEVER rotated, always perfectly readable
export default function TemplateDiagonal({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const sc    = isWide ? 0.82 : 1;

  const PAD  = pvW * 0.075;
  const HL   = pvW * 0.082 * sc;
  const SUB  = pvW * 0.026 * sc;
  const OFF  = pvW * 0.034 * sc;
  const CTA  = pvW * 0.026 * sc;
  const BIZ  = pvW * 0.019 * sc;
  const CON  = pvW * 0.018 * sc;

  // The diagonal band sits in the centre third
  const bandTop = pvH * 0.27;
  const bandH   = pvH * 0.36;

  // Text inside the band must contrast with the accent colour
  const onAccent   = onColor(accent);
  const accentSemi = hex2rgba(accent, 0.10);

  const dc = copy || {
    headline:    tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer:       business.exampleOffer,
    body: '', urgency: '',
    cta:         'Contact Us',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* ── Background ── */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.60)' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 85% 20%, ${hex2rgba(accent, 0.08)} 0%, transparent 55%)` }} />
        </div>
      )}

      {/* ── Diagonal band: only the BACKGROUND is skewed ── */}
      {/* Shadow strip for depth */}
      <div style={{ position: 'absolute', left: '-5%', width: '110%', top: bandTop - pvH * 0.018, height: pvH * 0.022, background: 'rgba(0,0,0,0.30)', transform: 'skewY(-5deg)', zIndex: 4 }} />
      {/* Main accent band */}
      <div style={{ position: 'absolute', left: '-5%', width: '110%', top: bandTop, height: bandH, background: `linear-gradient(110deg, ${accent} 0%, ${light} 100%)`, transform: 'skewY(-5deg)', zIndex: 5, boxShadow: `0 6px 40px ${hex2rgba(accent, 0.40)}` }} />

      {/* ── Top zone: logo + biz name + tagline ── */}
      <div style={{ position: 'absolute', top: PAD * 0.70, left: PAD, right: PAD, zIndex: 20, display: 'flex', alignItems: 'center', gap: PAD * 0.5 }}>
        {logoImage && (
          <img src={logoImage} alt="" style={{ width: pvW * 0.09, height: pvW * 0.09, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0 }} />
        )}
        <div style={{ minWidth: 0, flex: 1 }}>
          {businessName && (
            <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1.5, textShadow: darkShadow, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {businessName}
            </div>
          )}
        </div>
        <div style={{ fontSize: pvW * 0.028, flexShrink: 0, opacity: 0.5 }}>{business.emoji}</div>
      </div>

      {/* ── Headline: sits over the band, text is NOT skewed ── */}
      <div style={{ position: 'absolute', top: bandTop - pvH * 0.025, left: PAD, right: PAD, height: bandH + pvH * 0.05, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: PAD * 0.28 }}>
        <div style={{ fontSize: HL, fontWeight: 900, color: onAccent, lineHeight: 1.08, wordBreak: 'break-word', maxWidth: '94%', letterSpacing: -0.3 }}>
          {dc.headline}
        </div>
        {dc.subheadline && !isWide && (
          <div style={{ fontSize: SUB, color: onAccent, opacity: 0.80, lineHeight: 1.35, maxWidth: '88%', wordBreak: 'break-word' }}>
            {dc.subheadline}
          </div>
        )}
      </div>

      {/* ── Bottom zone: offer + CTA + contact ── */}
      <div style={{ position: 'absolute', bottom: PAD * 0.85, left: PAD, right: PAD, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: PAD * 0.40 }}>
        {dc.offer && (
          <div style={{ border: `2px solid ${accent}`, borderRadius: 8, padding: `${PAD * 0.50}px ${PAD * 0.90}px`, fontSize: OFF, fontWeight: 900, color: accent, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.25, textAlign: 'center', wordBreak: 'break-word', background: accentSemi, backdropFilter: 'blur(4px)', width: '100%', boxSizing: 'border-box', textShadow: darkShadow }}>
            {dc.offer}
          </div>
        )}
        <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, color: onAccent, padding: `${PAD * 0.45}px ${PAD * 1.5}px`, borderRadius: 8, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, boxShadow: `0 4px 20px ${hex2rgba(accent, 0.45)}`, whiteSpace: 'nowrap' }}>
          {dc.cta}
        </div>
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.58)', letterSpacing: 0.4, textAlign: 'center', lineHeight: 1.5 }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        )}
      </div>
    </div>
  );
}
