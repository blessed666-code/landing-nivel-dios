'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Semester } from '@/types/plan';
import { ChevronDown, BookOpen, Rocket, CheckCircle2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { cn } from '@/lib/utils';

interface SemesterCardProps {
  semester: Semester;
}

export default function SemesterCard({ semester }: SemesterCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'glass rounded-2xl overflow-hidden transition-all duration-300',
        isOpen ? 'ring-1 ring-[var(--ring)]/30 shadow-2xl' : 'hover:border-[var(--ring)]/30'
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`semester-${semester.number}-content`}
      >
        <div className="w-12 h-12 rounded-xl bg-[var(--ring)]/10 flex items-center justify-center text-[var(--ring)] font-extrabold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
          {semester.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold group-hover:text-[var(--ring)] transition-colors leading-snug">
            {semester.title}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1.5 line-clamp-1 leading-relaxed">
            {semester.meta}
          </p>
        </div>
        <div
          className={cn(
            'transition-transform duration-300 flex-shrink-0',
            isOpen ? 'rotate-180' : ''
          )}
        >
          <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`semester-${semester.number}-content`}
            role="region"
            aria-label={`Contenido del semestre ${semester.number}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 sm:px-6 lg:px-8 pb-6 lg:pb-8 pt-6 lg:pt-8 border-t border-[var(--border)]/50">
              {/* ─── Bloques A & B ─── */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-10">
                {/* Bloque A */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-600/10 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)]">
                      {semester.bloqueA.title}
                    </h4>
                  </div>
                  <ul className="space-y-3" role="list">
                    {semester.bloqueA.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--muted-foreground)] flex gap-3 leading-relaxed"
                      >
                        <span className="text-[var(--ring)] mt-0.5 flex-shrink-0" aria-hidden="true">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bloque B */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-600/10 text-red-600 dark:text-red-400">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)]">
                      {semester.bloqueB.title}
                    </h4>
                  </div>
                  <ul className="space-y-3" role="list">
                    {semester.bloqueB.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--muted-foreground)] flex gap-3 leading-relaxed"
                      >
                        <span className="text-[var(--ring)] mt-0.5 flex-shrink-0" aria-hidden="true">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ─── Bibliografía ─── */}
              {semester.bibliography.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <BookOpen className="w-4 h-4 text-[var(--ring)]" />
                    <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                      Bibliografía de Élite
                    </h4>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-[var(--border)]/50">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[var(--secondary)]/60 text-[var(--muted-foreground)]">
                        <tr>
                          <th className="px-4 py-3 font-semibold" scope="col">Recurso</th>
                          <th className="px-4 py-3 font-semibold" scope="col">Autor</th>
                          <th className="px-4 py-3 font-semibold" scope="col">Área</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]/30">
                        {semester.bibliography.map((bib, i) => (
                          <tr key={i} className="hover:bg-[var(--accent)]/30 transition-colors">
                            <td className="px-4 py-3 font-medium text-[var(--foreground)]">{bib.resource}</td>
                            <td className="px-4 py-3 text-[var(--muted-foreground)]">{bib.author}</td>
                            <td className="px-4 py-3 text-[var(--muted-foreground)]">{bib.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ─── Proyectos ─── */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <Rocket className="w-4 h-4 text-[var(--ring)]" />
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                    Proyectos del Semestre — {semester.projects.length} Proyectos
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semester.projects.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
