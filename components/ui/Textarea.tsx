'use client';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, style, ...props }: TextareaProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          {label}
        </label>
      )}
      <textarea
        style={{
          background: '#07070f',
          border: '1px solid #1a1a2e',
          color: 'white',
          borderRadius: 10,
          padding: '11px 13px',
          fontSize: 14,
          outline: 'none',
          width: '100%',
          resize: 'vertical',
          minHeight: 90,
          transition: 'border-color 0.2s',
          fontFamily: 'inherit',
          ...style,
        }}
        onFocus={(e) => { e.target.style.borderColor = '#6C63FF'; }}
        onBlur={(e) => { e.target.style.borderColor = '#1a1a2e'; }}
        {...props}
      />
    </div>
  );
}
