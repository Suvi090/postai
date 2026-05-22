'use client';
import { hex2rgba, TemplateProps } from './shared';

// IMPACT — giant headline takes over 55% of poster, bold accent strip at bottom
export default function TemplateImpact({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.08;

  const HL  = pvW * 0.11;
  const SUB = pvW * 0.028;
  const OFF = pvW * 0.038;
  const CTA = pvW * 0.030;
  const BIZ = pvW * 0.021;
  const CON = pvW * 0.020;

  const stripH = pvH * 0.36;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Contact Us',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* Background */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}
      {/* Dark overlay so text is always readable */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: bgImage ? 'linear-gradient(180deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.55) 60%,rgba(0,0,0,.0) 100%)' : `radial-gradient(ellipse at 10% 10%,${hex2rgba(accent,.15)} 0%,transparent 55%)` }} />

      {/* Top strip — logo + biz name */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.13, zIndex: 20, display: 'flex', alignItems: 'center', padding: `0 ${PAD}px`, gap: PAD * 0.5 }}>
        {logoImage && (
          <img src={logoImage} alt="logo" style={{ width: pvW * 0.09, height: pvW * 0.09, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${accent}`, flexShrink: 0 }} />
        )}
        {businessName && (
          <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 700, letterSpacing: Math.max(1, pvW * 0.005), textShadow: '0 1px 8px rgba(0,0,0,.8)' }}>
            {businessName}
          </div>
        )}
        <div style={{ marginLeft: 'auto', fontSize: pvW * 0.028, color: accent, opacity: 0.7 }}>{business.emoji}</div>
      </div>

      {/* Giant headline — fills upper body */}
      <div style={{ position: 'absolute', top: pvH * 0.13, left: PAD, right: PAD, bottom: stripH, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.35 }}>
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.05, textShadow: `0 4px 40px rgba(0,0,0,.9), 0 0 60px ${hex2rgba(accent,.2)}`, letterSpacing: -0.5, wordBreak: 'break-word' }}>
          {displayCopy.headline}
        </div>
        {displayCopy.subheadline && (
          <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.75)', lineHeight: 1.4, wordBreak: 'break-word', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>
            {displayCopy.subheadline}
          </div>
        )}
      </div>

      {/* Bottom accent strip — offer + CTA + contact */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: stripH, zIndex: 20, background: `linear-gradient(135deg,${accent} 0%,${light} 100%)`, padding: `${PAD * 0.55}px ${PAD}px ${PAD * 0.5}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {displayCopy.offer && (
          <div style={{ fontSize: OFF, fontWeight: 900, color: bgColor, textTransform: 'uppercase', letterSpacing: 0.4, lineHeight: 1.2, wordBreak: 'break-word' }}>
            {displayCopy.offer}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: PAD * 0.3, flexWrap: 'wrap' }}>
          <div style={{ fontSize: CTA, fontWeight: 800, color: bgColor, textTransform: 'uppercase', letterSpacing: 1, background: 'rgba(0,0,0,.18)', padding: `${PAD * 0.28}px ${PAD * 0.6}px`, borderRadius: 6 }}>
            {displayCopy.cta} →
          </div>
          {(phone || location) && (
            <div style={{ fontSize: CON, color: bgColor, opacity: 0.85, textAlign: 'right', lineHeight: 1.4, wordBreak: 'break-word' }}>
              {phone && `📞 ${phone}`}{phone && location && '\n'}{location && `📍 ${location}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
