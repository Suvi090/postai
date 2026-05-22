'use client';
import { hex2rgba, onColor, TemplateProps } from './shared';

// NEON — always-dark canvas; every element glows in accent colour
export default function TemplateNeon({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const sc    = isWide ? 0.80 : 1;

  const PAD  = pvW * 0.085;
  const HL   = pvW * 0.070 * sc;
  const OFF  = pvW * 0.040 * sc;
  const CTA  = pvW * 0.028 * sc;
  const BIZ  = pvW * 0.020 * sc;
  const CON  = pvW * 0.026 * sc;
  const TAG  = pvW * 0.022 * sc;

  // Layered neon text-shadow using the accent colour
  const neonText   = `0 0 6px ${accent}, 0 0 18px ${hex2rgba(accent, 0.70)}, 0 0 40px ${hex2rgba(accent, 0.35)}`;
  const neonSoft   = `0 0 4px ${accent}, 0 0 14px ${hex2rgba(accent, 0.55)}`;
  const neonBox    = `0 0 0 1px ${hex2rgba(accent, 0.25)}, 0 0 20px ${hex2rgba(accent, 0.30)}, inset 0 0 20px ${hex2rgba(accent, 0.05)}`;

  // CTA uses onColor so text is always readable against the gradient button
  const onAccent = onColor(accent);

  const dc = copy || {
    headline:    tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer:       business.exampleOffer,
    body: '', urgency: '',
    cta:         'Get It Now',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* Always-dark base */}
      <div style={{ position: 'absolute', inset: 0, background: '#060609', zIndex: 0 }} />
      {bgImage && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.14 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      {/* Ambient glow blobs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: pvW * 0.65, height: pvW * 0.65, borderRadius: '50%', background: `radial-gradient(circle, ${hex2rgba(accent, 0.16)} 0%, transparent 70%)`, zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: '-18%', right: '-12%', width: pvW * 0.55, height: pvW * 0.55, borderRadius: '50%', background: `radial-gradient(circle, ${hex2rgba(light, 0.10)} 0%, transparent 70%)`, zIndex: 2 }} />

      {/* Scan-line border at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, zIndex: 10, boxShadow: neonSoft }} />

      {/* ── Top bar: biz name ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.13, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}px`, borderBottom: `1px solid ${hex2rgba(accent, 0.22)}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4, minWidth: 0, flex: 1 }}>
          {logoImage && <img src={logoImage} alt="" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${accent}`, boxShadow: neonSoft, flexShrink: 0 }} />}
          <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 2, textShadow: neonSoft, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {businessName || business.label}
          </div>
        </div>
        <div style={{ fontSize: pvW * 0.026, filter: `drop-shadow(0 0 4px ${accent})`, flexShrink: 0 }}>{business.emoji}</div>
      </div>

      {/* ── Centre: headline + offer box ── */}
      <div style={{ position: 'absolute', top: pvH * 0.13, bottom: pvH * 0.28, left: PAD * 0.85, right: PAD * 0.85, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.48, textAlign: 'center' }}>
        {tagline && !isWide && (
          <div style={{ fontSize: TAG, color: light, letterSpacing: 1, textShadow: neonSoft, opacity: 0.85 }}>{tagline}</div>
        )}

        {/* Headline with full neon glow */}
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.10, textShadow: neonText, letterSpacing: -0.3, wordBreak: 'break-word', maxWidth: '94%' }}>
          {dc.headline}
        </div>

        {/* Offer — glowing box border */}
        {dc.offer && (
          <div style={{ border: `1.5px solid ${accent}`, borderRadius: 5, padding: `${PAD * 0.52}px ${PAD * 1.05}px`, fontSize: OFF, fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.4, lineHeight: 1.25, wordBreak: 'break-word', textShadow: neonSoft, boxShadow: neonBox, background: hex2rgba(accent, 0.06), maxWidth: '94%', textAlign: 'center' }}>
            {dc.offer}
          </div>
        )}

        {dc.subheadline && !isWide && (
          <div style={{ fontSize: pvW * 0.024, color: 'rgba(255,255,255,.48)', letterSpacing: 0.5, maxWidth: '86%', lineHeight: 1.45, wordBreak: 'break-word' }}>
            {dc.subheadline}
          </div>
        )}
      </div>

      {/* ── CTA + Contact — grouped in safe zone ── */}
      <div style={{ position: 'absolute', bottom: pvH * 0.09, left: PAD, right: PAD, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: PAD * 0.40 }}>
        <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, color: onAccent, padding: `${PAD * 0.44}px ${PAD * 1.45}px`, borderRadius: 4, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 2, whiteSpace: 'nowrap', boxShadow: `${neonText}, 0 4px 20px rgba(0,0,0,.5)` }}>
          {dc.cta}
        </div>
        {(phone || location) && (
          <div style={{ fontSize: CON, color: hex2rgba(accent, 0.85), letterSpacing: 0.5, textShadow: `0 0 8px ${hex2rgba(accent, 0.40)}`, textAlign: 'center', fontWeight: 500, lineHeight: 1.5 }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        )}
      </div>

      {/* Scan-line border at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 10 }} />
    </div>
  );
}
