import { PosterSize } from './types';

export const SIZES: PosterSize[] = [
  {
    id: 'instagram',
    label: 'Instagram Post',
    width: 1080,
    height: 1080,
    previewWidth: 400,
    previewHeight: 400,
  },
  {
    id: 'story',
    label: 'Story / Reel',
    width: 1080,
    height: 1920,
    previewWidth: 310,
    previewHeight: 551,
  },
  {
    id: 'facebook',
    label: 'Facebook Feed',
    width: 1200,
    height: 628,
    previewWidth: 440,
    previewHeight: 230,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Status',
    width: 1080,
    height: 1080,
    previewWidth: 400,
    previewHeight: 400,
  },
  {
    id: 'a4',
    label: 'A4 Print',
    width: 2480,
    height: 3508,
    previewWidth: 300,
    previewHeight: 424,
  },
];

export function getSize(id: string): PosterSize {
  return SIZES.find((s) => s.id === id) || SIZES[0];
}
