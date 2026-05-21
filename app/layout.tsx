import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'PostAI — AI Poster Maker for Local Businesses',
  description: 'Create professional marketing posters in 60 seconds. AI writes the copy, captions, and hashtags. Built for Indian local businesses.',
  keywords: 'poster maker, AI poster, social media, marketing, Indian business, Instagram poster',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, background: '#07070f' }}>
        {children}
      </body>
    </html>
  );
}
