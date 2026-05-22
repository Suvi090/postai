'use client';
import { hex2rgba, TemplateProps } from './shared';

// MINIMAL — premium whitespace, only the essentials, nothing competes
export default function TemplateMinimal({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const PAD = pvW * 0.12;

  const HL  = pvW * 0.082;
  const CTA = pvW * 0.026;
  const BIZ = pvW * 0.018;
  const CON = pvW * 0.017;
  const OFF = pvW * 0.030;

  const displayCopy = copy || {
    headline: tagline || 'Special Offer',
    subheadline: '',
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
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}
      {/* Very light overlay — minimal means breathing room */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: bgImage ? 'rgba(0,0,0,.72)' : 'transparent' }} />

      {/* Thin accent line at very top */}
      <div style={{ position: 'absolute', top: 0, left: PAD, right: PAD, height: 2, background: `linear-gradient(90deg,transparent,${accent},transparent)`, zIndex: 10 }} />

      {/* Logo — top left */}
      {logoImage && (
        <div style={{ position: 'absolute', top: PAD * 0.7, left: PAD, zIndex: 20 }}>
          <img src={logoImage} alt="logo" style={{ width: pvW * 0.09, height: pvW * 0.09, borderRadius: '50%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Business name — top */}
      <div style={{ position: 'absolute', top: PAD * 0.72, left: 0, right: 0, zIndex: 20, textAlign: 'center', fontSize: BIZ, color: accent, textTransform: 'uppercase', letterSpacing: Math.max(2, pvW * 0.008), fontWeight: 500 }}>
        {businessName || business.label}
      </div>

      {/* Main content — vertically centered */}
      <div style={{ position: 'absolute', top: pvH * 0.22, bottom: pvH * 0.22, left: PAD, right: PAD, zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.5 }}>
        {/* Thin rule */}
        <div style={{ width: pvW * 0.08, height: 1, background: `${accent}88` }} />

        {/* Headline — large, airy */}
        <div style={{ fontSize: HL, fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: -0.3, wordBreak: 'break-word', maxWidth: '88%' }}>
          {displayCopy.headline}
        </div>

        {/* Offer — subtle, not boxed */}
        {displayCopy.offer && (
          <div style={{ fontSize: OFF, color: light, fontWeight: 600, letterSpacing: 0.5, lineHeight: 1.3, wordBreak: 'break-word', maxWidth: '90%' }}>
            {displayCopy.offer}
          </div>
        )}

        {/* Spacer + CTA inline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.5, marginTop: PAD * 0.2 }}>
          <div style={{ height: 1, width: pvW * 0.06, background: `${accent}66` }} />
          <div style={{ fontSize: CTA, color: accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>
            {displayCopy.cta}
          </div>
          <div style={{ fontSize: CTA * 0.8, color: accent }}>→</div>
        </div>
      </div>

      {/* Contact — bottom, very subtle */}
      {(phone || location) && (
        <div style={{ position: 'absolute', bottom: PAD * 0.65, left: PAD, right: PAD, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: CON, color: `${hex2rgba(accent, 0.5)}`, letterSpacing: 0.5 }}>
            {phone && `${phone}`}{phone && location && '  ·  '}{location && `${location}`}
          </div>
          <div style={{ fontSize: pvW * 0.025, opacity: 0.3 }}>{business.emoji}</div>
        </div>
      )}

      {/* Thin accent line at very bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: PAD, right: PAD, height: 2, background: `linear-gradient(90deg,${accent},transparent)`, zIndex: 10 }} />
    </div>
  );
}
