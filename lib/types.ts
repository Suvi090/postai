export interface BusinessType {
  id: string;
  label: string;
  emoji: string;
  accent: string;
  light: string;
  darkBg: string;
  tone: string;
  layout: LayoutType;
  exampleOffer: string;
}

export type LayoutType = 'bold' | 'premium' | 'split' | 'promo' | 'clean' | 'centered';

export interface PosterSize {
  id: string;
  label: string;
  width: number;
  height: number;
  previewWidth: number;
  previewHeight: number;
}

export interface ColorPreset {
  id: string;
  label: string;
  accent: string;
  light: string;
  bg: string;
}

export interface BusinessProfile {
  name: string;
  bizType: string;
  phone: string;
  location: string;
  tagline: string;
  extraDetails: string;
  language: 'english' | 'malayalam' | 'tamil' | 'hindi';
}

export interface GeneratedCopy {
  headline: string;
  subheadline: string;
  offer: string;
  body: string;
  urgency: string;
  cta: string;
  caption: string;
}

export interface ColorScheme {
  accent: string;
  light: string;
  bg: string;
}

export type ColorMode = 'auto' | 'preset' | 'image' | 'manual';

export interface PosterState {
  profile: BusinessProfile;
  offer: string;
  colorMode: ColorMode;
  colorPreset: string;
  customColors: ColorScheme;
  logoImage: string | null;
  bgImage: string | null;
  sizeId: string;
  generatedCopy: GeneratedCopy | null;
  isGenerating: boolean;
}
