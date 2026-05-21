'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  accent?: string;
  light?: string;
  bgDark?: string;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth,
  accent = '#6C63FF',
  light = '#9D97FF',
  bgDark = '#07070f',
  className = '',
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    fontWeight: 700,
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.5 : 1,
    transition: 'all 0.2s',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : undefined,
    whiteSpace: 'nowrap',
    ...style,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${accent}, ${light})`,
      color: bgDark,
      padding: '11px 20px',
      fontSize: 14,
      letterSpacing: 0.5,
      boxShadow: `0 4px 20px ${accent}44`,
    },
    secondary: {
      background: 'transparent',
      color: accent,
      padding: '10px 18px',
      fontSize: 14,
      border: `1px solid ${accent}`,
    },
    ghost: {
      background: `${accent}18`,
      color: accent,
      padding: '8px 14px',
      fontSize: 13,
      border: `1px solid ${accent}44`,
    },
  };

  return (
    <button style={{ ...base, ...variants[variant] }} className={className} {...props}>
      {children}
    </button>
  );
}
