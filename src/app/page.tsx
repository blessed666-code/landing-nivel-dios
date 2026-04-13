import React from 'react';
import planData from '@/data/plan.json';
import { PlanData } from '@/types/plan';
import PhaseCard from '@/components/PhaseCard';
import SemesterCard from '@/components/SemesterCard';
import { ArrowDown, GraduationCap, Target, Briefcase } from 'lucide-react';

const data = planData as PlanData;

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-28 pb-28">
      {/* ─── Hero Section ─── */}
      <section
        id="hero"
        className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto pt-10"
        aria-labelledby="hero-title"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--ring)]/10 border border-[var(--ring)]/20 text-[var(--ring)] text-xs font-bold mb-8">
          <GraduationCap className="w-4 h-4" aria-hidden="true" />
          <span>Ingeniería en IA · IO · Ingeniería Industrial Full-Stack</span>
        </div>

        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-[var(--foreground)]"
        >
          Plan Maestro de Educación
          <br />
          <span className="gradient-text">Nivel Dios</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto leading-relaxed">
          Ruta estratégica para convertirse en{' '}
          <span className="text-[var(--foreground)] font-semibold">
            Operations Research Scientist
          </span>
          . Dominando IA, MLOps, Lean Manufacturing y Optimización Industrial.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
          {[
            { label: 'Semestres', value: '14' },
            { label: 'Horas/Semana', value: '28' },
            { label: 'Proyectos', value: '98' },
            { label: 'Fases', value: '5' },
          ].map((stat, i) => (
            <div key={i} className="glass p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ring)]">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--muted-foreground)] font-bold mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#semestres"
            className="bg-[var(--ring)] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[var(--ring)]/20 transition-all text-center"
          >
            Explorar Plan Completo
          </a>
          <a
            href="/dashboard"
            className="glass px-8 py-4 rounded-full font-bold hover:bg-[var(--accent)] transition-all text-center text-[var(--foreground)]"
          >
            📊 Dashboard de Avance
          </a>
        </div>

        <div className="mt-20 animate-bounce" aria-hidden="true">
          <ArrowDown className="text-[var(--muted-foreground)] w-6 h-6" />
        </div>
      </section>

      {/* ─── Objectives Section ─── */}
      <section className="max-w-7xl mx-auto px-6 w-full" aria-labelledby="objectives-title">
        <h2 id="objectives-title" className="sr-only">
          Objetivos del Plan
        </h2>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="glass p-8 sm:p-10 rounded-3xl flex flex-col gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[var(--ring)]/10 flex items-center justify-center text-[var(--ring)]">
              <Target className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">Objetivo Profesional</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Formación Senior en IA, Datos, MLOps, Investigación de Operaciones y Gestión de
              Operaciones. Especializado en sistemas ciberfísicos y optimización de cadenas de
              suministro.
            </p>
          </div>
          <div className="glass p-8 sm:p-10 rounded-3xl flex flex-col gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-ia)]/10 flex items-center justify-center text-[var(--color-ia)]">
              <Briefcase className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">Ecosistema de Trabajo</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {['Platzi', 'IO Autónoma', 'Agrotech', 'Big Tech', 'NAIU'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[var(--secondary)] text-xs font-bold text-[var(--foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phases Section ─── */}
      <section id="fases" className="max-w-7xl mx-auto px-6 w-full scroll-mt-24" aria-labelledby="phases-title">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 id="phases-title" className="text-3xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">
            Mapa de Ruta Estratégico
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed max-w-xl">
            Evolución técnica desde fundamentos hasta arquitectura Senior.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Semesters Section ─── */}
      <section id="semestres" className="max-w-5xl mx-auto px-6 w-full scroll-mt-24" aria-labelledby="semesters-title">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 id="semesters-title" className="text-3xl md:text-5xl font-extrabold mb-4 text-[var(--foreground)]">
            Cronograma Detallado
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed max-w-xl">
            Haz clic en cada semestre para ver bloques de estudio, bibliografía y proyectos.
          </p>
        </div>

        <div className="space-y-6">
          {data.semesters.map((semester, i) => (
            <SemesterCard key={i} semester={semester} />
          ))}
        </div>
      </section>
    </div>
  );
}
