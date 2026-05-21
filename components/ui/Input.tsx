'use client';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 10, color: '#9D97FF', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input
        style={{
          background: '#07070f',
          border: '1px solid #1a1a2e',
          color: 'white',
          borderRadius: 10,
          padding: '11px 13px',
          fontSize: 14,
          outline: 'none',
          width: '100%',
          transition: 'border-color 0.2s',
          ...style,
        }}
        onFocus={(e) => { e.target.style.borderColor = '#6C63FF'; }}
        onBlur={(e) => { e.target.style.borderColor = '#1a1a2e'; }}
        {...props}
      />
    </div>
  );
}
