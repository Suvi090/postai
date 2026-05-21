'use client';
export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: '🏪',
      title: 'Tell us about your business',
      desc: 'One-time setup: enter your business name, type, location, and phone. Saved locally — never shared.',
    },
    {
      num: '02',
      icon: '✏️',
      title: 'Type your offer in plain language',
      desc: 'Just say what you want to promote. "Buy 1 get 1 free on all coffees today" is enough.',
    },
    {
      num: '03',
      icon: '🚀',
      title: 'Download & post instantly',
      desc: 'Your poster is ready with professional copy, captions, and hashtags. Share directly to Instagram.',
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: '80px 24px', borderTop: '1px solid #1a1a2e' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
            How It Works
          </h2>
          <p style={{ color: '#555', fontSize: 16, margin: 0 }}>Simple as 1-2-3. No learning curve.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: '#0d0d1c',
                border: '1px solid #1a1a2e',
                borderRadius: 16,
                padding: 28,
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: '#6C63FF',
                  fontWeight: 800,
                  letterSpacing: 3,
                  marginBottom: 16,
                }}
              >
                STEP {step.num}
              </div>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{step.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>{step.title}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
