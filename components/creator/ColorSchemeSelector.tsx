'use client';
import { useState, useRef } from 'react';
import { COLOR_PRESETS } from '@/lib/colors';
import { ColorMode, ColorScheme } from '@/lib/types';

interface ColorSchemeSelectorProps {
  mode: ColorMode;
  onModeChange: (mode: ColorMode) => void;
  customColors: ColorScheme;
  onCustomColorsChange: (colors: ColorScheme) => void;
  selectedPreset: string;
  onPresetSelect: (id: string) => void;
  autoAccent: string;
  autoLight: string;
  autoBg: string;
}

export default function ColorSchemeSelector({
  mode,
  onModeChange,
  customColors,
  onCustomColorsChange,
  selectedPreset,
  onPresetSelect,
  autoAccent,
  autoLight,
  autoBg,
}: ColorSchemeSelectorProps) {
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const TABS = [
    { id: 'auto', label: 'Auto' },
    { id: 'preset', label: 'Presets' },
    { id: 'image', label: 'From Image' },
    { id: 'manual', label: 'Manual' },
  ] as const;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtracting(true);
    setExtractError('');
    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target?.result as string;
        const res = await fetch('/api/extract-colors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        if (!res.ok) throw new Error('Failed');
        const colors = await res.json();
        onCustomColorsChange(colors);
        onModeChange('manual');
        setExtracting(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setExtractError('Could not extract colors. Try another image.');
      setExtracting(false);
    }
  }

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, background: '#07070f', borderRadius: 10, padding: 4 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onModeChange(tab.id)}
            style={{
              flex: 1,
              padding: '7px 4px',
              borderRadius: 7,
              border: 'none',
              background: mode === tab.id ? '#1a1a2e' : 'transparent',
              color: mode === tab.id ? '#9D97FF' : '#555',
              fontWeight: mode === tab.id ? 700 : 400,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Auto */}
      {mode === 'auto' && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: autoAccent, border: '2px solid #1a1a2e' }} />
          <div style={{ width: 32, height: 32, borderRadius: 8, background: autoLight, border: '2px solid #1a1a2e' }} />
          <div style={{ width: 32, height: 32, borderRadius: 8, background: autoBg, border: '2px solid #1a1a2e' }} />
          <span style={{ color: '#555', fontSize: 12 }}>Using business type defaults</span>
        </div>
      )}

      {/* Presets */}
      {mode === 'preset' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {COLOR_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPresetSelect(p.id)}
              title={p.label}
              style={{
                borderRadius: 10,
                border: selectedPreset === p.id ? '2px solid #6C63FF' : '2px solid #1a1a2e',
                padding: 4,
                background: '#07070f',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <div style={{ height: 20, borderRadius: 6, background: `linear-gradient(135deg, ${p.accent}, ${p.light})` }} />
              <div style={{ height: 12, borderRadius: 4, background: p.bg }} />
              <div style={{ fontSize: 9, color: '#555', textAlign: 'center', marginTop: 1 }}>{p.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* From Image */}
      {mode === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ color: '#666', fontSize: 13, margin: 0 }}>
            Upload a logo or brand image — AI extracts your brand colors automatically.
          </p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={extracting}
            style={{
              background: '#07070f',
              border: '1px dashed #1a1a2e',
              color: extracting ? '#555' : '#9D97FF',
              borderRadius: 10,
              padding: '12px',
              cursor: extracting ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {extracting ? '⏳ Extracting colors...' : '📁 Upload Brand Image'}
          </button>
          {extractError && <p style={{ color: '#FF6B6B', fontSize: 12, margin: 0 }}>{extractError}</p>}
        </div>
      )}

      {/* Manual */}
      {mode === 'manual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'accent', label: 'Main Colour' },
            { key: 'light', label: 'Highlight' },
            { key: 'bg', label: 'Background' },
          ].map(({ key, label }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="color"
                value={customColors[key as keyof ColorScheme]}
                onChange={(e) => onCustomColorsChange({ ...customColors, [key]: e.target.value })}
                style={{ width: 36, height: 36, borderRadius: 8, border: '2px solid #1a1a2e', cursor: 'pointer', background: 'none' }}
              />
              <div>
                <div style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{customColors[key as keyof ColorScheme]}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
