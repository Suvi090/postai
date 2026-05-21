'use client';
import Link from 'next/link';
import { BUSINESSES } from '@/lib/businesses';

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI Writes Everything',
    desc: 'Headline, offer copy, body text, Instagram caption, and 6 hashtags — all generated in seconds.',
    color: '#6C63FF',
  },
  {
    icon: '🎨',
    title: '20 Business Types',
    desc: 'Each business type has its own visual style, tone, and colour palette. Not generic.',
    color: '#E91E8C',
  },
  {
    icon: '🇮🇳',
    title: 'Indian Languages',
    desc: 'Generate copy in Malayalam, Tamil, Hindi, or English. Natural conversational tone, not translation.',
    color: '#FF9800',
  },
  {
    icon: '⚡',
    title: 'Smart Offer Ideas',
    desc: 'Stuck on what to promote? AI suggests 6 proven offer types based on your business.',
    color: '#00E676',
  },
];

export default function Features() {
  return (
    <>
      {/* Feature cards */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid #1a1a2e' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
              Why PostAI?
            </h2>
            <p style={{ color: '#555', fontSize: 16, margin: 0 }}>
              Built specifically for Indian local businesses. Not a generic tool.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#0d0d1c',
                  border: '1px solid #1a1a2e',
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business types grid */}
      <section style={{ padding: '60px 24px 80px', borderTop: '1px solid #1a1a2e' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: '#fff', textAlign: 'center', margin: '0 0 40px' }}>
            20 Business Types, All Covered
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
            {BUSINESSES.map((biz) => (
              <Link key={biz.id} href="/create" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#0d0d1c',
                    border: '1px solid #1a1a2e',
                    borderRadius: 12,
                    padding: '14px 10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = biz.accent;
                    (e.currentTarget as HTMLDivElement).style.background = `${biz.accent}10`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#1a1a2e';
                    (e.currentTarget as HTMLDivElement).style.background = '#0d0d1c';
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{biz.emoji}</div>
                  <div style={{ fontSize: 11, color: '#888', lineHeight: 1.3 }}>{biz.label}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/create">
              <button
                style={{
                  background: 'linear-gradient(135deg, #6C63FF, #9D97FF)',
                  color: '#07070f',
                  border: 'none',
                  borderRadius: 12,
                  padding: '16px 36px',
                  fontSize: 17,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 32px #6C63FF44',
                }}
              >
                Start Creating for Free →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
