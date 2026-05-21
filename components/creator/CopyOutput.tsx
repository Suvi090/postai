'use client';
import { useState } from 'react';
import { GeneratedCopy } from '@/lib/types';

interface CopyOutputProps {
  copy: GeneratedCopy;
  accent: string;
}

const FIELDS = [
  { key: 'headline', label: 'Headline' },
  { key: 'subheadline', label: 'Subheadline' },
  { key: 'offer', label: 'Offer' },
  { key: 'body', label: 'Body' },
  { key: 'urgency', label: 'Urgency' },
  { key: 'cta', label: 'CTA' },
] as const;

function CopyField({ label, value }: { label: string; value: string; accent?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{ background: '#07070f', border: '1px solid #1a1a2e', borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          {label}
        </span>
        <button
          onClick={copy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? '#69F0AE' : '#555',
            cursor: 'pointer',
            fontSize: 12,
            padding: '2px 6px',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <p style={{ margin: 0, color: '#ccc', fontSize: 14, lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

export default function CopyOutput({ copy, accent }: CopyOutputProps) {
  const [allCopied, setAllCopied] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);

  function copyAll() {
    const all = FIELDS.map((f) => `${f.label}:\n${copy[f.key]}`).join('\n\n');
    navigator.clipboard.writeText(all);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1500);
  }

  function copyCaption() {
    navigator.clipboard.writeText(copy.caption);
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 1500);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Generated Copy
        </span>
        <button
          onClick={copyAll}
          style={{
            background: `${accent}18`,
            border: `1px solid ${accent}44`,
            color: accent,
            borderRadius: 8,
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {allCopied ? '✓ Copied All' : '📋 Copy All Text'}
        </button>
      </div>

      {FIELDS.map((f) => (
        <CopyField key={f.key} label={f.label} value={copy[f.key]} />
      ))}

      {/* Instagram caption */}
      {copy.caption && (
        <div
          style={{
            background: `${accent}10`,
            border: `1px solid ${accent}33`,
            borderRadius: 12,
            padding: 16,
            marginTop: 4,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: accent, fontWeight: 700 }}>📸 Instagram Caption</span>
            <button
              onClick={copyCaption}
              style={{
                background: accent,
                border: 'none',
                color: '#000',
                borderRadius: 6,
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {captionCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p style={{ margin: 0, color: '#ccc', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{copy.caption}</p>
        </div>
      )}
    </div>
  );
}
