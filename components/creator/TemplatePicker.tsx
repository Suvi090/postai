'use client';
import { TemplateId } from '@/lib/types';

const TEMPLATES: { id: TemplateId; label: string; icon: string; desc: string }[] = [
  { id: 'centered',  label: 'Centered',  icon: '◈', desc: 'Classic centered layout' },
  { id: 'impact',    label: 'Impact',    icon: '▰', desc: 'Giant headline + accent strip' },
  { id: 'split',     label: 'Split',     icon: '◧', desc: 'Text left, photo right' },
  { id: 'minimal',   label: 'Minimal',   icon: '◻', desc: 'Premium whitespace' },
  { id: 'cafe',      label: 'Vintage',   icon: '◉', desc: 'Striped top, circle frame' },
  { id: 'promo',     label: 'Promo',     icon: '▣', desc: 'Giant offer dominates' },
  { id: 'editorial', label: 'Editorial', icon: '▤', desc: 'Newspaper hierarchy' },
  { id: 'neon',      label: 'Neon',      icon: '◈', desc: 'Dark with glow effects' },
];

interface Props {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
  accent: string;
}

export default function TemplatePicker({ selected, onSelect, accent }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {TEMPLATES.map((t) => {
        const isActive = selected === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              background: isActive ? `${accent}18` : '#07070f',
              border: `1px solid ${isActive ? accent : '#1a1a2e'}`,
              borderRadius: 8,
              padding: '9px 10px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: isActive ? accent : '#555', lineHeight: 1 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: isActive ? accent : '#aaa', fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase' }}>
                {t.label}
              </span>
            </div>
            <div style={{ fontSize: 10, color: '#444', lineHeight: 1.3 }}>{t.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
