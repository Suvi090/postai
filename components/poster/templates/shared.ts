import { BusinessType, GeneratedCopy, LayoutType } from '@/lib/types';

export function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

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
