'use client';
import { useRef } from 'react';

interface ImageUploadProps {
  label: string;
  image: string | null;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
  accept?: string;
  circle?: boolean;
}

export default function ImageUpload({ label, image, onUpload, onRemove, accept = 'image/*', circle }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onUpload(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
        {label}
      </div>
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} style={{ display: 'none' }} />

      {image ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: circle ? '50%' : 8,
              overflow: 'hidden',
              border: '1px solid #1a1a2e',
              flexShrink: 0,
            }}
          >
            <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                background: '#07070f',
                border: '1px solid #1a1a2e',
                color: '#9D97FF',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Replace
            </button>
            <button
              onClick={onRemove}
              style={{
                background: '#07070f',
                border: '1px solid #FF6B6B44',
                color: '#FF6B6B',
                borderRadius: 8,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            background: '#07070f',
            border: '1px dashed #1a1a2e',
            color: '#555',
            borderRadius: 10,
            padding: '14px',
            cursor: 'pointer',
            fontSize: 13,
            width: '100%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = '#9D97FF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a2e'; e.currentTarget.style.color = '#555'; }}
        >
          + Upload {label}
        </button>
      )}
    </div>
  );
}
