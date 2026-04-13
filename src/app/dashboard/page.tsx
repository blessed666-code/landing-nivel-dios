'use client';

import React, { useMemo } from 'react';
import planData from '@/data/plan.json';
import { PlanData, Semester } from '@/types/plan';
import { useProgress } from '@/context/ProgressContext';
import ProgressRing from '@/components/ProgressRing';
import { BookOpen, Rocket, CheckCircle2, Trophy, Clock, Trash2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const data = planData as PlanData;

const PHASE_TO_SEMESTER: Record<number, number[]> = {
  1: [1, 2],
  2: [3, 4, 5],
  3: [6, 7, 8],
  4: [9, 10, 11],
  5: [12, 13, 14]
};

export default function DashboardPage() {
  const { progress, toggleItem, resetProgress } = useProgress();

  const stats = useMemo(() => {
    let totalItems = 0;
    let checkedItems = 0;
    let completedProjects = 0;
    let completedSemesters = 0;

    data.semesters.forEach(sem => {
      const itemsInSem = sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length;
      totalItems += itemsInSem;
      
      let semChecked = 0;
      // Check Block A
      sem.bloqueA.items.forEach((_, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_a${i+1}`]) {
          checkedItems++;
          semChecked++;
        }
      });
      // Check Block B
      sem.bloqueB.items.forEach((_, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_b${i+1}`]) {
          checkedItems++;
          semChecked++;
        }
      });
      // Check Projects
      sem.projects.forEach((_, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_p${i+1}`]) {
          checkedItems++;
          semChecked++;
          completedProjects++;
        }
      });

      if (semChecked === itemsInSem && itemsInSem > 0) {
        completedSemesters++;
      }
    });

    const percent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    
    // Phase Progress
    const phaseProgress = [1, 2, 3, 4, 5].map(phaseNum => {
      const sems = PHASE_TO_SEMESTER[phaseNum];
      let pTotal = 0;
      let pChecked = 0;
      
      sems.forEach(sNum => {
        const sem = data.semesters.find(s => s.number === `S${sNum}`);
        if (sem) {
          const items = sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length;
          pTotal += items;
          sem.bloqueA.items.forEach((_, i: number) => { if (progress[`s${sNum}_a${i+1}`]) pChecked++; });
          sem.bloqueB.items.forEach((_, i: number) => { if (progress[`s${sNum}_b${i+1}`]) pChecked++; });
          sem.projects.forEach((_, i: number) => { if (progress[`s${sNum}_p${i+1}`]) pChecked++; });
        }
      });

      return {
        num: phaseNum,
        name: data.phases[phaseNum-1].title.split('—')[1] || data.phases[phaseNum-1].title,
        percent: pTotal > 0 ? Math.round((pChecked / pTotal) * 100) : 0
      };
    });

    return { 
      percent, 
      completedProjects, 
      completedSemesters, 
      totalHours: checkedItems * 15,
      phaseProgress 
    };
  }, [progress]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Dashboard de Avance</h1>
          <p className="text-muted-foreground">Malla Curricular · Plan Maestro Nivel Dios — Bendecido</p>
        </div>
        <ProgressRing percent={stats.percent} />
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<BookOpen className="text-gold" />} label="Semestres" value={stats.completedSemesters} sub="de 14" />
        <StatCard icon={<Rocket className="text-ia" />} label="Proyectos" value={stats.completedProjects} sub="de 98" />
        <StatCard icon={<Clock className="text-auto" />} label="Horas Est." value={stats.totalHours} sub="invertidas" />
        <StatCard icon={<Trophy className="text-naiu" />} label="Fase Actual" value={`F${Math.min(5, Math.floor(stats.completedSemesters / 3) + 1)}`} sub="de 5 fases" />
      </div>

      {/* Phase Bars */}
      <div className="glass p-8 rounded-3xl mb-12">
        <h3 className="text-xl font-bold mb-8">Progreso por Fase</h3>
        <div className="grid md:grid-cols-5 gap-8">
          {stats.phaseProgress.map((p) => (
            <div key={p.num} className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-muted-foreground line-clamp-1">{p.name}</span>
                <span className="text-gold">{p.percent}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${p.percent}%` }}
                  className="h-full bg-gold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Malla Curricular Grid */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black">🎓 Malla Curricular</h2>
          <button 
            onClick={resetProgress}
            className="text-xs font-bold flex items-center gap-2 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Resetear Progreo
          </button>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
          {data.semesters.map((sem) => (
            <div key={sem.id} className="glass rounded-3xl overflow-hidden flex flex-col">
              <div className="p-6 bg-secondary/50 border-b border-border/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-black">
                    {sem.number}
                  </span>
                  <div className="font-bold text-sm leading-tight max-w-[150px]">{sem.title}</div>
                </div>
                <div className="text-[10px] font-mono font-bold text-muted-foreground bg-background px-2 py-1 rounded-lg">
                  {getSemProgress(sem, progress)}/{sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length}
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1">
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-green-500 rounded-full" /> Bloque A
                  </h5>
                  <div className="space-y-2">
                    {sem.bloqueA.items.map((item, i) => (
                      <CheckItem 
                        key={i} 
                        checked={progress[`s${sem.number.replace('S', '')}_a${i+1}`]} 
                        onChange={() => toggleItem(sem.number.replace('S', ''), `a${i+1}`)}
                        label={item}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-red-500 rounded-full" /> Bloque B
                  </h5>
                  <div className="space-y-2">
                    {sem.bloqueB.items.map((item, i) => (
                      <CheckItem 
                        key={i} 
                        checked={progress[`s${sem.number.replace('S', '')}_b${i+1}`]} 
                        onChange={() => toggleItem(sem.number.replace('S', ''), `b${i+1}`)}
                        label={item}
                      />
                    ))}
                  </div>
                </div>

                {sem.projects.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <div className="w-1 h-3 bg-gold rounded-full" /> Proyectos
                    </h5>
                    <div className="grid gap-2">
                      {sem.projects.map((proj, i) => (
                        <CheckItem 
                          key={i} 
                          checked={progress[`s${sem.number.replace('S', '')}_p${i+1}`]} 
                          onChange={() => toggleItem(sem.number.replace('S', ''), `p${i+1}`)}
                          label={proj.title}
                          isProject
                          type={proj.type}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string | number, sub: string }) {
  return (
    <div className="glass p-6 rounded-3xl flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-secondary">{icon}</div>
      <div>
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black">{value}</span>
          <span className="text-[10px] font-bold text-muted-foreground">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ checked, onChange, label, isProject, type }: { checked: boolean, onChange: () => void, label: string, isProject?: boolean, type?: string }) {
  return (
    <label className={cn(
      "flex items-center gap-3 p-2 rounded-xl border transition-all cursor-pointer select-none",
      checked 
        ? "bg-gold/5 border-gold/30 text-foreground" 
        : "border-transparent hover:bg-secondary text-muted-foreground"
    )}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="form-checkbox w-4 h-4 text-gold border-2 rounded focus:ring-gold transition-colors"
      />
      <span className={cn(
        "text-xs leading-tight line-clamp-2",
        checked ? "font-semibold" : "font-medium"
      )}>
        {label}
      </span>
      {isProject && type && (
        <span className={cn(
          "ml-auto text-[8px] font-black px-1.5 py-0.5 rounded uppercase border",
          type === 'NAIU' ? 'border-naiu text-naiu' :
          type === 'II' ? 'border-ii text-ii' :
          type === 'AUTO' ? 'border-auto text-auto' :
          type === 'IA/DS' ? 'border-ia text-ia' : 'border-extra text-extra'
        )}>
          {type}
        </span>
      )}
    </label>
  );
}

function getSemProgress(sem: Semester, progress: Record<string, boolean>) {
  let count = 0;
  const sNum = sem.number.replace('S', '');
  sem.bloqueA.items.forEach((_, i: number) => { if (progress[`s${sNum}_a${i+1}`]) count++; });
  sem.bloqueB.items.forEach((_, i: number) => { if (progress[`s${sNum}_b${i+1}`]) count++; });
  sem.projects.forEach((_, i: number) => { if (progress[`s${sNum}_p${i+1}`]) count++; });
  return count;
}
