'use client';
import DecoLayer from './DecoLayer';
import { BusinessType, GeneratedCopy, LayoutType } from '@/lib/types';

interface PosterPreviewProps {
  business: BusinessType;
  copy: GeneratedCopy | null;
  accent: string;
  light: string;
  bgColor: string;
  layout: LayoutType;
  logoImage: string | null;
  bgImage: string | null;
  previewWidth: number;
  previewHeight: number;
  businessName: string;
  tagline?: string;
  phone: string;
  location: string;
}

function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function PosterPreview({
  business,
  copy,
  accent,
  light,
  bgColor,
  layout,
  logoImage,
  bgImage,
  previewWidth,
  previewHeight,
  businessName,
  tagline,
  phone,
  location,
}: PosterPreviewProps) {
  const pvW = previewWidth;
  const pvH = previewHeight;
  const isWide = pvW > pvH;     // e.g. Facebook feed
  const isTall = pvH > pvW * 1.5; // e.g. Story / A4

  // --- Adaptive sizing ---
  const wideScale = isWide ? 0.78 : 1;

  const HL  = pvW * 0.068 * wideScale;
  const SUB = pvW * 0.034 * wideScale;
  const OFF = pvW * 0.048 * wideScale;
  const BOD = pvW * 0.030 * wideScale;
  const URG = pvW * 0.028 * wideScale;
  const CTA = pvW * 0.034 * wideScale;
  const BIZ = pvW * 0.026 * wideScale;
  const TAG = pvW * 0.025 * wideScale;
  // Contact: for tall/narrow posters pvW is small so use height-based minimum
  const CON = isTall
    ? Math.max(pvH * 0.022, pvW * 0.030)   // tall: readable, in flow
    : pvW * 0.024 * wideScale;              // square/wide: pinned at bottom

  // Safe area padding — uniform on all sides
  const PAD = pvW * 0.10;
  const SAFE_W = '86%';

  // For tall formats: contact is IN the flex flow (right below CTA)
  // For square/wide: contact is pinned absolutely at the bottom
  const contactInFlow = isTall;
  const contactH = (!contactInFlow && (phone || location)) ? CON + PAD * 0.8 : 0;

  // Available vertical space for main content
  const contentH = pvH - PAD * 2 - contactH;

  const hasContact = !!(phone || location);

  // How many stacking elements are visible
  const elemCount =
    (logoImage ? 1 : 0) +
    (businessName ? 1 : 0) + // biz name — only if user set it
    (tagline ? 1 : 0) +      // tagline
    1 + // divider
    1 + // headline
    (copy?.subheadline ? 1 : 0) +
    (copy?.offer ? 1 : 0) +
    (!isWide && copy?.body ? 1 : 0) +
    (!isWide && copy?.urgency ? 1 : 0) +
    1 + // CTA
    (contactInFlow && hasContact ? 1 : 0); // contact in flow for tall

  // Adaptive gap: never let gap × elements exceed available height
  const GAP = Math.min(
    pvW * 0.020,
    Math.max(pvW * 0.008, contentH / (elemCount * 3.2))
  );

  // Logo size capped to both width and available height
  const LOGO = Math.min(pvW * 0.13, contentH * 0.14, pvH * 0.10);

  const isUppercase = layout === 'bold' || layout === 'promo';
  const accentHex66 = accent + '66';

  const defaultCopy: GeneratedCopy = {
    headline: tagline || 'Special Offer',
    subheadline: 'Premium quality, unbeatable prices',
    offer: business.exampleOffer,
    body: 'Visit us today and experience the difference.',
    urgency: 'Limited time only — Act now!',
    cta: 'Contact Us',
    caption: '',
  };

  const displayCopy = copy || defaultCopy;

  // For wide/short formats skip body & urgency to avoid overflow
  const showBody    = !isWide && !!displayCopy.body;
  const showUrgency = !isWide && !!displayCopy.urgency;

  return (
    <div
      style={{
        width: pvW,
        height: pvH,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Background */}
      {bgImage ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={bgImage}
            alt="background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: bgColor, zIndex: 0 }} />
      )}

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: bgImage
            ? 'linear-gradient(180deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.42) 35%, rgba(0,0,0,0.52) 65%, rgba(0,0,0,0.88) 100%)'
            : `radial-gradient(ellipse at 20% 20%, ${hex2rgba(accent, 0.18)} 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${hex2rgba(accent, 0.12)} 0%, transparent 50%)`,
        }}
      />

      {/* Decorations */}
      <DecoLayer layout={layout} accent={accent} light={light} pvW={pvW} pvH={pvH} />

      {/* Main content — vertically centered, leaves room for contact footer */}
      <div
        style={{
          position: 'absolute',
          top: PAD,
          left: PAD,
          right: PAD,
          bottom: contactH + PAD * 0.4,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: GAP,
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        {logoImage && (
          <div
            style={{
              width: LOGO,
              height: LOGO,
              borderRadius: '50%',
              border: `2px solid ${accent}`,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img src={logoImage} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Business name — only shown when user has set one */}
        {businessName && (
          <div
            style={{
              fontSize: BIZ,
              color: accent,
              letterSpacing: Math.max(1, pvW * 0.006),
              textTransform: 'uppercase',
              fontWeight: 600,
              textShadow: `0 1px 8px rgba(0,0,0,0.8)`,
              lineHeight: 1.2,
              maxWidth: SAFE_W,
              wordBreak: 'break-word',
              flexShrink: 0,
            }}
          >
            {businessName}
          </div>
        )}

        {/* Tagline */}
        {tagline && (
          <div
            style={{
              fontSize: TAG,
              color: bgImage ? 'rgba(255,255,255,0.75)' : light,
              lineHeight: 1.3,
              maxWidth: SAFE_W,
              letterSpacing: 0.3,
              flexShrink: 0,
              wordBreak: 'break-word',
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            {tagline}
          </div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: GAP * 0.6, width: SAFE_W, flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${accent})`, maxWidth: 50, marginLeft: 'auto' }} />
          <span style={{ fontSize: pvW * 0.036, color: accent, lineHeight: 1 }}>{business.emoji}</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent}, transparent)`, maxWidth: 50 }} />
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: HL,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            textShadow: '0 2px 20px rgba(0,0,0,0.99)',
            textTransform: isUppercase ? 'uppercase' : 'none',
            wordBreak: 'break-word',
            maxWidth: SAFE_W,
            flexShrink: 1,
          }}
        >
          {displayCopy.headline}
        </div>

        {/* Subheadline */}
        {displayCopy.subheadline && (
          <div
            style={{
              fontSize: SUB,
              color: bgImage ? 'rgba(255,255,255,0.92)' : light,
              lineHeight: 1.4,
              maxWidth: SAFE_W,
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
              flexShrink: 1,
              wordBreak: 'break-word',
            }}
          >
            {displayCopy.subheadline}
          </div>
        )}

        {/* Offer box */}
        {displayCopy.offer && (
          <div
            style={{
              background: layout === 'promo' ? accent : `linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.45))`,
              border: `2.5px solid ${accent}`,
              borderRadius: 10,
              backdropFilter: 'blur(10px)',
              width: SAFE_W,
              padding: `${GAP * 1.0}px ${GAP * 1.4}px`,
              color: layout === 'promo' ? bgColor : accent,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: Math.max(0.5, pvW * 0.003),
              fontSize: OFF,
              textShadow: layout === 'promo' ? 'none' : `0 0 18px ${accentHex66}, 0 2px 8px rgba(0,0,0,0.6)`,
              boxShadow: `0 4px 20px ${accentHex66}, inset 0 1px 0 rgba(255,255,255,0.08)`,
              wordBreak: 'break-word',
              lineHeight: 1.3,
              flexShrink: 1,
            }}
          >
            {displayCopy.offer}
          </div>
        )}

        {/* Body copy — hidden on wide/short */}
        {showBody && (
          <div
            style={{
              fontSize: BOD,
              color: bgImage ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.8)',
              lineHeight: 1.55,
              maxWidth: SAFE_W,
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              wordBreak: 'break-word',
              flexShrink: 1,
            }}
          >
            {displayCopy.body}
          </div>
        )}

        {/* Urgency — hidden on wide/short */}
        {showUrgency && (
          <div
            style={{
              fontSize: URG,
              color: '#FF6B6B',
              fontWeight: 700,
              textTransform: 'uppercase',
              textShadow: '0 1px 8px rgba(255,107,107,0.4)',
              maxWidth: SAFE_W,
              wordBreak: 'break-word',
              flexShrink: 0,
            }}
          >
            ⚡ {displayCopy.urgency}
          </div>
        )}

        {/* CTA button */}
        {displayCopy.cta && (
          <div
            style={{
              background: `linear-gradient(135deg, ${accent}, ${light})`,
              color: bgColor,
              padding: `${GAP * 0.85}px ${GAP * 2}px`,
              borderRadius: 8,
              fontWeight: 900,
              letterSpacing: Math.max(1, pvW * 0.004),
              textTransform: 'uppercase',
              fontSize: CTA,
              boxShadow: `0 4px 24px ${accentHex66}`,
              maxWidth: SAFE_W,
              minWidth: '40%',
              flexShrink: 0,
              wordBreak: 'break-word',
            }}
          >
            {displayCopy.cta}
          </div>
        )}

        {/* Contact IN FLOW for tall formats (Story / A4) — just below CTA */}
        {contactInFlow && hasContact && (
          <div
            style={{
              fontSize: CON,
              color: 'rgba(255,255,255,0.70)',
              letterSpacing: 0.5,
              lineHeight: 1.5,
              wordBreak: 'break-word',
              maxWidth: SAFE_W,
              flexShrink: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.7)',
            }}
          >
            {phone && `📞 ${phone}`}
            {phone && location && `  ·  `}
            {location && `📍 ${location}`}
          </div>
        )}
      </div>

      {/* Contact footer — pinned to bottom for square / wide formats */}
      {!contactInFlow && (phone || location) && (
        <div
          style={{
            position: 'absolute',
            bottom: PAD * 0.6,
            left: PAD,
            right: PAD,
            zIndex: 21,
            textAlign: 'center',
            fontSize: CON,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: 0.3,
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}
        >
          {phone && location
            ? `📞 ${phone}  ·  📍 ${location}`
            : phone
              ? `📞 ${phone}`
              : `📍 ${location}`}
        </div>
      )}
    </div>
  );
}
