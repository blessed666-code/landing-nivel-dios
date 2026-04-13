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
        "glass rounded-2xl overflow-hidden transition-all duration-300",
        isOpen ? "ring-1 ring-gold/30 shadow-2xl" : "hover:border-gold/30"
      )}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-6 text-left group"
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold font-black text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {semester.number}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold group-hover:text-gold transition-colors">{semester.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{semester.meta}</p>
        </div>
        <div className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-border/50">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Bloque A */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider">{semester.bloqueA.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {semester.bloqueA.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-gold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bloque B */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider">{semester.bloqueB.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {semester.bloqueB.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-gold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bibliography */}
              {semester.bibliography.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-gold" />
                    <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Bibliografía de Élite</h4>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/50 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Recurso</th>
                          <th className="px-4 py-3 font-semibold">Autor</th>
                          <th className="px-4 py-3 font-semibold">Área</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {semester.bibliography.map((bib, i) => (
                          <tr key={i} className="hover:bg-accent/20 transition-colors">
                            <td className="px-4 py-3 font-medium">{bib.resource}</td>
                            <td className="px-4 py-3 text-muted-foreground">{bib.author}</td>
                            <td className="px-4 py-3 text-muted-foreground">{bib.area}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className="w-4 h-4 text-gold" />
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Proyectos del Semestre</h4>
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
