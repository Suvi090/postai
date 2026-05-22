'use client';
import { useState, useRef, useEffect } from 'react';
import { BusinessProfile } from '@/lib/types';
import { getBusiness } from '@/lib/businesses';

interface Props {
  offer: string;
  profile: BusinessProfile;
  accent: string;
  headline: string;
  cta: string;
  onHeadlineChange: (v: string) => void;
  onCtaChange: (v: string) => void;
}

const PRESET_CTAS = [
  'Call Now', 'Order Now', 'Book Now', 'Get Started',
  'WhatsApp Us', 'Visit Us', 'Contact Us', 'Claim Offer',
  'Shop Now', 'Learn More',
];

export default function SmartSuggestions({
  offer, profile, accent,
  headline, cta,
  onHeadlineChange, onCtaChange,
}: Props) {
  const [hooks, setHooks]           = useState<string[]>([]);
  const [aiCtas, setAiCtas]         = useState<string[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [ctaOpen, setCtaOpen]       = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const dropRef                     = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setCtaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function fetchSuggestions() {
    if (!offer.trim()) return;
    setLoading(true);
    setError('');
    try {
      const biz = getBusiness(profile.bizType);
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offer,
          bizLabel:     biz.label,
          name:         profile.name,
          location:     profile.location,
          extraDetails: profile.extraDetails,
          language:     profile.language,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setHooks(data.hooks || []);
      setAiCtas(data.ctas  || []);
    } catch {
      setError('Could not fetch suggestions. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function selectCta(value: string) {
    onCtaChange(value);
    setCtaOpen(false);
    setCustomMode(false);
  }

  const canFetch   = offer.trim().length > 3;
  const displayCta = cta || 'Choose CTA…';

  /* ── shared micro-styles ── */
  const chipBase: React.CSSProperties = {
    background: '#07070f', border: '1px solid #1a1a2e',
    color: '#bbb', borderRadius: 8, padding: '6px 11px',
    cursor: 'pointer', fontSize: 12, fontWeight: 600,
    whiteSpace: 'nowrap', transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Fetch button ── */}
      <button
        onClick={fetchSuggestions}
        disabled={loading || !canFetch}
        title={!canFetch ? 'Enter your offer above first' : ''}
        style={{
          background: canFetch ? `${accent}18` : '#0d0d1c',
          border: `1px solid ${canFetch ? accent + '55' : '#1a1a2e'}`,
          color: canFetch ? accent : '#444',
          borderRadius: 10, padding: '10px 16px',
          cursor: canFetch && !loading ? 'pointer' : 'not-allowed',
          fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.2s',
        }}
      >
        {loading ? '⏳ Generating...' : '✦ Get AI Hook & CTA Ideas'}
        {!canFetch && <span style={{ fontSize: 10, opacity: 0.6 }}>enter offer first</span>}
      </button>

      {error && <p style={{ color: '#FF6B6B', fontSize: 12, margin: 0 }}>{error}</p>}

      {/* ══ HOOK / HEADLINE ═══════════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          Hook / Headline
        </span>

        {/* AI hook suggestions */}
        {hooks.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 4 }}>
            {hooks.map((h, i) => {
              const isSelected = headline === h;
              return (
                <button
                  key={i}
                  onClick={() => onHeadlineChange(isSelected ? '' : h)}
                  style={{
                    background: isSelected ? `${accent}18` : '#07070f',
                    border: `1px solid ${isSelected ? accent : '#1a1a2e'}`,
                    color: isSelected ? accent : '#bbb',
                    borderRadius: 9, padding: '9px 12px',
                    cursor: 'pointer', fontSize: 13, textAlign: 'left',
                    lineHeight: 1.4, transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                  }}
                  onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = accent + '66'; e.currentTarget.style.color = '#fff'; } }}
                  onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.color = '#bbb'; } }}
                >
                  <span>{h}</span>
                  {isSelected && <span style={{ fontSize: 10, opacity: 0.7, flexShrink: 0 }}>✓ selected</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Custom hook input — always visible */}
        <input
          value={headline}
          onChange={(e) => onHeadlineChange(e.target.value)}
          placeholder={hooks.length > 0 ? 'Pick one above or type your own…' : 'e.g. Biggest Sale of the Year!'}
          style={{
            background: '#07070f', border: `1px solid ${headline ? accent + '55' : '#1a1a2e'}`,
            color: '#fff', borderRadius: 10, padding: '10px 13px', fontSize: 13,
            width: '100%', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
          }}
          onFocus={(e)  => (e.target.style.borderColor = accent)}
          onBlur={(e)   => (e.target.style.borderColor = headline ? accent + '55' : '#1a1a2e')}
        />
      </div>

      {/* ══ CTA DROPDOWN ══════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          CTA Button
        </span>

        {/* Dropdown trigger */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setCtaOpen((o) => !o); setCustomMode(false); }}
            style={{
              width: '100%', background: '#07070f',
              border: `1px solid ${cta ? accent + '55' : '#1a1a2e'}`,
              color: cta ? '#fff' : '#555', borderRadius: 10,
              padding: '10px 13px', cursor: 'pointer', fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textAlign: 'left', transition: 'border-color 0.2s',
            }}
          >
            <span style={{ fontWeight: cta ? 600 : 400 }}>{displayCta}</span>
            <span style={{ fontSize: 10, opacity: 0.5 }}>{ctaOpen ? '▴' : '▾'}</span>
          </button>

          {ctaOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 60,
              background: '#0d0d1c', border: '1px solid #1a1a2e', borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.7)', overflow: 'hidden', maxHeight: 360, overflowY: 'auto',
            }}>

              {/* AI suggestions */}
              {aiCtas.length > 0 && (
                <div>
                  <div style={{ padding: '8px 12px 4px', fontSize: 9, color: accent, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
                    ✦ AI for Your Offer
                  </div>
                  {aiCtas.map((c, i) => (
                    <button key={i} onClick={() => selectCta(c)}
                      style={{ display: 'block', width: '100%', padding: '9px 14px', background: cta === c ? `${accent}18` : 'transparent', border: 'none', borderBottom: '1px solid #1a1a2e', color: cta === c ? accent : '#ddd', fontSize: 13, fontWeight: cta === c ? 700 : 400, cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { if (cta !== c) e.currentTarget.style.background = '#ffffff08'; }}
                      onMouseLeave={(e) => { if (cta !== c) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {cta === c && '✓ '}{c}
                    </button>
                  ))}
                </div>
              )}

              {/* Presets */}
              <div>
                <div style={{ padding: '8px 12px 4px', fontSize: 9, color: '#555', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
                  Quick Picks
                </div>
                {PRESET_CTAS.map((c) => (
                  <button key={c} onClick={() => selectCta(c)}
                    style={{ display: 'block', width: '100%', padding: '9px 14px', background: cta === c ? `${accent}18` : 'transparent', border: 'none', borderBottom: '1px solid #111', color: cta === c ? accent : '#aaa', fontSize: 13, fontWeight: cta === c ? 700 : 400, cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => { if (cta !== c) e.currentTarget.style.background = '#ffffff08'; }}
                    onMouseLeave={(e) => { if (cta !== c) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {cta === c && '✓ '}{c}
                  </button>
                ))}
              </div>

              {/* Custom type-your-own */}
              <div style={{ padding: '8px 12px 10px', borderTop: '1px solid #1a1a2e' }}>
                <div style={{ fontSize: 9, color: '#555', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
                  Type Your Own
                </div>
                <input
                  autoFocus={customMode}
                  value={customMode ? cta : ''}
                  placeholder="e.g. Grab This Deal"
                  onClick={() => setCustomMode(true)}
                  onChange={(e) => { setCustomMode(true); onCtaChange(e.target.value); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') setCtaOpen(false); }}
                  style={{
                    background: '#07070f', border: `1px solid ${accent}44`,
                    color: '#fff', borderRadius: 8, padding: '8px 11px',
                    fontSize: 13, width: '100%', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Show typed CTA below trigger when dropdown is closed */}
        {cta && !PRESET_CTAS.includes(cta) && !aiCtas.includes(cta) && (
          <p style={{ margin: 0, fontSize: 11, color: accent + 'aa' }}>Custom: "{cta}"</p>
        )}
      </div>
    </div>
  );
}
