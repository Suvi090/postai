'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  SavedBusiness,
  getAllBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  setActiveBusiness,
  getActiveBusiness,
} from '@/lib/savedBusinesses';
import { getBusiness, BUSINESSES } from '@/lib/businesses';
import { BusinessProfile } from '@/lib/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

const LANGUAGES = [
  { id: 'english',   label: 'English'   },
  { id: 'malayalam', label: 'Malayalam' },
  { id: 'tamil',     label: 'Tamil'     },
  { id: 'hindi',     label: 'Hindi'     },
] as const;

const blank: BusinessProfile = {
  name: '', bizType: 'cafe', phone: '', location: '',
  tagline: '', extraDetails: '', language: 'english',
};

type FormMode = { type: 'none' } | { type: 'new' } | { type: 'edit'; biz: SavedBusiness };

export default function BusinessesPage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<SavedBusiness[]>([]);
  const [activeBizId, setActiveBizId] = useState<string | null>(null);
  const [mode, setMode] = useState<FormMode>({ type: 'none' });
  const [form, setForm] = useState<BusinessProfile>(blank);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const all = getAllBusinesses();
    setBusinesses(all);
    const active = getActiveBusiness();
    if (active) setActiveBizId(active.id);
    if (all.length === 0) setMode({ type: 'new' });
  }, []);

  function refresh() {
    const all = getAllBusinesses();
    setBusinesses(all);
    const active = getActiveBusiness();
    if (active) setActiveBizId(active.id);
  }

  function openNew() {
    setForm(blank);
    setError('');
    setMode({ type: 'new' });
  }

  function openEdit(biz: SavedBusiness) {
    setForm({
      name: biz.name, bizType: biz.bizType, phone: biz.phone,
      location: biz.location, tagline: biz.tagline, extraDetails: biz.extraDetails,
      language: biz.language,
    });
    setError('');
    setMode({ type: 'edit', biz });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSave() {
    if (!form.name.trim()) { setError('Business name is required'); return; }
    if (!form.location.trim()) { setError('Location is required'); return; }
    setError('');
    if (mode.type === 'new') {
      addBusiness(form);
    } else if (mode.type === 'edit') {
      updateBusiness(mode.biz.id, form);
    }
    refresh();
    setMode({ type: 'none' });
  }

  function handleUse(biz: SavedBusiness) {
    setActiveBusiness(biz.id);
    router.push('/create');
  }

  function handleDelete(id: string) {
    deleteBusiness(id);
    refresh();
    setDeleteConfirm(null);
    if (mode.type === 'edit' && mode.biz.id === id) setMode({ type: 'none' });
  }

  const update = (k: keyof BusinessProfile, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const selectedBt = getBusiness(form.bizType);
  const showForm = mode.type !== 'none';

  /* ── styles ── */
  const card: React.CSSProperties = { background: '#0d0d1c', border: '1px solid #1a1a2e', borderRadius: 14, padding: 20, marginBottom: 12 };
  const label: React.CSSProperties = { fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, display: 'block' };
  const btnSm = (col: string, bg = '#0d0d1c', border = '#1a1a2e'): React.CSSProperties => ({
    background: bg, border: `1px solid ${border}`, color: col, borderRadius: 8,
    padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
    transition: 'all 0.15s', whiteSpace: 'nowrap',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#fff', fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>

      {/* ── Header ── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid #1a1a2e', position: 'sticky', top: 0, background: '#07070f', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
              Post<span style={{ color: '#9D97FF' }}>AI</span>
            </span>
          </Link>
          <span style={{ color: '#333', fontSize: 18 }}>›</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>My Businesses</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {businesses.length > 0 && (
            <Link href="/create" style={{ ...btnSm('#9D97FF', '#9D97FF22', '#9D97FF44'), textDecoration: 'none', padding: '7px 14px' }}>
              ← Back to Create
            </Link>
          )}
          <button onClick={openNew} style={{ background: 'linear-gradient(135deg,#9D97FF,#6C63FF)', color: '#07070f', border: 'none', borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 800, letterSpacing: 0.3 }}>
            + Add Business
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 20px' }}>

        {/* ── Form (add/edit) ── */}
        {showForm && (
          <div style={{ ...card, borderColor: selectedBt.accent + '55', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>
                {mode.type === 'new' ? '＋ New Business' : `✏ Edit — ${mode.type === 'edit' ? mode.biz.name : ''}`}
              </h2>
              {mode.type !== 'new' || businesses.length > 0 ? (
                <button onClick={() => setMode({ type: 'none' })} style={btnSm('#666')}>✕ Cancel</button>
              ) : null}
            </div>

            {/* Business type grid */}
            <div style={{ marginBottom: 18 }}>
              <span style={label}>Business Type</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {BUSINESSES.map((b) => (
                  <button key={b.id} onClick={() => update('bizType', b.id)} style={{
                    background: form.bizType === b.id ? `${b.accent}22` : '#07070f',
                    border: `1px solid ${form.bizType === b.id ? b.accent : '#1a1a2e'}`,
                    color: form.bizType === b.id ? b.accent : '#888',
                    borderRadius: 10, padding: '8px 4px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    fontSize: 11, fontWeight: form.bizType === b.id ? 700 : 400, transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: 20 }}>{b.emoji}</span>
                    <span style={{ lineHeight: 1.2, textAlign: 'center' }}>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Business Name *" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Arjun's Café" />
              <Input label="Phone Number" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="e.g. +91 98765 43210" type="tel" />
              <Input label="Location / Area *" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Kozhikode, Kerala" />
              <Input label="Tagline (optional)" value={form.tagline} onChange={(e) => update('tagline', e.target.value)} placeholder="e.g. Fresh brews, warm vibes" />
              <Textarea label="Extra Details (optional)" value={form.extraDetails} onChange={(e) => update('extraDetails', e.target.value)} placeholder="Timings, USP, awards…" style={{ minHeight: 60 }} />

              {/* Language */}
              <div>
                <span style={label}>Language for AI Copy</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {LANGUAGES.map((lang) => (
                    <button key={lang.id} onClick={() => update('language', lang.id)} style={{
                      background: form.language === lang.id ? '#6C63FF22' : '#07070f',
                      border: `1px solid ${form.language === lang.id ? '#6C63FF' : '#1a1a2e'}`,
                      color: form.language === lang.id ? '#9D97FF' : '#666',
                      borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
                      fontSize: 13, fontWeight: form.language === lang.id ? 700 : 400, transition: 'all 0.2s',
                    }}>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#FF6B6B', fontSize: 13, margin: '12px 0 0' }}>{error}</p>}

            <button
              onClick={handleSave}
              style={{
                marginTop: 20, width: '100%', padding: '14px',
                background: `linear-gradient(135deg,${selectedBt.accent},${selectedBt.light})`,
                color: selectedBt.darkBg, border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: 'pointer',
                boxShadow: `0 4px 24px ${selectedBt.accent}44`,
              }}
            >
              {mode.type === 'new' ? '✓ Save Business' : '✓ Save Changes'}
            </button>
          </div>
        )}

        {/* ── Business list ── */}
        {businesses.length === 0 && !showForm && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#444' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
            <p style={{ fontSize: 16, marginBottom: 20 }}>No businesses saved yet.</p>
            <button onClick={openNew} style={{ background: 'linear-gradient(135deg,#9D97FF,#6C63FF)', color: '#07070f', border: 'none', borderRadius: 12, padding: '13px 28px', cursor: 'pointer', fontSize: 15, fontWeight: 800 }}>
              + Add Your First Business
            </button>
          </div>
        )}

        {businesses.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: '#444', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
                {businesses.length} {businesses.length === 1 ? 'Business' : 'Businesses'} Saved
              </span>
            </div>

            {businesses.map((biz) => {
              const bt = getBusiness(biz.bizType);
              const isActive = biz.id === activeBizId;
              const isDeleting = deleteConfirm === biz.id;
              return (
                <div key={biz.id} style={{
                  ...card,
                  borderColor: isActive ? bt.accent + '55' : '#1a1a2e',
                  background: isActive ? `${bt.accent}08` : '#0d0d1c',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    {/* Emoji */}
                    <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{bt.emoji}</div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{biz.name}</span>
                        {isActive && (
                          <span style={{ fontSize: 10, fontWeight: 700, color: bt.accent, background: `${bt.accent}22`, border: `1px solid ${bt.accent}44`, borderRadius: 20, padding: '2px 8px', letterSpacing: 0.5 }}>
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>
                        {bt.label}{biz.location ? ` · ${biz.location}` : ''}{biz.phone ? ` · ${biz.phone}` : ''}
                      </div>
                      {biz.tagline && (
                        <div style={{ fontSize: 12, color: '#555', marginTop: 4, fontStyle: 'italic' }}>"{biz.tagline}"</div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {!isActive && (
                        <button onClick={() => handleUse(biz)} style={{ ...btnSm(bt.accent, `${bt.accent}18`, `${bt.accent}55`), padding: '7px 14px', fontSize: 12 }}>
                          ▶ Use This
                        </button>
                      )}
                      {isActive && (
                        <button onClick={() => router.push('/create')} style={{ ...btnSm('#9D97FF', '#9D97FF18', '#9D97FF55'), padding: '7px 14px', fontSize: 12 }}>
                          → Create Post
                        </button>
                      )}
                      <button onClick={() => openEdit(biz)} style={btnSm('#aaa')}>✏ Edit</button>
                      {isDeleting ? (
                        <>
                          <button onClick={() => handleDelete(biz.id)} style={btnSm('#FF6B6B', '#FF6B6B22', '#FF6B6B55')}>Confirm Delete</button>
                          <button onClick={() => setDeleteConfirm(null)} style={btnSm('#666')}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => setDeleteConfirm(biz.id)} style={btnSm('#555')} title="Delete">✕</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!showForm && businesses.length > 0 && (
          <button onClick={openNew} style={{ width: '100%', marginTop: 8, padding: '13px', background: 'transparent', border: '1px dashed #2a2a3e', color: '#555', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#9D97FF55'; e.currentTarget.style.color = '#9D97FF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a3e'; e.currentTarget.style.color = '#555'; }}
          >
            + Add Another Business
          </button>
        )}
      </div>
    </div>
  );
}
