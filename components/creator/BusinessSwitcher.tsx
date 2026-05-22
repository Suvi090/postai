'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SavedBusiness } from '@/lib/savedBusinesses';
import { getBusiness } from '@/lib/businesses';

interface Props {
  businesses: SavedBusiness[];
  active: SavedBusiness;
  onSwitch: (biz: SavedBusiness) => void;
  onEdit: () => void;
}

export default function BusinessSwitcher({ businesses, active, onSwitch, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const bt = getBusiness(active.bizType);
  const others = businesses.filter((b) => b.id !== active.id);

  const pill: React.CSSProperties = {
    background: '#07070f',
    border: '1px solid #1a1a2e',
    borderRadius: 8,
    padding: '5px 11px',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600,
    color: '#aaa',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Active business row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{bt.emoji}</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {active.name}
          </div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>
            {bt.label}{active.location ? ` · ${active.location}` : ''}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button onClick={onEdit} style={pill} title="Edit this business">✏ Edit</button>
          {businesses.length > 1 && (
            <button
              onClick={() => setOpen((o) => !o)}
              style={{ ...pill, color: open ? bt.accent : '#aaa', borderColor: open ? bt.accent + '55' : '#1a1a2e' }}
              title="Switch business"
            >
              ⇄ Switch {open ? '▴' : '▾'}
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50,
          background: '#0d0d1c', border: '1px solid #1a1a2e', borderRadius: 12,
          overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}>
          {others.length === 0 && (
            <div style={{ padding: '12px 14px', fontSize: 12, color: '#444' }}>No other businesses saved.</div>
          )}
          {others.map((biz) => {
            const b = getBusiness(biz.bizType);
            return (
              <button
                key={biz.id}
                onClick={() => { onSwitch(biz); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 14px', background: 'transparent', border: 'none',
                  borderBottom: '1px solid #1a1a2e', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff08')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 20 }}>{b.emoji}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{biz.name}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>{b.label}{biz.location ? ` · ${biz.location}` : ''}</div>
                </div>
              </button>
            );
          })}
          <Link
            href="/businesses"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', fontSize: 12, color: bt.accent,
              textDecoration: 'none', fontWeight: 600,
            }}
          >
            ＋ Manage All Businesses
          </Link>
        </div>
      )}
    </div>
  );
}
