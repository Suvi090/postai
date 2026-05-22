'use client';
import { hex2rgba, TemplateProps } from './shared';

// SPLIT — text left panel / photo right panel (stacks top/bottom on tall formats)
export default function TemplateSplit({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isTall = pvH > pvW * 1.2;
  const PAD = pvW * 0.07;

  const HL  = pvW * (isTall ? 0.072 : 0.065);
  const SUB = pvW * 0.030;
  const OFF = pvW * 0.036;
  const CTA = pvW * 0.028;
  const BIZ = pvW * 0.022;
  const CON = pvW * 0.019;
  const TAG = pvW * 0.024;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: '',
    urgency: '',
    cta: 'Contact Us',
    caption: '',
  };

  const accentHex44 = accent + '44';

  // Text panel
  const textPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.45, padding: PAD, background: isTall ? 'rgba(0,0,0,.55)' : 'transparent', flex: isTall ? 'none' : 1, height: isTall ? '55%' : '100%', width: isTall ? '100%' : '52%', position: 'relative', zIndex: 20 }}>
      {/* Top row: logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4 }}>
        {logoImage && <img src={logoImage} alt="logo" style={{ width: pvW * 0.08, height: pvW * 0.08, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${accent}`, flexShrink: 0 }} />}
        <div>
          {businessName && <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1.5 }}>{businessName}</div>}
          {tagline && <div style={{ fontSize: TAG * 0.85, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{tagline}</div>}
        </div>
      </div>

      {/* Accent rule */}
      <div style={{ width: pvW * 0.12, height: 2.5, background: `linear-gradient(90deg,${accent},${light})`, borderRadius: 2 }} />

      {/* Headline */}
      <div style={{ fontSize: HL, fontWeight: 900, color: '#fff', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,.9)', wordBreak: 'break-word' }}>
        {displayCopy.headline}
      </div>

      {displayCopy.subheadline && (
        <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.75)', lineHeight: 1.4, wordBreak: 'break-word' }}>
          {displayCopy.subheadline}
        </div>
      )}

      {/* Offer pill */}
      {displayCopy.offer && (
        <div style={{ background: `${accent}22`, border: `1.5px solid ${accent}`, borderRadius: 8, padding: `${PAD * 0.4}px ${PAD * 0.7}px`, fontSize: OFF, fontWeight: 900, color: accent, textTransform: 'uppercase', letterSpacing: 0.4, lineHeight: 1.25, wordBreak: 'break-word', boxShadow: `0 2px 12px ${accentHex44}` }}>
          {displayCopy.offer}
        </div>
      )}

      {/* CTA + contact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: PAD * 0.3, marginTop: PAD * 0.1 }}>
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: `linear-gradient(135deg,${accent},${light})`, color: bgColor, padding: `${PAD * 0.45}px ${PAD * 1.1}px`, borderRadius: 7, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1, boxShadow: `0 3px 16px ${accentHex44}` }}>
          {displayCopy.cta}
        </div>
        {(phone || location) && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.60)', lineHeight: 1.5, wordBreak: 'break-word' }}>
            {phone && `📞 ${phone}`}{phone && location && '  ·  '}{location && `📍 ${location}`}
          </div>
        )}
      </div>
    </div>
  );

  // Photo/accent panel
  const photoPanel = (
    <div style={{ flex: isTall ? 'none' : 1, height: isTall ? '45%' : '100%', width: isTall ? '100%' : '48%', position: 'relative', overflow: 'hidden' }}>
      {bgImage ? (
        <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${accent} 0%, ${light} 40%, ${hex2rgba(accent, 0.4)} 100%)` }} />
      )}
      {/* Subtle overlay pattern */}
      <div style={{ position: 'absolute', inset: 0, background: bgImage ? 'linear-gradient(135deg,rgba(0,0,0,.3) 0%,transparent 60%)' : `radial-gradient(ellipse at 70% 30%,rgba(255,255,255,.15) 0%,transparent 60%)` }} />
      {/* Emoji watermark */}
      <div style={{ position: 'absolute', bottom: PAD * 0.6, right: PAD * 0.6, fontSize: pvW * 0.08, opacity: 0.25 }}>{business.emoji}</div>
    </div>
  );

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0, background: bgColor, display: 'flex', flexDirection: isTall ? 'column-reverse' : 'row' }}>
      {textPanel}
      {photoPanel}
    </div>
  );
}
