'use client';
import { hex2rgba, TemplateProps } from './shared';

// EDITORIAL — left-aligned newspaper hierarchy: masthead → headline → image strip → offer → CTA
export default function TemplateEditorial({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.08;

  const HL  = pvW * 0.075;
  const OFF = pvW * 0.034;
  const CTA = pvW * 0.026;
  const BIZ = pvW * 0.019;
  const CON = pvW * 0.018;
  const SUB = pvW * 0.026;

  const mastheadH = pvH * 0.12;
  const imageStripH = pvH * 0.28;
  const bottomH = pvH * 0.28;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Read More',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Georgia','Times New Roman',serif", flexShrink: 0, background: bgColor }}>
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: `linear-gradient(160deg,${hex2rgba(accent,.06)} 0%,transparent 50%)` }} />

      {/* MASTHEAD — top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: mastheadH, zIndex: 20, padding: `0 ${PAD}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4 }}>
          {logoImage && <img src={logoImage} alt="logo" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover' }} />}
          <div>
            <div style={{ fontSize: BIZ, color: '#ffffff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
              {businessName || business.label}
            </div>
            {tagline && <div style={{ fontSize: BIZ * 0.8, color: `${accent}`, fontStyle: 'italic', marginTop: 1 }}>{tagline}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.3 }}>
          <div style={{ width: 1, height: pvH * 0.04, background: `${accent}66` }} />
          <div style={{ fontSize: pvW * 0.028 }}>{business.emoji}</div>
        </div>
      </div>

      {/* HEADLINE — left aligned, big */}
      <div style={{ position: 'absolute', top: mastheadH, left: PAD, right: PAD, height: pvH - mastheadH - imageStripH - bottomH, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.3 }}>
        {/* Column rule left */}
        <div style={{ position: 'absolute', left: -PAD * 0.5, top: '10%', bottom: '10%', width: 2.5, background: `linear-gradient(180deg,transparent,${accent},transparent)` }} />
        <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.1, wordBreak: 'break-word', textShadow: '0 2px 12px rgba(0,0,0,.6)', fontStyle: 'italic' }}>
          {displayCopy.headline}
        </div>
        {displayCopy.subheadline && (
          <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.65)', lineHeight: 1.4, wordBreak: 'break-word', fontStyle: 'normal' }}>
            — {displayCopy.subheadline}
          </div>
        )}
      </div>

      {/* IMAGE STRIP — full width */}
      <div style={{ position: 'absolute', top: pvH - imageStripH - bottomH, left: 0, right: 0, height: imageStripH, zIndex: 20, overflow: 'hidden' }}>
        {bgImage ? (
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${accent} 0%,${light} 50%,${hex2rgba(accent,.5)} 100%)` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: pvW * 0.09, opacity: 0.3 }}>{business.emoji}</div>
          </div>
        )}
        {/* Overlay for text readability below */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg,rgba(0,0,0,.7),transparent)' }} />
        {/* Caption / offer on image */}
        {displayCopy.offer && (
          <div style={{ position: 'absolute', bottom: PAD * 0.5, left: PAD, right: PAD, fontSize: OFF, fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, wordBreak: 'break-word', textShadow: '0 2px 8px rgba(0,0,0,.9)' }}>
            {displayCopy.offer}
          </div>
        )}
      </div>

      {/* BOTTOM — CTA right-aligned + contact */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: bottomH, zIndex: 20, padding: `${PAD * 0.5}px ${PAD}px`, borderTop: `1.5px solid ${accent}44`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: `linear-gradient(135deg,${accent},${light})`, color: bgColor, padding: `${PAD * 0.38}px ${PAD * 1.0}px`, borderRadius: 5, fontWeight: 800, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: "'Inter',sans-serif", boxShadow: `0 2px 14px ${hex2rgba(accent,.45)}` }}>
            {displayCopy.cta} →
          </div>
        </div>
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.50)', letterSpacing: 0.5, fontFamily: "'Inter',sans-serif" }}>
            {phone && `☎ ${phone}`}{phone && location && '  |  '}{location && `${location}`}
          </div>
        )}
      </div>
    </div>
  );
}
