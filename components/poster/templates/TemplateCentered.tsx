'use client';
import DecoLayer from '../DecoLayer';
import { hex2rgba, onColor, imgShadow, darkShadow, TemplateProps } from './shared';

export default function TemplateCentered({
  business, copy, accent, light, bgColor, layout,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;
  const isTall = pvH > pvW * 1.5;
  const wideScale = isWide ? 0.78 : 1;

  const HL  = pvW * 0.068 * wideScale;
  const SUB = pvW * 0.034 * wideScale;
  const OFF = pvW * 0.048 * wideScale;
  const BOD = pvW * 0.030 * wideScale;
  const URG = pvW * 0.028 * wideScale;
  const CTA = pvW * 0.034 * wideScale;
  const BIZ = pvW * 0.026 * wideScale;
  const TAG = pvW * 0.025 * wideScale;
  const CON = pvW * 0.026 * wideScale;

  const PAD = pvW * 0.10;
  const SAFE_W = '86%';
  const contactInFlow = true;
  const hasContact = !!(phone || location);
  const contactH = (!contactInFlow && hasContact) ? CON + PAD * 0.8 : 0;
  const contentH = pvH - PAD * 2 - contactH;

  const elemCount =
    (logoImage ? 1 : 0) +
    (businessName ? 1 : 0) +
    (tagline ? 1 : 0) +
    1 + // divider
    1 + // headline
    (copy?.subheadline ? 1 : 0) +
    (copy?.offer ? 1 : 0) +
    (!isWide && copy?.body ? 1 : 0) +
    (!isWide && copy?.urgency ? 1 : 0) +
    1 + // CTA
    (contactInFlow && hasContact ? 1 : 0);

  const GAP = Math.min(pvW * 0.020, Math.max(pvW * 0.008, contentH / (elemCount * 3.2)));
  const LOGO = Math.min(pvW * 0.13, contentH * 0.14, pvH * 0.10);
  const isUppercase = layout === 'bold' || layout === 'promo';
  const accentHex66 = accent + '66';

  const displayCopy = copy || {
    headline: 'Your Headline Here',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: 'Visit us today and experience the difference.',
    urgency: 'Limited time only — Act now!',
    cta: 'Contact Us',
    caption: '',
  };

  const showBody    = !isWide && !!displayCopy.body;
  const showUrgency = !isWide && !!displayCopy.urgency;

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0 }}>
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={bgImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: bgImage ? 'linear-gradient(180deg,rgba(0,0,0,.80) 0%,rgba(0,0,0,.42) 35%,rgba(0,0,0,.52) 65%,rgba(0,0,0,.88) 100%)' : `radial-gradient(ellipse at 20% 20%,${hex2rgba(accent,.18)} 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,${hex2rgba(accent,.12)} 0%,transparent 50%)` }} />
      <DecoLayer layout={layout} accent={accent} light={light} pvW={pvW} pvH={pvH} />

      <div style={{ position: 'absolute', top: PAD, left: PAD, right: PAD, bottom: contactH + PAD * 0.4, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: GAP, textAlign: 'center', overflow: 'hidden' }}>
        {logoImage && (
          <div style={{ width: LOGO, height: LOGO, borderRadius: '50%', border: `2px solid ${accent}`, overflow: 'hidden', flexShrink: 0 }}>
            <img src={logoImage} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        {businessName && (
          <div style={{ fontSize: BIZ, color: accent, letterSpacing: Math.max(1, pvW * 0.006), textTransform: 'uppercase', fontWeight: 600, textShadow: '0 1px 8px rgba(0,0,0,.8)', lineHeight: 1.2, maxWidth: SAFE_W, wordBreak: 'break-word', flexShrink: 0 }}>
            {businessName}
          </div>
        )}
        {tagline && (
          <div style={{ fontSize: TAG, color: bgImage ? 'rgba(255,255,255,.75)' : light, lineHeight: 1.3, maxWidth: SAFE_W, letterSpacing: 0.3, flexShrink: 0, wordBreak: 'break-word', textShadow: '0 1px 6px rgba(0,0,0,.7)' }}>
            {tagline}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: GAP * 0.6, width: SAFE_W, flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${accent})`, maxWidth: 50, marginLeft: 'auto' }} />
          <span style={{ fontSize: pvW * 0.036, color: accent, lineHeight: 1 }}>{business.emoji}</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent},transparent)`, maxWidth: 50 }} />
        </div>
        <div style={{ fontSize: HL, fontWeight: 900, color: '#fff', lineHeight: 1.15, textShadow: bgImage ? imgShadow : darkShadow, textTransform: isUppercase ? 'uppercase' : 'none', wordBreak: 'break-word', maxWidth: SAFE_W, flexShrink: 1 }}>
          {displayCopy.headline}
        </div>
        {displayCopy.subheadline && (
          <div style={{ fontSize: SUB, color: bgImage ? 'rgba(255,255,255,.92)' : light, lineHeight: 1.4, maxWidth: SAFE_W, textShadow: darkShadow, flexShrink: 1, wordBreak: 'break-word' }}>
            {displayCopy.subheadline}
          </div>
        )}
        {displayCopy.offer && (
          <div style={{ background: layout === 'promo' ? accent : 'rgba(0,0,0,0.88)', border: `2px solid ${accent}`, borderRadius: 10, width: SAFE_W, padding: `${GAP}px ${GAP * 1.4}px`, color: layout === 'promo' ? onColor(accent) : '#ffffff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: Math.max(.5, pvW * .003), fontSize: OFF, boxShadow: `0 0 0 1px ${hex2rgba(accent,0.20)}, 0 4px 20px ${accentHex66}`, wordBreak: 'break-word', lineHeight: 1.3, flexShrink: 1, textAlign: 'center' }}>
            {displayCopy.offer}
          </div>
        )}
        {showBody && (
          <div style={{ fontSize: BOD, color: bgImage ? 'rgba(255,255,255,.88)' : 'rgba(255,255,255,.8)', lineHeight: 1.55, maxWidth: SAFE_W, textShadow: darkShadow, wordBreak: 'break-word', flexShrink: 1 }}>
            {displayCopy.body}
          </div>
        )}
        {showUrgency && (
          <div style={{ fontSize: URG, color: '#FF6B6B', fontWeight: 700, textTransform: 'uppercase', textShadow: '0 1px 8px rgba(255,107,107,.4)', maxWidth: SAFE_W, wordBreak: 'break-word', flexShrink: 0 }}>
            ⚡ {displayCopy.urgency}
          </div>
        )}
        {displayCopy.cta && (
          <div style={{ background: `linear-gradient(135deg,${accent},${light})`, color: onColor(accent), padding: `${GAP * .85}px ${GAP * 2}px`, borderRadius: 8, fontWeight: 900, letterSpacing: Math.max(1, pvW * .004), textTransform: 'uppercase', fontSize: CTA, boxShadow: `0 4px 24px ${accentHex66}`, maxWidth: SAFE_W, minWidth: '40%', flexShrink: 0, wordBreak: 'break-word' }}>
            {displayCopy.cta}
          </div>
        )}
        {contactInFlow && hasContact && (
          <div style={{ fontSize: CON, color: 'rgba(255,255,255,.85)', letterSpacing: .4, lineHeight: 1.6, wordBreak: 'break-word', maxWidth: SAFE_W, flexShrink: 0, textShadow: darkShadow, fontWeight: 500 }}>
            {phone}{phone && location && '  ·  '}{location}
          </div>
        )}
      </div>

    </div>
  );
}
