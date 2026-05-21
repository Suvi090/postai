'use client';
import { SIZES } from '@/lib/sizes';

interface SizeSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  accent: string;
}

export default function SizeSelector({ selectedId, onSelect, accent }: SizeSelectorProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {SIZES.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            background: selectedId === s.id ? `${accent}20` : '#07070f',
            border: `1px solid ${selectedId === s.id ? accent : '#1a1a2e'}`,
            color: selectedId === s.id ? accent : '#666',
            borderRadius: 8,
            padding: '7px 12px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: selectedId === s.id ? 700 : 400,
            transition: 'all 0.2s',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
