'use client';
import { LayoutType } from '@/lib/types';

interface DecoLayerProps {
  layout: LayoutType;
  accent: string;
  light: string;
  pvW: number;
  pvH: number;
}

export default function DecoLayer({ layout, accent, light, pvW, pvH }: DecoLayerProps) {
  if (layout === 'bold') {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${accent}, ${light})`,
            zIndex: 10,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${light}, ${accent})`,
            zIndex: 10,
          }}
        />
      </>
    );
  }

  if (layout === 'premium') {
    const cSize = 40;
    const thickness = 2;
    const cornerStyle = { position: 'absolute' as const, width: cSize, height: cSize, zIndex: 10 };
    return (
      <>
        <div style={{ ...cornerStyle, top: 12, left: 12, borderTop: `${thickness}px solid ${accent}`, borderLeft: `${thickness}px solid ${accent}` }} />
        <div style={{ ...cornerStyle, top: 12, right: 12, borderTop: `${thickness}px solid ${accent}`, borderRight: `${thickness}px solid ${accent}` }} />
        <div style={{ ...cornerStyle, bottom: 12, left: 12, borderBottom: `${thickness}px solid ${accent}`, borderLeft: `${thickness}px solid ${accent}` }} />
        <div style={{ ...cornerStyle, bottom: 12, right: 12, borderBottom: `${thickness}px solid ${accent}`, borderRight: `${thickness}px solid ${accent}` }} />
      </>
    );
  }

  if (layout === 'split') {
    const stripeCount = 14;
    const stripeW = pvW / stripeCount;
    return (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 52, display: 'flex', zIndex: 10, overflow: 'hidden' }}>
          {Array.from({ length: stripeCount }).map((_, i) => (
            <div key={i} style={{ width: stripeW, height: '100%', background: i % 2 === 0 ? accent : light, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 38, background: 'rgba(0,0,0,0.7)', zIndex: 10 }} />
      </>
    );
  }

  if (layout === 'promo') {
    return (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: accent, zIndex: 10 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: accent, zIndex: 10 }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: pvW * 0.8,
            height: pvW * 0.8,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
            zIndex: 2,
          }}
        />
      </>
    );
  }

  if (layout === 'clean') {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
            zIndex: 10,
          }}
        />
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 1, background: `${accent}55`, zIndex: 10 }} />
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, height: 1, background: `${accent}55`, zIndex: 10 }} />
      </>
    );
  }

  if (layout === 'centered') {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: pvW * 0.5,
            height: pvH * 0.5,
            background: `radial-gradient(ellipse at 20% 20%, ${accent}22 0%, transparent 60%)`,
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: pvW * 0.5,
            height: pvH * 0.5,
            background: `radial-gradient(ellipse at 80% 80%, ${accent}22 0%, transparent 60%)`,
            zIndex: 2,
          }}
        />
        <div style={{ position: 'absolute', top: 10, left: 16, right: 16, height: 1, background: `${accent}40`, zIndex: 10 }} />
        <div style={{ position: 'absolute', bottom: 10, left: 16, right: 16, height: 1, background: `${accent}40`, zIndex: 10 }} />
      </>
    );
  }

  return null;
}
