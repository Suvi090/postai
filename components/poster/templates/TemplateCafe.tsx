'use client';
import { hex2rgba, TemplateProps } from './shared';

// CAFÉ / VINTAGE — striped top, circular ornamental frame, warm & artisan feel
export default function TemplateCafe({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.07;

  const HL  = pvW * 0.058;
  const OFF = pvW * 0.036;
  const CTA = pvW * 0.028;
  const BIZ = pvW * 0.024;
  const CON = pvW * 0.019;
  const SUB = pvW * 0.026;

  const stripeH = pvH * 0.12;
  const circleSize = Math.min(pvW * 0.58, pvH * 0.42);
  const contactBarH = pvH * 0.10;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Order Now',
    caption: '',
  };

  const stripeCount = 12;

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Georgia','Times New Roman',serif", flexShrink: 0 }}>
      {/* Background */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.65)' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 55%, ${hex2rgba(accent, 0.08)} 0%, transparent 70%)` }} />
        </div>
      )}

      {/* Striped awning top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: stripeH, zIndex: 10, display: 'flex', overflow: 'hidden' }}>
        {Array.from({ length: stripeCount }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: '100%', background: i % 2 === 0 ? accent : light }} />
        ))}
      </div>
      {/* Shadow under stripes */}
      <div style={{ position: 'absolute', top: stripeH, left: 0, right: 0, height: pvH * 0.025, zIndex: 10, background: 'linear-gradient(180deg,rgba(0,0,0,.35),transparent)' }} />

      {/* Business name — below stripes, italic script feel */}
      <div style={{ position: 'absolute', top: stripeH + pvH * 0.04, left: 0, right: 0, zIndex: 20, textAlign: 'center' }}>
        {logoImage && (
          <img src={logoImage} alt="logo" style={{ width: pvW * 0.07, height: pvW * 0.07, borderRadius: '50%', objectFit: 'cover', marginBottom: 4, display: 'block', margin: '0 auto' }} />
        )}
        <div style={{ fontSize: BIZ, color: accent, fontStyle: 'italic', fontWeight: 700, letterSpacing: 1, textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>
          {businessName || business.label}
        </div>
        {tagline && (
          <div style={{ fontSize: pvW * 0.018, color: 'rgba(255,255,255,.55)', fontStyle: 'italic', marginTop: 2 }}>{tagline}</div>
        )}
      </div>

      {/* Circular frame — center of poster */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -46%)', zIndex: 20, width: circleSize, height: circleSize, borderRadius: '50%', border: `2.5px solid ${accent}`, boxShadow: `0 0 0 5px ${hex2rgba(accent, 0.15)}, 0 0 0 8px ${hex2rgba(accent, 0.07)}, 0 4px 30px rgba(0,0,0,.5)`, background: hex2rgba(bgColor, 0.82), backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: pvW * 0.016, padding: pvW * 0.04 }}>
        <div style={{ fontSize: pvW * 0.030, color: accent }}>{business.emoji}</div>
        <div style={{ width: circleSize * 0.5, height: 1, background: `${accent}66` }} />
        {/* Headline inside circle */}
        <div style={{ fontSize: HL * 0.85, fontWeight: 800, color: '#ffffff', textAlign: 'center', lineHeight: 1.15, wordBreak: 'break-word', textShadow: '0 2px 10px rgba(0,0,0,.8)', fontStyle: 'italic' }}>
          {displayCopy.headline}
        </div>
        {displayCopy.offer && (
          <>
            <div style={{ width: circleSize * 0.4, height: 1, background: `${accent}55` }} />
            <div style={{ fontSize: OFF * 0.82, fontWeight: 900, color: accent, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, wordBreak: 'break-word', textShadow: `0 0 12px ${hex2rgba(accent, 0.5)}` }}>
              {displayCopy.offer}
            </div>
          </>
        )}
        {displayCopy.subheadline && (
          <div style={{ fontSize: SUB * 0.72, color: 'rgba(255,255,255,.65)', textAlign: 'center', lineHeight: 1.3, fontStyle: 'italic' }}>
            {displayCopy.subheadline}
          </div>
        )}
      </div>

      {/* CTA — below circle */}
      <div style={{ position: 'absolute', bottom: contactBarH + pvH * 0.04, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <div style={{ background: `linear-gradient(135deg,${accent},${light})`, color: bgColor, padding: `${PAD * 0.45}px ${PAD * 1.3}px`, borderRadius: 30, fontWeight: 800, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1.5, whiteSpace: 'nowrap', boxShadow: `0 3px 18px ${hex2rgba(accent, 0.5)}` }}>
          {displayCopy.cta}
        </div>
      </div>

      {/* Contact bar at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: contactBarH, zIndex: 20, background: `${accent}22`, borderTop: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: PAD * 0.5 }}>
        <div style={{ flex: 1, height: 1, background: `${accent}44`, maxWidth: pvW * 0.08, marginLeft: PAD * 0.6 }} />
        <div style={{ fontSize: CON, color: 'rgba(255,255,255,.7)', letterSpacing: 0.5, textAlign: 'center' }}>
          {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          {!phone && !location && `${business.label}`}
        </div>
        <div style={{ flex: 1, height: 1, background: `${accent}44`, maxWidth: pvW * 0.08, marginRight: PAD * 0.6 }} />
      </div>
    </div>
  );
}
