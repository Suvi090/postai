'use client';
import { useState } from 'react';
import { BusinessProfile } from '@/lib/types';
import { getBusiness } from '@/lib/businesses';

interface SmartOffersProps {
  profile: BusinessProfile;
  onSelect: (offer: string) => void;
  accent: string;
}

export default function SmartOffers({ profile, onSelect, accent }: SmartOffersProps) {
  const [offers, setOffers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchOffers() {
    setLoading(true);
    setError('');
    try {
      const biz = getBusiness(profile.bizType);
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bizType: profile.bizType,
          bizLabel: biz.label,
          name: profile.name,
          location: profile.location,
          extraDetails: profile.extraDetails,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setOffers(Array.isArray(data) ? data : []);
    } catch {
      setError('Could not fetch suggestions. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button
        onClick={fetchOffers}
        disabled={loading}
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}44`,
          color: accent,
          borderRadius: 10,
          padding: '10px 16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: 13,
          fontWeight: 700,
          opacity: loading ? 0.6 : 1,
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {loading ? '⏳ Getting ideas...' : '💡 Get AI Offer Ideas'}
      </button>

      {error && <p style={{ color: '#FF6B6B', fontSize: 12, margin: 0 }}>{error}</p>}

      {offers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {offers.map((offer, i) => (
            <button
              key={i}
              onClick={() => onSelect(offer)}
              style={{
                background: '#07070f',
                border: '1px solid #1a1a2e',
                color: '#ccc',
                borderRadius: 8,
                padding: '9px 12px',
                cursor: 'pointer',
                fontSize: 13,
                textAlign: 'left',
                transition: 'all 0.2s',
                lineHeight: 1.4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
                e.currentTarget.style.background = `${accent}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a2e';
                e.currentTarget.style.color = '#ccc';
                e.currentTarget.style.background = '#07070f';
              }}
            >
              {offer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
