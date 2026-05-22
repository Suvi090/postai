'use client';
import { useState } from 'react';
import { BUSINESSES } from '@/lib/businesses';
import { BusinessProfile } from '@/lib/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface BusinessSetupProps {
  onSave: (profile: BusinessProfile) => void;
  initial?: BusinessProfile | null;
}

const LANGUAGES = [
  { id: 'english', label: 'English' },
  { id: 'malayalam', label: 'Malayalam' },
  { id: 'tamil', label: 'Tamil' },
  { id: 'hindi', label: 'Hindi' },
] as const;

const defaultProfile: BusinessProfile = {
  name: '',
  bizType: 'cafe',
  phone: '',
  location: '',
  tagline: '',
  extraDetails: '',
  language: 'english',
};

export default function BusinessSetup({ onSave, initial }: BusinessSetupProps) {
  const [profile, setProfile] = useState<BusinessProfile>(initial || defaultProfile);
  const [error, setError] = useState('');

  const update = (key: keyof BusinessProfile, val: string) =>
    setProfile((p) => ({ ...p, [key]: val }));

  function handleSave() {
    if (!profile.name.trim()) { setError('Business name is required'); return; }
    setError('');
    onSave(profile);
  }

  const selectedBiz = BUSINESSES.find((b) => b.id === profile.bizType) || BUSINESSES[0];

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎨</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>
          Set Up Your Business Profile
        </h1>
        <p style={{ color: '#666', marginTop: 8, fontSize: 14 }}>
          One-time setup. Your info is saved locally and never uploaded.
        </p>
      </div>

      <div
        style={{
          background: '#0d0d1c',
          border: '1px solid #1a1a2e',
          borderRadius: 16,
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Business Type */}
        <div>
          <div style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
            Business Type
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {BUSINESSES.map((b) => (
              <button
                key={b.id}
                onClick={() => update('bizType', b.id)}
                style={{
                  background: profile.bizType === b.id ? `${b.accent}22` : '#07070f',
                  border: `1px solid ${profile.bizType === b.id ? b.accent : '#1a1a2e'}`,
                  color: profile.bizType === b.id ? b.accent : '#888',
                  borderRadius: 10,
                  padding: '8px 4px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.2s',
                  fontSize: 11,
                  fontWeight: profile.bizType === b.id ? 700 : 400,
                }}
              >
                <span style={{ fontSize: 20 }}>{b.emoji}</span>
                <span style={{ lineHeight: 1.2, textAlign: 'center' }}>{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Input label="Business Name" value={profile.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Arjun's Café" />
        <Input label="Phone Number" value={profile.phone} onChange={(e) => update('phone', e.target.value)} placeholder="e.g. +91 98765 43210" type="tel" />
        <Input label="Location / Area (optional)" value={profile.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Kozhikode, Kerala · leave blank for online businesses" />
        <Input label="Tagline (optional)" value={profile.tagline} onChange={(e) => update('tagline', e.target.value)} placeholder="e.g. Fresh brews, warm vibes" />
        <Textarea label="Extra Details (optional)" value={profile.extraDetails} onChange={(e) => update('extraDetails', e.target.value)} placeholder="Any special info: timings, USP, awards..." style={{ minHeight: 70 }} />

        {/* Language */}
        <div>
          <div style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
            Language for AI Copy
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => update('language', lang.id)}
                style={{
                  background: profile.language === lang.id ? '#6C63FF22' : '#07070f',
                  border: `1px solid ${profile.language === lang.id ? '#6C63FF' : '#1a1a2e'}`,
                  color: profile.language === lang.id ? '#9D97FF' : '#666',
                  borderRadius: 8,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: profile.language === lang.id ? 700 : 400,
                  transition: 'all 0.2s',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ color: '#FF6B6B', fontSize: 13, margin: 0 }}>{error}</p>}

        <button
          onClick={handleSave}
          style={{
            background: `linear-gradient(135deg, ${selectedBiz.accent}, ${selectedBiz.light})`,
            color: selectedBiz.darkBg,
            border: 'none',
            borderRadius: 12,
            padding: '14px 24px',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            letterSpacing: 0.5,
            boxShadow: `0 4px 24px ${selectedBiz.accent}44`,
            transition: 'all 0.2s',
          }}
        >
          Save & Start Creating →
        </button>
      </div>
    </div>
  );
}
