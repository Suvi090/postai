import { BusinessProfile } from './types';

export interface SavedBusiness extends BusinessProfile {
  id: string;
  createdAt: number;
}

const STORE_KEY  = 'postai_businesses';
const ACTIVE_KEY = 'postai_active_biz_id';
const LEGACY_KEY = 'postai_profile'; // old single-profile key

// ─── Read ────────────────────────────────────────────────────────────────────

export function getAllBusinesses(): SavedBusiness[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw) as SavedBusiness[];

    // ── Migrate legacy single profile ──
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const profile = JSON.parse(legacy) as BusinessProfile;
      const migrated: SavedBusiness = { ...profile, id: _uid(), createdAt: Date.now() };
      _write([migrated]);
      setActiveBusiness(migrated.id);
      return [migrated];
    }
    return [];
  } catch {
    return [];
  }
}

export function getActiveBusiness(): SavedBusiness | null {
  const all = getAllBusinesses();
  if (all.length === 0) return null;
  const id = typeof window !== 'undefined' ? localStorage.getItem(ACTIVE_KEY) : null;
  return all.find((b) => b.id === id) ?? all[0];
}

// ─── Write ───────────────────────────────────────────────────────────────────

export function setActiveBusiness(id: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(ACTIVE_KEY, id);
}

export function addBusiness(profile: BusinessProfile): SavedBusiness {
  const biz: SavedBusiness = { ...profile, id: _uid(), createdAt: Date.now() };
  _write([biz, ...getAllBusinesses()]);
  setActiveBusiness(biz.id);
  return biz;
}

export function updateBusiness(id: string, profile: BusinessProfile): void {
  _write(getAllBusinesses().map((b) => (b.id === id ? { ...b, ...profile } : b)));
}

export function deleteBusiness(id: string): void {
  const remaining = getAllBusinesses().filter((b) => b.id !== id);
  _write(remaining);
  const activeId = typeof window !== 'undefined' ? localStorage.getItem(ACTIVE_KEY) : null;
  if (activeId === id && remaining.length > 0) setActiveBusiness(remaining[0].id);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function _write(list: SavedBusiness[]): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

function _uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
