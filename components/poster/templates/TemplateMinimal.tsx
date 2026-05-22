'use client';
import { hex2rgba, darkShadow, TemplateProps } from './shared';

// MINIMAL — premium restraint; only the essentials, generous white space, perfect hierarchy
export default function TemplateMinimal({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const sc    = isWide ? 0.85 : 1;

  const PAD  = pvW * 0.11;
  const HL   = pvW * 0.080 * sc;
  const CTA  = pvW * 0.024 * sc;
  const BIZ  = pvW * 0.017 * sc;
  const CON  = pvW * 0.016 * sc;
  const OFF  = pvW * 0.028 * sc;

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
      {/* Background */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.75)' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}

      {/* Accent line top */}
      <div style={{ position: 'absolute', top: 0, left: PAD, right: PAD, height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, zIndex: 10 }} />

      {/* Logo — top left */}
      {logoImage && (
        <div style={{ position: 'absolute', top: PAD * 0.70, left: PAD, zIndex: 20 }}>
          <img src={logoImage} alt="" style={{ width: pvW * 0.09, height: pvW * 0.09, borderRadius: '50%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Business name — top centre */}
      <div style={{ position: 'absolute', top: pvH * 0.08, left: PAD, right: PAD, zIndex: 20, textAlign: 'center', fontSize: BIZ, color: accent, textTransform: 'uppercase', letterSpacing: Math.max(2, pvW * 0.008), fontWeight: 500, textShadow: darkShadow }}>
        {businessName || business.label}
      </div>

      {/* Main content — vertically centred */}
      <div style={{ position: 'absolute', top: pvH * 0.20, bottom: pvH * 0.20, left: PAD, right: PAD, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.48 }}>
        {/* Short rule */}
        <div style={{ width: pvW * 0.08, height: 1.5, background: accent, opacity: 0.70 }} />

        {/* Headline — the star */}
        <div style={{ fontSize: HL, fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: -0.3, wordBreak: 'break-word', maxWidth: '90%', textShadow: darkShadow }}>
          {dc.headline}
        </div>

        {/* Offer — unboxed, styled */}
        {dc.offer && (
          <div style={{ fontSize: OFF, color: light, fontWeight: 600, letterSpacing: 0.4, lineHeight: 1.35, wordBreak: 'break-word', maxWidth: '92%', textShadow: darkShadow }}>
            {dc.offer}
          </div>
        )}

        {/* CTA — text-only arrow style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.45, marginTop: PAD * 0.15 }}>
          <div style={{ height: 1, width: pvW * 0.06, background: `${accent}55` }} />
          <div style={{ fontSize: CTA, color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>{dc.cta}</div>
          <div style={{ fontSize: CTA, color: accent }}>→</div>
        </div>
      </div>

      {/* Contact — bottom */}
      {(phone || location) && (
        <div style={{ position: 'absolute', bottom: pvH * 0.07, left: PAD, right: PAD, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.40)', letterSpacing: 0.5, textShadow: darkShadow }}>
            {phone && `${phone}`}{phone && location && '  ·  '}{location && `${location}`}
          </div>
          <div style={{ fontSize: pvW * 0.022, opacity: 0.22 }}>{business.emoji}</div>
        </div>
      )}

      {/* Accent line bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: PAD, right: PAD, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 10 }} />
    </div>
  );
}
