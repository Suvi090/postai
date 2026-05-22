'use client';
import { hex2rgba, TemplateProps } from './shared';

// BOLD PROMO — giant offer text dead centre, sale-poster energy
export default function TemplatePromo({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.07;

  const BIZ = pvW * 0.019;
  const HL  = pvW * 0.060;
  const OFF = pvW * 0.115; // the star of the show
  const CTA = pvW * 0.028;
  const CON = pvW * 0.018;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Grab It Now',
    caption: '',
  };

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {/* Background */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}
      {/* Strong overlay so offer text pops */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: bgImage ? 'rgba(0,0,0,.82)' : `radial-gradient(ellipse at 50% 50%,${hex2rgba(accent,.14)} 0%,transparent 65%)` }} />

      {/* Diagonal accent stripe background decoration */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: pvW * 0.55, height: pvH * 1.4, background: `${accent}0d`, transform: 'rotate(12deg)', zIndex: 2, borderLeft: `1px solid ${accent}1a` }} />

      {/* Top bar — biz name + emoji */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: pvH * 0.11, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}px`, borderBottom: `1px solid ${accent}22` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4 }}>
          {logoImage && <img src={logoImage} alt="logo" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${accent}` }} />}
          <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1.5 }}>
            {businessName || business.label}
          </div>
        </div>
        <div style={{ fontSize: pvW * 0.030, opacity: 0.6 }}>{business.emoji}</div>
      </div>

      {/* GIANT OFFER — centre stage */}
      <div style={{ position: 'absolute', top: pvH * 0.11, bottom: pvH * 0.32, left: PAD * 0.6, right: PAD * 0.6, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.25, textAlign: 'center' }}>
        {/* Headline — medium, above offer */}
        {displayCopy.headline && (
          <div style={{ fontSize: HL, fontWeight: 700, color: 'rgba(255,255,255,.65)', lineHeight: 1.1, wordBreak: 'break-word', letterSpacing: 0.5 }}>
            {displayCopy.headline}
          </div>
        )}
        {/* The offer — massive */}
        {displayCopy.offer && (
          <div style={{ fontSize: OFF, fontWeight: 900, color: '#ffffff', lineHeight: 1.0, textTransform: 'uppercase', letterSpacing: -0.5, wordBreak: 'break-word', textShadow: `0 0 40px ${hex2rgba(accent,.7)}, 0 4px 30px rgba(0,0,0,.9)` }}>
            {displayCopy.offer}
          </div>
        )}
        {/* Accent underline */}
        <div style={{ width: pvW * 0.3, height: 3, background: `linear-gradient(90deg,transparent,${accent},${light},transparent)`, borderRadius: 2 }} />
      </div>

      {/* Bottom panel — CTA + contact */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: pvH * 0.32, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.4, background: `linear-gradient(0deg,${hex2rgba(bgColor,.95)} 0%,transparent 100%)` }}>
        <div style={{ background: `linear-gradient(135deg,${accent},${light})`, color: bgColor, padding: `${PAD * 0.5}px ${PAD * 1.6}px`, borderRadius: 40, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, boxShadow: `0 4px 28px ${hex2rgba(accent,.55)}` }}>
          {displayCopy.cta}
        </div>
        {displayCopy.subheadline && (
          <div style={{ fontSize: pvW * 0.022, color: 'rgba(255,255,255,.45)', textAlign: 'center', maxWidth: '80%' }}>
            {displayCopy.subheadline}
          </div>
        )}
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.40)', letterSpacing: 0.5 }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        )}
      </div>
    </div>
  );
}
