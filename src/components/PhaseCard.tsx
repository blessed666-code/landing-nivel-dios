'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phase } from '@/types/plan';

interface PhaseCardProps {
  phase: Phase;
  index: number;
}

export default function PhaseCard({ phase, index }: PhaseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass group p-6 sm:p-8 rounded-2xl hover:border-[var(--ring)]/50 transition-all cursor-default relative overflow-hidden"
      aria-label={`${phase.number}: ${phase.title}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" aria-hidden="true">
        <span className="text-7xl font-black italic text-[var(--foreground)]">
          {phase.number.replace('FASE ', '')}
        </span>
      </div>

      <span className="inline-block px-3 py-1 rounded-full bg-[var(--ring)]/10 text-[var(--ring)] text-xs font-bold mb-5">
        {phase.number}
      </span>
      <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--ring)] transition-colors leading-snug text-[var(--foreground)]">
        {phase.title}
      </h3>
      <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed">
        {phase.description}
      </p>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          {phase.semesters}
        </span>
      </div>
    </motion.article>
  );
}
