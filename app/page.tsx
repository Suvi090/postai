import Link from 'next/link';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          borderBottom: '1px solid #1a1a2e',
          position: 'sticky',
          top: 0,
          background: 'rgba(7,7,15,0.95)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
          Post<span style={{ color: '#6C63FF' }}>AI</span>
        </span>
        <Link href="/create">
          <button
            style={{
              background: 'linear-gradient(135deg, #6C63FF, #9D97FF)',
              color: '#07070f',
              border: 'none',
              borderRadius: 10,
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.3,
            }}
          >
            Create Poster
          </button>
        </Link>
      </nav>

      <Hero />
      <HowItWorks />
      <Features />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #1a1a2e',
          padding: '28px 32px',
          textAlign: 'center',
          color: '#333',
          fontSize: 14,
        }}
      >
        <strong style={{ color: '#555' }}>PostAI</strong> · Made for local businesses · AI-powered by{' '}
        <span style={{ color: '#6C63FF' }}>Claude</span>
      </footer>
    </div>
  );
}
