'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phase } from '@/types/plan';
import { cn } from '@/lib/utils';

interface PhaseCardProps {
  phase: Phase;
  index: number;
}

export default function PhaseCard({ phase, index }: PhaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass group p-6 rounded-2xl hover:border-gold/50 transition-all cursor-default relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="text-6xl font-black italic">{phase.number.replace('FASE ', '')}</span>
      </div>
      
      <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold mb-4">
        {phase.number}
      </span>
      <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{phase.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{phase.description}</p>
      
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
          {phase.semesters}
        </span>
      </div>
    </motion.div>
  );
}
