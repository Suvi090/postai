import { BusinessType, GeneratedCopy, LayoutType } from '@/lib/types';

export function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** WCAG relative luminance (0 = black, 1 = white) */
export function getLuminance(hex: string): number {
  const safeHex = hex.startsWith('#') ? hex : '#' + hex;
  const r = parseInt(safeHex.slice(1, 3), 16) / 255;
  const g = parseInt(safeHex.slice(3, 5), 16) / 255;
  const b = parseInt(safeHex.slice(5, 7), 16) / 255;
  const lin = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Returns the highest-contrast foreground colour (near-black or white)
 * for text placed on `bgHex`. Ensures at least ~4.5:1 contrast ratio.
 */
export function onColor(bgHex: string): string {
  return getLuminance(bgHex) > 0.35 ? '#0d0d0d' : '#ffffff';
}

/** Strong readable shadow for text placed over a photo */
export const imgShadow = '0 2px 16px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.7)';

/** Lighter shadow for text on a solid dark background */
export const darkShadow = '0 1px 8px rgba(0,0,0,0.6)';

export interface TemplateProps {
  business: BusinessType;
  copy: GeneratedCopy | null;
  accent: string;
  light: string;
  bgColor: string;
  layout: LayoutType;
  logoImage: string | null;
  bgImage: string | null;
  previewWidth: number;
  previewHeight: number;
  businessName: string;
  tagline?: string;
  phone: string;
  location: string;
}
