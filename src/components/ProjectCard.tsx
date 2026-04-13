'use client';

import React from 'react';
import { Project } from '@/types/plan';
import { cn } from '@/lib/utils';
import { Layers, Zap, TrendingUp, BrainCircuit, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getTypeStyles = (type: string) => {
    switch (type.toUpperCase()) {
      case 'NAIU':
        return 'bg-[var(--color-naiu)]/10 text-[var(--color-naiu)] border-[var(--color-naiu)]/25';
      case 'II':
        return 'bg-[var(--color-ii)]/10 text-[var(--color-ii)] border-[var(--color-ii)]/25';
      case 'AUTO':
        return 'bg-[var(--color-auto)]/10 text-[var(--color-auto)] border-[var(--color-auto)]/25';
      case 'IA/DS':
        return 'bg-[var(--color-ia)]/10 text-[var(--color-ia)] border-[var(--color-ia)]/25';
      case 'EXTRA':
        return 'bg-[var(--color-extra)]/10 text-[var(--color-extra)] border-[var(--color-extra)]/25';
      default:
        return 'bg-[var(--muted)] text-[var(--muted-foreground)]';
    }
  };

  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'NAIU': return <Layers className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'II': return <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'AUTO': return <Zap className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'IA/DS': return <BrainCircuit className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'EXTRA': return <Star className="w-3.5 h-3.5" aria-hidden="true" />;
      default: return null;
    }
  };

  return (
    <article
      className="bg-[var(--card)] border border-[var(--border)]/60 rounded-xl p-5 hover:border-[var(--ring)]/30 hover:shadow-lg hover:shadow-[var(--ring)]/5 transition-all group"
      aria-label={`Proyecto ${project.num}: ${project.title}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-bold text-[var(--muted-foreground)] group-hover:text-[var(--ring)] transition-colors">
          {project.num}
        </span>
        <div
          className={cn(
            'px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1.5',
            getTypeStyles(project.type)
          )}
        >
          {getIcon(project.type)}
          <span>{project.type}</span>
        </div>
      </div>

      <h5 className="font-bold text-sm mb-2 leading-snug text-[var(--foreground)] group-hover:translate-x-0.5 transition-transform">
        {project.title}
      </h5>
      <p className="text-[var(--muted-foreground)] text-xs leading-relaxed mb-4">
        {project.description}
      </p>

      <div className="space-y-2 pt-4 border-t border-[var(--border)]/40">
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-[var(--ring)] font-bold flex-shrink-0">Stack:</span>
          <span className="text-[var(--muted-foreground)] leading-relaxed">{project.stack}</span>
        </div>
        {project.price && (
          <div className="flex items-start gap-2 text-[11px]">
            <span className="text-[var(--color-naiu)] font-bold flex-shrink-0">Precio:</span>
            <span className="text-[var(--muted-foreground)] leading-relaxed">{project.price}</span>
          </div>
        )}
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-[var(--color-ia)] font-bold flex-shrink-0">Conecta:</span>
          <span className="text-[var(--muted-foreground)] leading-relaxed">{project.connect}</span>
        </div>
      </div>
    </article>
  );
}
