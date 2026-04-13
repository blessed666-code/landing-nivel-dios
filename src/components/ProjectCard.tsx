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
      case 'NAIU': return 'bg-naiu/10 text-naiu border-naiu/20';
      case 'II': return 'bg-ii/10 text-ii border-ii/20';
      case 'AUTO': return 'bg-auto/10 text-auto border-auto/20';
      case 'IA/DS': return 'bg-ia/10 text-ia border-ia/20';
      case 'EXTRA': return 'bg-extra/10 text-extra border-extra/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'NAIU': return <Layers className="w-4 h-4" />;
      case 'II': return <TrendingUp className="w-4 h-4" />;
      case 'AUTO': return <Zap className="w-4 h-4" />;
      case 'IA/DS': return <BrainCircuit className="w-4 h-4" />;
      case 'EXTRA': return <Star className="w-4 h-4 text-gold" />;
      default: return null;
    }
  };

  return (
    <div className="bg-background/40 border border-border/50 rounded-xl p-5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-bold text-muted-foreground group-hover:text-gold transition-colors">
          #{project.num.replace('#', '')}
        </span>
        <div className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1.5", getTypeStyles(project.type))}>
          {getIcon(project.type)}
          {project.type}
        </div>
      </div>
      
      <h5 className="font-bold text-sm mb-2 leading-tight group-hover:translate-x-1 transition-transform">{project.title}</h5>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4">{project.description}</p>
      
      <div className="space-y-2 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-gold font-bold">Stack:</span>
          <span className="text-muted-foreground truncate">{project.stack}</span>
        </div>
        {project.price && (
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-naiu font-bold">Precio:</span>
            <span className="text-muted-foreground truncate">{project.price}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-ia font-bold">Conecta:</span>
          <span className="text-muted-foreground truncate">{project.connect}</span>
        </div>
      </div>
    </div>
  );
}
