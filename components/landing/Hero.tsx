'use client';
import Link from 'next/link';
import PosterPreview from '@/components/poster/PosterPreview';
import { getBusiness } from '@/lib/businesses';
import { GeneratedCopy } from '@/lib/types';

const gymCopy: GeneratedCopy = {
  headline: 'TRANSFORM YOUR BODY',
  subheadline: 'First month absolutely FREE — No excuses, just results',
  offer: 'ZERO JOINING FEE + 1 MONTH FREE',
  body: 'State-of-the-art equipment, expert trainers, personal diet plans.',
  urgency: 'Only 10 slots left this month!',
  cta: 'Join Now',
  caption: '',
};

const cafeCopy: GeneratedCopy = {
  headline: 'Your Perfect Morning Awaits',
  subheadline: 'Hand-crafted cold brews & artisan pastries',
  offer: 'BUY 1 GET 1 FREE on Cold Coffee',
  body: 'Fresh beans, cozy vibes, and the best baristas in town.',
  urgency: 'Today only — ends at 6 PM!',
  cta: 'Visit Us Today',
  caption: '',
};

const salonCopy: GeneratedCopy = {
  headline: 'GLOW UP THIS SEASON',
  subheadline: 'Luxury treatments at prices you\'ll love',
  offer: 'BRIDAL PACKAGE 30% OFF',
  body: 'Celebrity-style hair, skin & nail treatments for your special day.',
  urgency: 'Book before slots fill up!',
  cta: 'Book Now',
  caption: '',
};

export default function Hero() {
  const gym = getBusiness('gym');
  const cafe = getBusiness('cafe');
  const salon = getBusiness('salon');

  return (
    <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
      <div
        style={{
          display: 'inline-block',
          background: '#6C63FF18',
          border: '1px solid #6C63FF44',
          color: '#9D97FF',
          borderRadius: 20,
          padding: '6px 16px',
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 24,
          letterSpacing: 0.5,
        }}
      >
        🚀 AI-Powered Poster Maker for Local Businesses
      </div>

      <h1
        style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.08,
          margin: '0 auto 20px',
          maxWidth: 800,
          background: 'linear-gradient(135deg, #fff 40%, #9D97FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Professional Posters in 60 Seconds
      </h1>

      <p
        style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: '#888',
          lineHeight: 1.6,
          maxWidth: 620,
          margin: '0 auto 40px',
        }}
      >
        No designer needed. Just type your offer — AI writes the copy, designs the poster,
        and creates your Instagram caption.
      </p>

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
        <Link href="/create">
          <button
            style={{
              background: 'linear-gradient(135deg, #6C63FF, #9D97FF)',
              color: '#07070f',
              border: 'none',
              borderRadius: 12,
              padding: '16px 32px',
              fontSize: 17,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 32px #6C63FF44',
              letterSpacing: 0.3,
            }}
          >
            Create Your First Poster →
          </button>
        </Link>
        <a href="#how-it-works">
          <button
            style={{
              background: 'transparent',
              color: '#888',
              border: '1px solid #1a1a2e',
              borderRadius: 12,
              padding: '16px 28px',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            See How It Works
          </button>
        </a>
      </div>

      {/* Poster mockups */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ transform: 'rotate(-4deg) translateY(12px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: 10, overflow: 'hidden', opacity: 0.85 }}>
          <PosterPreview
            business={cafe}
            copy={cafeCopy}
            accent={cafe.accent}
            light={cafe.light}
            bgColor={cafe.darkBg}
            layout={cafe.layout}
            logoImage={null}
            bgImage={null}
            previewWidth={200}
            previewHeight={200}
            businessName="Brew House"
            tagline="Where every sip tells a story"
            phone="+91 98000 11111"
            location="Kozhikode"
          />
        </div>
        <div style={{ boxShadow: '0 24px 80px rgba(108,99,255,0.25)', borderRadius: 10, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
          <PosterPreview
            business={gym}
            copy={gymCopy}
            accent={gym.accent}
            light={gym.light}
            bgColor={gym.darkBg}
            layout={gym.layout}
            logoImage={null}
            bgImage={null}
            previewWidth={240}
            previewHeight={240}
            businessName="FitZone Gym"
            tagline="Train hard. Live stronger."
            phone="+91 98765 43210"
            location="Calicut"
          />
        </div>
        <div style={{ transform: 'rotate(4deg) translateY(12px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: 10, overflow: 'hidden', opacity: 0.85 }}>
          <PosterPreview
            business={salon}
            copy={salonCopy}
            accent={salon.accent}
            light={salon.light}
            bgColor={salon.darkBg}
            layout={salon.layout}
            logoImage={null}
            bgImage={null}
            previewWidth={200}
            previewHeight={200}
            businessName="Glamour Studio"
            tagline="Beauty redefined, confidence delivered"
            phone="+91 80000 55555"
            location="Thrissur"
          />
        </div>
      </div>
    </section>
  );
}
