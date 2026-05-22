'use client';
import { hex2rgba, onColor, darkShadow, TemplateProps } from './shared';

// SPLIT — text panel left / photo panel right (stacks vertically on tall formats)
export default function TemplateSplit({
  business, copy, accent, light, bgColor,
  logoImage, bgImage, previewWidth, previewHeight,
  businessName, tagline, phone, location,
}: TemplateProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isTall = pvH > pvW * 1.2;
  const isWide = pvW > pvH;
  const sc    = isWide ? 0.82 : 1;

  const PAD  = pvW * 0.07;
  const HL   = pvW * (isTall ? 0.070 : 0.062) * sc;
  const SUB  = pvW * 0.028 * sc;
  const OFF  = pvW * 0.032 * sc;
  const CTA  = pvW * 0.026 * sc;
  const BIZ  = pvW * 0.020 * sc;
  const CON  = pvW * 0.026 * sc;

  const onAccent = onColor(accent);

  const dc = copy || {
    headline:    'Your Headline Here',
    subheadline: 'Premium quality, unbeatable prices',
    offer:       business.exampleOffer,
    body: '', urgency: '',
    cta:         'Contact Us',
    caption: '',
  };

  const textPanel = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: PAD * 0.42, padding: PAD, background: isTall ? 'rgba(0,0,0,.60)' : 'transparent', ...(isTall ? { height: '56%', width: '100%' } : { width: '52%', height: '100%' }), boxSizing: 'border-box', position: 'relative', zIndex: 20 }}>
      {/* Biz name + logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: PAD * 0.4, minWidth: 0 }}>
        {logoImage && <img src={logoImage} alt="" style={{ width: pvW * 0.08, height: pvW * 0.08, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0 }} />}
        <div style={{ minWidth: 0 }}>
          {businessName && <div style={{ fontSize: BIZ, color: accent, textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1.5, textShadow: darkShadow, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{businessName}</div>}
          {tagline && <div style={{ fontSize: BIZ * 0.82, color: 'rgba(255,255,255,.50)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tagline}</div>}
        </div>
      </div>

      {/* Accent rule */}
      <div style={{ width: pvW * 0.11, height: 2.5, background: `linear-gradient(90deg, ${accent}, ${light})`, borderRadius: 2, flexShrink: 0 }} />

      {/* Headline */}
      <div style={{ fontSize: HL, fontWeight: 900, color: '#ffffff', lineHeight: 1.10, textShadow: darkShadow, wordBreak: 'break-word' }}>
        {dc.headline}
      </div>

      {dc.subheadline && !isWide && (
        <div style={{ fontSize: SUB, color: 'rgba(255,255,255,.72)', lineHeight: 1.40, wordBreak: 'break-word' }}>
          {dc.subheadline}
        </div>
      )}

      {/* Offer pill */}
      {dc.offer && (
        <div style={{ border: `1.5px solid ${accent}`, borderRadius: 8, padding: `${PAD * 0.38}px ${PAD * 0.65}px`, fontSize: OFF, fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.3, lineHeight: 1.25, wordBreak: 'break-word', background: 'rgba(0,0,0,0.82)', textShadow: darkShadow }}>
          {dc.offer}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: `linear-gradient(135deg, ${accent}, ${light})`, color: onAccent, padding: `${PAD * 0.42}px ${PAD * 1.1}px`, borderRadius: 7, fontWeight: 900, fontSize: CTA, textTransform: 'uppercase', letterSpacing: 1, boxShadow: `0 3px 16px ${hex2rgba(accent, 0.40)}`, flexShrink: 0 }}>
        {dc.cta}
      </div>

      {/* Contact */}
      {(phone || location) && (
        <div style={{ fontSize: CON, color: 'rgba(255,255,255,.85)', lineHeight: 1.5, wordBreak: 'break-word', fontWeight: 500 }}>
          {phone}{phone && location && '  ·  '}{location}
        </div>
      )}
    </div>
  );

  const photoPanel = (
    <div style={{ ...(isTall ? { height: '44%', width: '100%' } : { width: '48%', height: '100%' }), position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      {bgImage ? (
        /* background-image avoids html2canvas objectFit:cover rendering bug on sub-panels */
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, ${accent} 0%, ${light} 45%, ${hex2rgba(accent, 0.50)} 100%)` }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: bgImage ? 'linear-gradient(135deg, rgba(0,0,0,.25) 0%, transparent 60%)' : `radial-gradient(ellipse at 65% 35%, rgba(255,255,255,.12) 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', bottom: PAD * 0.5, right: PAD * 0.5, fontSize: pvW * 0.08, opacity: 0.20 }}>{business.emoji}</div>
    </div>
  );

  return (
    <div style={{ width: pvW, height: pvH, position: 'relative', overflow: 'hidden', borderRadius: 8, fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", flexShrink: 0, background: bgColor, display: 'flex', flexDirection: isTall ? 'column-reverse' : 'row' }}>
      {textPanel}
      {photoPanel}
    </div>
  );
}
