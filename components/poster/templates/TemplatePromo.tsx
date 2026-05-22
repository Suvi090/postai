'use client';
import { hex2rgba, onColor, imgShadow, darkShadow, TemplateProps } from './shared';

// BOLD PROMO — offer text is the star; everything else is supporting cast
export default function TemplatePromo({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const sc    = isWide ? 0.78 : 1;

  const PAD  = pvW * 0.075;
  const BIZ  = pvW * 0.019 * sc;
  const HL   = pvW * 0.052 * sc;         // headline above offer — medium
  const OFF  = pvW * 0.105 * sc;         // GIANT offer text
  const CTA  = pvW * 0.028 * sc;
  const CON  = pvW * 0.026 * sc;

  const onAccent   = onColor(accent);
  const textSh     = bgImage ? imgShadow : darkShadow;

  const dc = copy || {
    headline:    'Your Headline Here',
    subheadline: 'Premium quality, unbeatable prices',
    offer:       business.exampleOffer,
    body: '', urgency: '',
    cta:         'Grab It Now',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* ── Background ── */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: bgImage ? 'rgba(0,0,0,.82)' : `radial-gradient(ellipse at 50% 50%, ${hex2rgba(accent, 0.10)} 0%, transparent 65%)` }} />

      {/* ── Diagonal corner decoration ── */}
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: pvW * 0.50, height: pvH * 1.2, background: `${accent}0c`, transform: 'rotate(10deg)', zIndex: 2, borderLeft: `1px solid ${accent}18` }} />

      {/* ── Top strip: biz + logo ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.12, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}px`, borderBottom: `1px solid ${hex2rgba(accent, 0.20)}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4, minWidth: 0, flex: 1 }}>
          {logoImage && <img src={logoImage} alt="" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${accent}`, flexShrink: 0 }} />}
          <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1.5, textShadow: darkShadow, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {businessName || business.label}
          </div>
        </div>
        <div style={{ fontSize: pvW * 0.026, flexShrink: 0, opacity: 0.50 }}>{business.emoji}</div>
      </div>

      {/* ── Centre: headline label + GIANT offer ── */}
      <div style={{ position: 'absolute', top: pvH * 0.12, bottom: pvH * 0.30, left: PAD * 0.7, right: PAD * 0.7, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.22, textAlign: 'center' }}>
        {dc.headline && (
          <div style={{ fontSize: HL, fontWeight: 700, color: 'rgba(255,255,255,.60)', lineHeight: 1.1, wordBreak: 'break-word', letterSpacing: 0.3, textShadow: textSh }}>
            {dc.headline}
          </div>
        )}
        {dc.offer && (
          <div style={{ fontSize: OFF, fontWeight: 900, color: '#ffffff', lineHeight: 1.0, textTransform: 'uppercase', letterSpacing: -0.5, wordBreak: 'break-word', textShadow: `0 0 40px ${hex2rgba(accent, 0.65)}, ${imgShadow}` }}>
            {dc.offer}
          </div>
        )}
        {/* Accent underline */}
        <div style={{ width: pvW * 0.28, height: 3, background: `linear-gradient(90deg, transparent, ${accent}, ${light}, transparent)`, borderRadius: 2, flexShrink: 0 }} />
      </div>

      {/* ── Bottom: CTA + subtext + contact ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: pvH * 0.30, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.35, background: `linear-gradient(0deg, ${hex2rgba(bgColor, 0.96)} 0%, transparent 100%)` }}>
        <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, color: onAccent, padding: `${PAD * 0.50}px ${PAD * 1.6}px`, borderRadius: 40, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, boxShadow: `0 4px 28px ${hex2rgba(accent, 0.50)}`, flexShrink: 0 }}>
          {dc.cta}
        </div>
        {dc.subheadline && !isWide && (
          <div style={{ fontSize: pvW * 0.020, color: 'rgba(255,255,255,.42)', textAlign: 'center', maxWidth: '80%', lineHeight: 1.4 }}>
            {dc.subheadline}
          </div>
        )}
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.85)', letterSpacing: 0.5, textAlign: 'center', fontWeight: 500 }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        )}
      </div>
    </div>
  );
}
