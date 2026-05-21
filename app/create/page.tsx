'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BusinessProfile, GeneratedCopy, ColorMode, ColorScheme } from '@/lib/types';
import { getBusiness } from '@/lib/businesses';
import { getSize } from '@/lib/sizes';
import { COLOR_PRESETS } from '@/lib/colors';
import BusinessSetup from '@/components/creator/BusinessSetup';
import SmartOffers from '@/components/creator/SmartOffers';
import ColorSchemeSelector from '@/components/creator/ColorSchemeSelector';
import ImageUpload from '@/components/creator/ImageUpload';
import SizeSelector from '@/components/creator/SizeSelector';
import CopyOutput from '@/components/creator/CopyOutput';
import PosterPreview from '@/components/poster/PosterPreview';
import Textarea from '@/components/ui/Textarea';

const PROFILE_KEY = 'postai_profile';

export default function CreatePage() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [offer, setOffer] = useState('');
  const [colorMode, setColorMode] = useState<ColorMode>('auto');
  const [selectedPreset, setSelectedPreset] = useState('black-gold');
  const [customColors, setCustomColors] = useState<ColorScheme>({ accent: '#6C63FF', light: '#9D97FF', bg: '#07070f' });
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState('instagram');
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      } else {
        setShowSetup(true);
      }
    } catch {
      setShowSetup(true);
    }
  }, []);

  function saveProfile(p: BusinessProfile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfile(p);
    setShowSetup(false);
  }

  const biz = profile ? getBusiness(profile.bizType) : getBusiness('cafe');
  const size = getSize(sizeId);

  function getColors(): ColorScheme {
    if (colorMode === 'auto') return { accent: biz.accent, light: biz.light, bg: biz.darkBg };
    if (colorMode === 'preset') {
      const p = COLOR_PRESETS.find((c) => c.id === selectedPreset);
      return p ? { accent: p.accent, light: p.light, bg: p.bg } : { accent: biz.accent, light: biz.light, bg: biz.darkBg };
    }
    return customColors;
  }

  const colors = getColors();

  async function handleGenerate() {
    if (!offer.trim()) { setGenerateError('Please enter your offer first.'); return; }
    if (!profile) return;
    setIsGenerating(true);
    setGenerateError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offer,
          profile,
          language: profile.language,
          bizTone: biz.tone,
          bizLayout: biz.layout,
        }),
      });
      if (!res.ok) throw new Error('Generation failed');
      const copy = await res.json();
      setGeneratedCopy(copy);
    } catch {
      setGenerateError('Something went wrong. Check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleDownload() {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(posterRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: size.width / size.previewWidth, // scale up to actual poster resolution
        logging: false,
      });
      const link = document.createElement('a');
      const filename = `${profile?.name || 'poster'}-${size.label.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  }

  if (showSetup || !profile) {
    return (
      <div style={{ minHeight: '100vh', background: '#07070f' }}>
        <BusinessSetup onSave={saveProfile} initial={profile} />
      </div>
    );
  }

  const sectionLabel: React.CSSProperties = {
    fontSize: 10,
    color: '#9D97FF',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: 10,
    display: 'block',
  };

  const card: React.CSSProperties = {
    background: '#0d0d1c',
    border: '1px solid #1a1a2e',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#fff' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          borderBottom: '1px solid #1a1a2e',
          position: 'sticky',
          top: 0,
          background: '#07070f',
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
            Post<span style={{ color: biz.accent }}>AI</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: `${biz.accent}18`,
              border: `1px solid ${biz.accent}44`,
              color: biz.accent,
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {biz.emoji} {profile.name || biz.label}
          </div>
          <button
            onClick={() => setShowSetup(true)}
            style={{
              background: '#0d0d1c',
              border: '1px solid #1a1a2e',
              color: '#666',
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Edit Profile
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          gap: 0,
          minHeight: 'calc(100vh - 57px)',
        }}
        className="creator-grid"
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            borderRight: '1px solid #1a1a2e',
            overflowY: 'auto',
            padding: '20px 20px',
            maxHeight: 'calc(100vh - 57px)',
          }}
        >
          {/* Smart Offers */}
          <div style={card}>
            <span style={sectionLabel}>Smart Offer Ideas</span>
            <SmartOffers profile={profile} onSelect={setOffer} accent={biz.accent} />
          </div>

          {/* Offer input */}
          <div style={card}>
            <Textarea
              label="Your Offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g. Buy 2 coffees get 1 free today only!"
              style={{ minHeight: 80 }}
            />
          </div>

          {/* Color scheme */}
          <div style={card}>
            <span style={sectionLabel}>Colour Scheme</span>
            <ColorSchemeSelector
              mode={colorMode}
              onModeChange={setColorMode}
              customColors={customColors}
              onCustomColorsChange={setCustomColors}
              selectedPreset={selectedPreset}
              onPresetSelect={(id) => { setSelectedPreset(id); setColorMode('preset'); }}
              autoAccent={biz.accent}
              autoLight={biz.light}
              autoBg={biz.darkBg}
            />
          </div>

          {/* Logo upload */}
          <div style={card}>
            <ImageUpload
              label="Logo"
              image={logoImage}
              onUpload={setLogoImage}
              onRemove={() => setLogoImage(null)}
              circle
            />
          </div>

          {/* Background photo */}
          <div style={card}>
            <ImageUpload
              label="Background Photo"
              image={bgImage}
              onUpload={setBgImage}
              onRemove={() => setBgImage(null)}
            />
          </div>

          {/* Poster size */}
          <div style={card}>
            <span style={sectionLabel}>Poster Size</span>
            <SizeSelector selectedId={sizeId} onSelect={setSizeId} accent={biz.accent} />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !offer.trim()}
            style={{
              width: '100%',
              padding: '16px',
              background: isGenerating || !offer.trim()
                ? '#1a1a2e'
                : `linear-gradient(135deg, ${biz.accent}, ${biz.light})`,
              color: isGenerating || !offer.trim() ? '#555' : biz.darkBg,
              border: 'none',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: isGenerating || !offer.trim() ? 'not-allowed' : 'pointer',
              letterSpacing: 0.5,
              transition: 'all 0.2s',
              boxShadow: isGenerating || !offer.trim() ? 'none' : `0 4px 24px ${biz.accent}44`,
              marginBottom: 6,
            }}
          >
            {isGenerating ? '⏳ Generating...' : '✨ Generate Poster'}
          </button>

          {generateError && (
            <p style={{ color: '#FF6B6B', fontSize: 13, margin: '8px 0 0', textAlign: 'center' }}>{generateError}</p>
          )}

          {/* Language indicator */}
          <div style={{ textAlign: 'center', marginTop: 14, paddingBottom: 20 }}>
            <span style={{ fontSize: 11, color: '#444' }}>
              Language: <span style={{ color: '#9D97FF', fontWeight: 600 }}>{profile.language}</span>
            </span>
          </div>
        </div>

        {/* RIGHT MAIN - sticky preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px 24px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 57px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 540, marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
              Preview
            </span>
            <span style={{ fontSize: 12, color: '#444' }}>{size.label} · {size.width}×{size.height}</span>
          </div>

          {/* Poster preview with ref for download */}
          <div
            ref={posterRef}
            style={{
              boxShadow: `0 8px 60px rgba(0,0,0,0.6), 0 0 0 1px #1a1a2e`,
              borderRadius: 10,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <PosterPreview
              business={biz}
              copy={generatedCopy}
              accent={colors.accent}
              light={colors.light}
              bgColor={colors.bg}
              layout={biz.layout}
              logoImage={logoImage}
              bgImage={bgImage}
              previewWidth={size.previewWidth}
              previewHeight={size.previewHeight}
              businessName={profile.name}
              tagline={profile.tagline}
              phone={profile.phone}
              location={profile.location}
            />
          </div>

          {/* Download button — always visible */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              marginTop: 16,
              padding: '13px 32px',
              background: isDownloading ? '#1a1a2e' : `linear-gradient(135deg, ${biz.accent}, ${biz.light})`,
              color: isDownloading ? '#555' : biz.darkBg,
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 800,
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              letterSpacing: 0.5,
              boxShadow: isDownloading ? 'none' : `0 4px 24px ${biz.accent}44`,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {isDownloading ? '⏳ Saving...' : `⬇ Download ${size.label}`}
          </button>

          <p style={{ fontSize: 11, color: '#333', marginTop: 6 }}>
            Saves as PNG at {size.width}×{size.height}px
          </p>

          {/* Generated copy */}
          {generatedCopy && (
            <div style={{ width: '100%', maxWidth: size.previewWidth + 100 }}>
              <CopyOutput copy={generatedCopy} accent={biz.accent} />
            </div>
          )}

          {!generatedCopy && (
            <div style={{ marginTop: 24, textAlign: 'center', color: '#333' }}>
              <p style={{ fontSize: 14 }}>Enter your offer and hit Generate →</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .creator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
