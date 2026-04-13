import React from 'react';
import planData from '@/data/plan.json';
import { PlanData } from '@/types/plan';
import PhaseCard from '@/components/PhaseCard';
import SemesterCard from '@/components/SemesterCard';
import { motion } from 'framer-motion';
import { ArrowDown, GraduationCap, Target, Briefcase } from 'lucide-react';

const data = planData as PlanData;

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold mb-8 animate-fade-in">
          <GraduationCap className="w-4 h-4" />
          Ingeniería en IA · IO · Ingeniería Industrial Full-Stack
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
          Plan Maestro de Educación <br/>
          <span className="gradient-text tracking-tighter">Nivel Dios</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Ruta estratégica para convertirse en <span className="text-foreground font-semibold italic">Operations Research Scientist</span>. 
          Dominando IA, MLOps, Lean Manufacturing y Optimización Industrial.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
          {[
            { label: 'Semestres', value: '14' },
            { label: 'Horas/Semana', value: '28' },
            { label: 'Proyectos', value: '98' },
            { label: 'Fases', value: '5' },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl">
              <div className="text-2xl font-black text-gold">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <a href="#semestres" className="bg-gold text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-gold/20 transition-all">
            Explorar Plan Completo
          </a>
          <a href="/dashboard" className="glass px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
            📊 Dashboard de Avance
          </a>
        </div>
        
        <div className="mt-20 animate-bounce">
          <ArrowDown className="text-muted-foreground w-6 h-6" />
        </div>
      </section>

      {/* Objectives Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Objetivo Profesional</h3>
            <p className="text-muted-foreground leading-relaxed">
              Formación Senior en IA, Datos, MLOps, Investigación de Operaciones y Gestión de Operaciones. 
              Especializado en sistemas ciberfísicos y optimización de cadenas de suministro.
            </p>
          </div>
          <div className="glass p-8 rounded-3xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-ia/10 flex items-center justify-center text-ia">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Ecosistema de Trabajo</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Platzi', 'IO Autónoma', 'Agrotech', 'Big Tech', 'NAIU'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fases Section */}
      <section id="fases" className="max-w-7xl mx-auto px-6 w-full scroll-mt-24">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Mapa de Ruta Estratégico</h2>
          <p className="text-muted-foreground">Evolución técnica desde fundamentos hasta arquitectura Senior.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="semestres" className="max-w-5xl mx-auto px-6 w-full scroll-mt-24">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Cronograma Detallado</h2>
          <p className="text-muted-foreground">Haz clic en cada semestre para ver bloques de estudio, bibliografía y proyectos.</p>
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
