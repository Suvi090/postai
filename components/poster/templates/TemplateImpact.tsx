'use client';
import { hex2rgba, onColor, imgShadow, darkShadow, TemplateProps } from './shared';

// IMPACT — giant headline dominates top half; accent strip anchors the bottom with offer + CTA
export default function TemplateImpact({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const isTall = pvH > pvW * 1.3;
  const sc = isWide ? 0.80 : 1;          // scale fonts down on wide/short canvases

  const PAD  = pvW * 0.075;
  const HL   = pvW * 0.100 * sc;         // massive headline
  const SUB  = pvW * 0.028 * sc;
  const OFF  = pvW * 0.034 * sc;
  const CTA  = pvW * 0.026 * sc;
  const BIZ  = pvW * 0.020 * sc;
  const CON  = pvW * 0.018 * sc;

  const stripH    = isWide ? pvH * 0.42 : pvH * 0.36;  // bottom accent strip
  const onAccent  = onColor(accent);                    // text colour on accent bg
  const textSh    = bgImage ? imgShadow : darkShadow;

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
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 15%, ${hex2rgba(accent, 0.12)} 0%, transparent 60%)` }} />
        </div>
      )}
      {bgImage && <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.45) 55%, rgba(0,0,0,0) 100%)' }} />}

      {/* ── Top strip: logo + biz name ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.13, zIndex: 20, display: 'flex', alignItems: 'center', padding: `0 ${PAD}px`, gap: PAD * 0.5 }}>
        {logoImage && (
          <img src={logoImage} alt="" style={{ width: pvW * 0.09, height: pvW * 0.09, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0 }} />
        )}
        <div style={{ minWidth: 0 }}>
          {businessName && (
            <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 700, letterSpacing: Math.max(1, pvW * 0.005), textShadow: darkShadow, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {businessName}
            </div>
          )}
          {tagline && !isWide && (
            <div style={{ fontSize: BIZ * 0.85, color: 'rgba(255,255,255,.55)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tagline}</div>
          )}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: pvW * 0.030, flexShrink: 0 }}>{business.emoji}</div>
      </div>

      {/* ── Main area: giant headline ── */}
      <div style={{ position: 'absolute', top: pvH * 0.13, left: PAD, right: PAD, bottom: stripH, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.30 }}>
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.05, textShadow: textSh, wordBreak: 'break-word', letterSpacing: -0.5 }}>
          {dc.headline}
        </div>
        {dc.subheadline && !isWide && (
          <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.78)', lineHeight: 1.4, wordBreak: 'break-word', textShadow: textSh }}>
            {dc.subheadline}
          </div>
        )}
      </div>

      {/* ── Bottom accent strip: offer + CTA + contact ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: stripH, zIndex: 20, background: `linear-gradient(135deg, ${accent} 0%, ${light} 100%)`, padding: `${PAD * 0.55}px ${PAD}px ${PAD * 0.50}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {dc.offer && (
          <div style={{ fontSize: OFF, fontWeight: 900, color: onAccent, textTransform: 'uppercase', letterSpacing: 0.4, lineHeight: 1.2, wordBreak: 'break-word' }}>
            {dc.offer}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: PAD * 0.3, flexWrap: 'wrap' }}>
          <div style={{ fontSize: CTA, fontWeight: 800, color: onAccent, textTransform: 'uppercase', letterSpacing: 1.5, background: `rgba(0,0,0,0.15)`, padding: `${PAD * 0.28}px ${PAD * 0.7}px`, borderRadius: 6, flexShrink: 0 }}>
            {dc.cta} →
          </div>
          {(phone || location) && (
            <div style={{ fontSize: CON, color: onAccent, opacity: 0.80, textAlign: 'right', lineHeight: 1.4, wordBreak: 'break-word', flexShrink: 1, minWidth: 0 }}>
              {phone && `📞 ${phone}`}{phone && location && '\n'}{location && `📍 ${location}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
