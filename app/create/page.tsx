'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BusinessProfile, GeneratedCopy, ColorMode, ColorScheme, TemplateId } from '@/lib/types';
import { SavedBusiness, getAllBusinesses, getActiveBusiness, setActiveBusiness, updateBusiness, addBusiness } from '@/lib/savedBusinesses';
import { getBusiness } from '@/lib/businesses';
import { getSize } from '@/lib/sizes';
import { COLOR_PRESETS } from '@/lib/colors';
import BusinessSetup from '@/components/creator/BusinessSetup';
import BusinessSwitcher from '@/components/creator/BusinessSwitcher';
import SmartOffers from '@/components/creator/SmartOffers';
import SmartSuggestions from '@/components/creator/SmartSuggestions';
import ColorSchemeSelector from '@/components/creator/ColorSchemeSelector';
import ImageUpload from '@/components/creator/ImageUpload';
import SizeSelector from '@/components/creator/SizeSelector';
import CopyOutput from '@/components/creator/CopyOutput';
import PosterPreview from '@/components/poster/PosterPreview';
import TemplatePicker from '@/components/creator/TemplatePicker';
import Textarea from '@/components/ui/Textarea';

export default function CreatePage() {
  const router = useRouter();
  const [allBusinesses, setAllBusinesses]   = useState<SavedBusiness[]>([]);
  const [activeBiz, setActiveBiz]           = useState<SavedBusiness | null>(null);
  const [showSetup, setShowSetup]           = useState(false);
  const [offer, setOffer]                   = useState('');
  const [colorMode, setColorMode]           = useState<ColorMode>('auto');
  const [selectedPreset, setSelectedPreset] = useState('black-gold');
  const [customColors, setCustomColors]     = useState<ColorScheme>({ accent: '#6C63FF', light: '#9D97FF', bg: '#07070f' });
  const [logoImage, setLogoImage]           = useState<string | null>(null);
  const [bgImage, setBgImage]               = useState<string | null>(null);
  const [sizeId, setSizeId]                 = useState('instagram');
  const [generatedCopy, setGeneratedCopy]   = useState<GeneratedCopy | null>(null);
  const [customHeadline, setCustomHeadline] = useState('');
  const [customCta, setCustomCta]           = useState('');
  const [isGenerating, setIsGenerating]     = useState(false);
  const [generateError, setGenerateError]   = useState('');
  const [isDownloading, setIsDownloading]   = useState(false);
  const [templateId, setTemplateId]         = useState<TemplateId>('centered');

  const posterRef = useRef<HTMLDivElement>(null);

  // ── Load saved businesses ──────────────────────────────────────────────────
  useEffect(() => {
    const all    = getAllBusinesses();
    const active = getActiveBusiness();
    if (all.length === 0 || !active) {
      router.replace('/businesses');
      return;
    }
    setAllBusinesses(all);
    setActiveBiz(active);
  }, []);

  function refreshBusinesses() {
    setAllBusinesses(getAllBusinesses());
    const a = getActiveBusiness();
    if (a) setActiveBiz(a);
  }

  // ── Switch active business ─────────────────────────────────────────────────
  function handleSwitch(biz: SavedBusiness) {
    setActiveBusiness(biz.id);
    setActiveBiz(biz);
    // Reset all copy fields on business switch
    setGeneratedCopy(null);
    setOffer('');
    setCustomHeadline('');
    setCustomCta('');
  }

  // ── Save / update business profile ────────────────────────────────────────
  function handleSaveProfile(profile: BusinessProfile) {
    if (activeBiz) {
      updateBusiness(activeBiz.id, profile);
      const updated = { ...activeBiz, ...profile };
      setActiveBiz(updated);
    } else {
      const newBiz = addBusiness(profile);
      setActiveBiz(newBiz);
    }
    refreshBusinesses();
    setShowSetup(false);
  }

  const biz    = activeBiz ? getBusiness(activeBiz.bizType) : getBusiness('cafe');
  const size   = getSize(sizeId);
  const profile: BusinessProfile | null = activeBiz ?? null;

  // Merge AI-generated copy with any manual overrides
  const effectiveCopy: GeneratedCopy | null =
    (generatedCopy || customHeadline.trim() || customCta.trim())
      ? {
          headline:    customHeadline.trim() || generatedCopy?.headline    || '',
          subheadline: generatedCopy?.subheadline || '',
          offer:       generatedCopy?.offer       || offer.trim(),
          body:        generatedCopy?.body        || '',
          urgency:     generatedCopy?.urgency     || '',
          cta:         customCta.trim()           || generatedCopy?.cta    || 'Contact Us',
          caption:     generatedCopy?.caption     || '',
        }
      : null;

  function getColors(): ColorScheme {
    if (colorMode === 'auto')   return { accent: biz.accent, light: biz.light, bg: biz.darkBg };
    if (colorMode === 'preset') {
      const p = COLOR_PRESETS.find((c) => c.id === selectedPreset);
      return p ? { accent: p.accent, light: p.light, bg: p.bg } : { accent: biz.accent, light: biz.light, bg: biz.darkBg };
    }
    return customColors;
  }
  const colors = getColors();

  // ── AI generation ──────────────────────────────────────────────────────────
  async function handleGenerate() {
    if (!offer.trim()) { setGenerateError('Please enter your offer first.'); return; }
    if (!profile) return;
    setIsGenerating(true);
    setGenerateError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer, profile, language: profile.language, bizTone: biz.tone, bizLayout: biz.layout }),
      });
      if (!res.ok) throw new Error('Generation failed');
      setGeneratedCopy(await res.json());
    } catch {
      setGenerateError('Something went wrong. Check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  // ── Download ───────────────────────────────────────────────────────────────
  async function handleDownload() {
    if (!posterRef.current) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(posterRef.current, {
        useCORS: true, allowTaint: true, backgroundColor: null,
        scale: size.width / size.previewWidth, logging: false,
      });
      const link = document.createElement('a');
      link.download = `${activeBiz?.name || 'poster'}-${size.label.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  }

  // ── Edit profile overlay ───────────────────────────────────────────────────
  if (showSetup) {
    const profileForSetup: BusinessProfile | null = activeBiz
      ? { name: activeBiz.name, bizType: activeBiz.bizType, phone: activeBiz.phone, location: activeBiz.location, tagline: activeBiz.tagline, extraDetails: activeBiz.extraDetails, language: activeBiz.language }
      : null;
    return (
      <div style={{ minHeight: '100vh', background: '#07070f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', borderBottom: '1px solid #1a1a2e' }}>
          <button onClick={() => setShowSetup(false)} style={{ background: '#0d0d1c', border: '1px solid #1a1a2e', color: '#888', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12 }}>
            ← Cancel
          </button>
          <span style={{ fontSize: 14, color: '#666' }}>Editing: <strong style={{ color: '#fff' }}>{activeBiz?.name}</strong></span>
        </div>
        <BusinessSetup onSave={handleSaveProfile} initial={profileForSetup} />
      </div>
    );
  }

  if (!activeBiz) return null;

  /* ── Styles ── */
  const sectionLabel: React.CSSProperties = { fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 10, display: 'block' };
  const card: React.CSSProperties = { background: '#0d0d1c', border: '1px solid #1a1a2e', borderRadius: 14, padding: 18, marginBottom: 14 };

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#fff' }}>

      {/* ── Header ── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid #1a1a2e', position: 'sticky', top: 0, background: '#07070f', zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
            Post<span style={{ color: biz.accent }}>AI</span>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: `${biz.accent}18`, border: `1px solid ${biz.accent}44`, color: biz.accent, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            {biz.emoji} {activeBiz.name}
          </div>
          <Link href="/businesses" style={{ background: '#0d0d1c', border: '1px solid #1a1a2e', color: '#666', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
            🏢 My Businesses
          </Link>
        </div>
      </header>

      {/* ── Main layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,380px) 1fr', gap: 0, minHeight: 'calc(100vh - 57px)' }} className="creator-grid">

        {/* LEFT SIDEBAR */}
        <div style={{ borderRight: '1px solid #1a1a2e', overflowY: 'auto', padding: '20px 20px', maxHeight: 'calc(100vh - 57px)' }}>

          {/* Business switcher — always at top */}
          <div style={{ ...card, borderColor: biz.accent + '33' }}>
            <span style={sectionLabel}>Active Business</span>
            <BusinessSwitcher
              businesses={allBusinesses}
              active={activeBiz}
              onSwitch={handleSwitch}
              onEdit={() => setShowSetup(true)}
            />
          </div>

          {/* Template picker */}
          <div style={card}>
            <span style={sectionLabel}>Template</span>
            <TemplatePicker selected={templateId} onSelect={setTemplateId} accent={biz.accent} />
          </div>

          {/* Smart Offers */}
          <div style={card}>
            <span style={sectionLabel}>Smart Offer Ideas</span>
            <SmartOffers profile={profile!} onSelect={setOffer} accent={biz.accent} />
          </div>

          {/* Offer input */}
          <div style={card}>
            <Textarea label="Your Offer" value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="e.g. Buy 2 coffees get 1 free today only!" style={{ minHeight: 80 }} />
          </div>

          {/* Hook & CTA suggestions */}
          <div style={card}>
            <span style={sectionLabel}>Hook & CTA</span>
            <SmartSuggestions
              offer={offer}
              profile={profile!}
              accent={biz.accent}
              headline={customHeadline}
              cta={customCta}
              onHeadlineChange={setCustomHeadline}
              onCtaChange={setCustomCta}
            />
          </div>

          {/* Color scheme */}
          <div style={card}>
            <span style={sectionLabel}>Colour Scheme</span>
            <ColorSchemeSelector mode={colorMode} onModeChange={setColorMode} customColors={customColors} onCustomColorsChange={setCustomColors} selectedPreset={selectedPreset} onPresetSelect={(id) => { setSelectedPreset(id); setColorMode('preset'); }} autoAccent={biz.accent} autoLight={biz.light} autoBg={biz.darkBg} />
          </div>

          {/* Logo */}
          <div style={card}>
            <ImageUpload label="Logo" image={logoImage} onUpload={setLogoImage} onRemove={() => setLogoImage(null)} circle />
          </div>

          {/* Background photo */}
          <div style={card}>
            <ImageUpload label="Background Photo" image={bgImage} onUpload={setBgImage} onRemove={() => setBgImage(null)} />
          </div>

          {/* Poster size */}
          <div style={card}>
            <span style={sectionLabel}>Poster Size</span>
            <SizeSelector selectedId={sizeId} onSelect={setSizeId} accent={biz.accent} />
          </div>

          {/* Generate */}
          <button onClick={handleGenerate} disabled={isGenerating || !offer.trim()} style={{ width: '100%', padding: '16px', background: isGenerating || !offer.trim() ? '#1a1a2e' : `linear-gradient(135deg,${biz.accent},${biz.light})`, color: isGenerating || !offer.trim() ? '#555' : biz.darkBg, border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: isGenerating || !offer.trim() ? 'not-allowed' : 'pointer', letterSpacing: 0.5, transition: 'all 0.2s', boxShadow: isGenerating || !offer.trim() ? 'none' : `0 4px 24px ${biz.accent}44`, marginBottom: 6 }}>
            {isGenerating ? '⏳ Generating...' : '✨ Generate Poster'}
          </button>

          {generateError && <p style={{ color: '#FF6B6B', fontSize: 13, margin: '8px 0 0', textAlign: 'center' }}>{generateError}</p>}

          <div style={{ textAlign: 'center', marginTop: 14, paddingBottom: 20 }}>
            <span style={{ fontSize: 11, color: '#444' }}>
              Language: <span style={{ color: '#9D97FF', fontWeight: 600 }}>{profile?.language}</span>
            </span>
          </div>
        </div>

        {/* RIGHT — preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 24px', overflowY: 'auto', maxHeight: 'calc(100vh - 57px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 540, marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Preview</span>
            <span style={{ fontSize: 12, color: '#444' }}>{size.label} · {size.width}×{size.height}</span>
          </div>

          <div ref={posterRef} style={{ boxShadow: '0 8px 60px rgba(0,0,0,0.6),0 0 0 1px #1a1a2e', borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            <PosterPreview
              templateId={templateId}
              business={biz}
              copy={effectiveCopy}
              accent={colors.accent}
              light={colors.light}
              bgColor={colors.bg}
              layout={biz.layout}
              logoImage={logoImage}
              bgImage={bgImage}
              previewWidth={size.previewWidth}
              previewHeight={size.previewHeight}
              businessName={activeBiz.name}
              tagline={activeBiz.tagline}
              phone={activeBiz.phone}
              location={activeBiz.location}
            />
          </div>

          <button onClick={handleDownload} disabled={isDownloading} style={{ marginTop: 16, padding: '13px 32px', background: isDownloading ? '#1a1a2e' : `linear-gradient(135deg,${biz.accent},${biz.light})`, color: isDownloading ? '#555' : biz.darkBg, border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: isDownloading ? 'not-allowed' : 'pointer', letterSpacing: 0.5, boxShadow: isDownloading ? 'none' : `0 4px 24px ${biz.accent}44`, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
            {isDownloading ? '⏳ Saving...' : `⬇ Download ${size.label}`}
          </button>
          <p style={{ fontSize: 11, color: '#333', marginTop: 6 }}>Saves as PNG at {size.width}×{size.height}px</p>

          {generatedCopy && (
            <div style={{ width: '100%', maxWidth: size.previewWidth + 100 }}>
              <CopyOutput copy={generatedCopy} accent={biz.accent} />
            </div>
          )}
          {!generatedCopy && (
            <div style={{ marginTop: 24, textAlign: 'center', color: '#333' }}>
              <p style={{ fontSize: 14 }}>Type a custom hook or enter your offer and hit Generate ✨</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .creator-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
