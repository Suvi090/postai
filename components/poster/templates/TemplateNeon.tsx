'use client';
import { hex2rgba, TemplateProps } from './shared';

// NEON — dark always, electric glow on every element
export default function TemplateNeon({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.09;

  const HL  = pvW * 0.072;
  const OFF = pvW * 0.042;
  const CTA = pvW * 0.030;
  const BIZ = pvW * 0.022;
  const CON = pvW * 0.019;
  const TAG = pvW * 0.024;

  const neonGlow = `0 0 6px ${accent}, 0 0 16px ${hex2rgba(accent,.7)}, 0 0 32px ${hex2rgba(accent,.4)}`;
  const neonGlowSoft = `0 0 4px ${accent}, 0 0 12px ${hex2rgba(accent,.5)}`;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Get It Now',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* Always-dark background */}
      <div style={{ position: 'absolute', inset: 0, background: '#050508', zIndex: 0 }} />
      {bgImage && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.18 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      {/* Ambient glow blobs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: pvW * 0.7, height: pvW * 0.7, borderRadius: '50%', background: `radial-gradient(circle,${hex2rgba(accent,.18)} 0%,transparent 65%)`, zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: pvW * 0.6, height: pvW * 0.6, borderRadius: '50%', background: `radial-gradient(circle,${hex2rgba(light,.12)} 0%,transparent 65%)`, zIndex: 2 }} />

      {/* Top: neon scan line + biz name */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.13, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}px`, borderBottom: `1px solid ${hex2rgba(accent,.3)}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4 }}>
          {logoImage && <img src={logoImage} alt="logo" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${accent}`, boxShadow: neonGlowSoft }} />}
          <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 2, textShadow: neonGlowSoft }}>
            {businessName || business.label}
          </div>
        </div>
        <div style={{ fontSize: pvW * 0.028, filter: `drop-shadow(0 0 4px ${accent})` }}>{business.emoji}</div>
      </div>

      {/* Main content — centered */}
      <div style={{ position: 'absolute', top: pvH * 0.13, bottom: pvH * 0.15, left: PAD * 0.8, right: PAD * 0.8, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.5, textAlign: 'center' }}>
        {tagline && (
          <div style={{ fontSize: TAG, color: `${light}`, letterSpacing: 1, textShadow: neonGlowSoft, opacity: 0.8 }}>{tagline}</div>
        )}

        {/* Headline with layered neon glow */}
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, textShadow: neonGlow, letterSpacing: -0.3, wordBreak: 'break-word', maxWidth: '92%' }}>
          {displayCopy.headline}
        </div>

        {/* Offer box — neon border */}
        {displayCopy.offer && (
          <div style={{ border: `1.5px solid ${accent}`, borderRadius: 4, padding: `${PAD * 0.55}px ${PAD * 1.1}px`, fontSize: OFF, fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.25, wordBreak: 'break-word', textShadow: neonGlowSoft, boxShadow: `0 0 0 1px ${hex2rgba(accent,.2)}, 0 0 16px ${hex2rgba(accent,.3)}, inset 0 0 20px ${hex2rgba(accent,.05)}`, background: hex2rgba(accent, 0.07), maxWidth: '92%' }}>
            {displayCopy.offer}
          </div>
        )}

        {displayCopy.subheadline && (
          <div style={{ fontSize: pvW * 0.026, color: 'rgba(255,255,255,.5)', letterSpacing: 0.5, maxWidth: '85%', lineHeight: 1.4 }}>
            {displayCopy.subheadline}
          </div>
        )}
      </div>

      {/* CTA — neon button */}
      <div style={{ position: 'absolute', bottom: pvH * 0.15, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <div style={{ background: `linear-gradient(135deg,${accent},${light})`, color: '#050508', padding: `${PAD * 0.45}px ${PAD * 1.5}px`, borderRadius: 4, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 2, whiteSpace: 'nowrap', boxShadow: `${neonGlow}, 0 4px 20px rgba(0,0,0,.5)` }}>
          {displayCopy.cta}
        </div>
      </div>

      {/* Contact — bottom glow */}
      {(phone || location) && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: pvH * 0.15, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: `1px solid ${hex2rgba(accent,.2)}` }}>
          <div style={{ fontSize: CON, color: hex2rgba(accent, 0.7), letterSpacing: 0.5, textShadow: `0 0 8px ${hex2rgba(accent,.4)}` }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        </div>
      )}
    </div>
  );
}
