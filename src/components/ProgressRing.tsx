'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({
  percent,
  size = 160,
  strokeWidth = 10,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Progreso global: ${percent}%`}
    >
      <svg width={size} height={size} className="rotate-[-90deg]" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.3}
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent"
          style={{ filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.4))' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a017" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-[var(--foreground)]">{percent}%</span>
        <span className="text-[11px] uppercase font-bold text-[var(--muted-foreground)] tracking-widest">
          Global
        </span>
      </div>
    </div>
  );
}
