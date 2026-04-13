'use client';

import React, { useMemo } from 'react';
import planData from '@/data/plan.json';
import { PlanData, Semester } from '@/types/plan';
import { useProgress } from '@/context/ProgressContext';
import ProgressRing from '@/components/ProgressRing';
import { BookOpen, Rocket, Trophy, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const data = planData as PlanData;

const PHASE_TO_SEMESTER: Record<number, number[]> = {
  1: [1, 2],
  2: [3, 4, 5],
  3: [6, 7, 8],
  4: [9, 10, 11],
  5: [12, 13, 14],
};

export default function DashboardPage() {
  const { progress, toggleItem, resetProgress } = useProgress();

  const stats = useMemo(() => {
    let totalItems = 0;
    let checkedItems = 0;
    let completedProjects = 0;
    let completedSemesters = 0;

    data.semesters.forEach((sem) => {
      const itemsInSem =
        sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length;
      totalItems += itemsInSem;

      let semChecked = 0;
      sem.bloqueA.items.forEach((_: string, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_a${i + 1}`]) {
          checkedItems++;
          semChecked++;
        }
      });
      sem.bloqueB.items.forEach((_: string, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_b${i + 1}`]) {
          checkedItems++;
          semChecked++;
        }
      });
      sem.projects.forEach((_: unknown, i: number) => {
        if (progress[`s${sem.number.replace('S', '')}_p${i + 1}`]) {
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

    const phaseProgress = [1, 2, 3, 4, 5].map((phaseNum) => {
      const sems = PHASE_TO_SEMESTER[phaseNum];
      let pTotal = 0;
      let pChecked = 0;

      sems.forEach((sNum) => {
        const sem = data.semesters.find((s) => s.number === `S${sNum}`);
        if (sem) {
          const items =
            sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length;
          pTotal += items;
          sem.bloqueA.items.forEach((_: string, i: number) => {
            if (progress[`s${sNum}_a${i + 1}`]) pChecked++;
          });
          sem.bloqueB.items.forEach((_: string, i: number) => {
            if (progress[`s${sNum}_b${i + 1}`]) pChecked++;
          });
          sem.projects.forEach((_: unknown, i: number) => {
            if (progress[`s${sNum}_p${i + 1}`]) pChecked++;
          });
        }
      });

      return {
        num: phaseNum,
        name: data.phases[phaseNum - 1].title.split('—')[1] || data.phases[phaseNum - 1].title,
        percent: pTotal > 0 ? Math.round((pChecked / pTotal) * 100) : 0,
      };
    });

    return {
      percent,
      completedProjects,
      completedSemesters,
      totalHours: checkedItems * 15,
      phaseProgress,
    };
  }, [progress]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-14">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-[var(--foreground)]">
            Dashboard de Avance
          </h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Malla Curricular · Plan Maestro Nivel Dios — Bendecido
          </p>
        </div>
        <ProgressRing percent={stats.percent} />
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
        <StatCard
          icon={<BookOpen className="text-[var(--ring)]" aria-hidden="true" />}
          label="Semestres"
          value={stats.completedSemesters}
          sub="de 14"
        />
        <StatCard
          icon={<Rocket className="text-[var(--color-ia)]" aria-hidden="true" />}
          label="Proyectos"
          value={stats.completedProjects}
          sub="de 98"
        />
        <StatCard
          icon={<Clock className="text-[var(--color-auto)]" aria-hidden="true" />}
          label="Horas Est."
          value={stats.totalHours}
          sub="invertidas"
        />
        <StatCard
          icon={<Trophy className="text-[var(--color-naiu)]" aria-hidden="true" />}
          label="Fase Actual"
          value={`F${Math.min(5, Math.floor(stats.completedSemesters / 3) + 1)}`}
          sub="de 5 fases"
        />
      </div>

      {/* ─── Phase Bars ─── */}
      <div className="glass p-6 sm:p-8 rounded-3xl mb-14">
        <h3 className="text-xl font-bold mb-8 text-[var(--foreground)]">Progreso por Fase</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {stats.phaseProgress.map((p) => (
            <div key={p.num} className="space-y-3">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[var(--muted-foreground)] line-clamp-1">{p.name}</span>
                <span className="text-[var(--ring)]">{p.percent}%</span>
              </div>
              <div
                className="h-2 w-full bg-[var(--secondary)] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={p.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progreso fase ${p.num}: ${p.percent}%`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.percent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[var(--ring)] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Malla Curricular ─── */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
            🎓 Malla Curricular
          </h2>
          <button
            onClick={resetProgress}
            className="text-xs font-bold flex items-center gap-2 text-[var(--destructive)] hover:bg-[var(--destructive)]/10 px-4 py-2 rounded-xl transition-colors"
            aria-label="Resetear todo el progreso"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" /> Resetear Progreso
          </button>
        </div>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8">
          {data.semesters.map((sem) => (
            <div
              key={sem.id}
              className="glass rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Semester header */}
              <div className="p-5 sm:p-6 bg-[var(--secondary)]/50 border-b border-[var(--border)]/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[var(--ring)]/10 text-[var(--ring)] flex items-center justify-center font-extrabold">
                    {sem.number}
                  </span>
                  <div className="font-bold text-sm leading-tight max-w-[160px] text-[var(--foreground)]">
                    {sem.title}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[var(--muted-foreground)] bg-[var(--background)] px-2.5 py-1 rounded-lg">
                  {getSemProgress(sem, progress)}/
                  {sem.bloqueA.items.length + sem.bloqueB.items.length + sem.projects.length}
                </div>
              </div>

              {/* Semester content */}
              <div className="p-5 sm:p-6 space-y-6 flex-1">
                <div>
                  <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-green-600 dark:bg-green-400 rounded-full" aria-hidden="true" />
                    Bloque A
                  </h5>
                  <div className="space-y-1.5">
                    {sem.bloqueA.items.map((item, i) => (
                      <CheckItem
                        key={i}
                        checked={!!progress[`s${sem.number.replace('S', '')}_a${i + 1}`]}
                        onChange={() => toggleItem(sem.number.replace('S', ''), `a${i + 1}`)}
                        label={item}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-red-600 dark:bg-red-400 rounded-full" aria-hidden="true" />
                    Bloque B
                  </h5>
                  <div className="space-y-1.5">
                    {sem.bloqueB.items.map((item, i) => (
                      <CheckItem
                        key={i}
                        checked={!!progress[`s${sem.number.replace('S', '')}_b${i + 1}`]}
                        onChange={() => toggleItem(sem.number.replace('S', ''), `b${i + 1}`)}
                        label={item}
                      />
                    ))}
                  </div>
                </div>

                {sem.projects.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)] mb-3 flex items-center gap-2">
                      <div className="w-1 h-3 bg-[var(--ring)] rounded-full" aria-hidden="true" />
                      Proyectos
                    </h5>
                    <div className="grid gap-1.5">
                      {sem.projects.map((proj, i) => (
                        <CheckItem
                          key={i}
                          checked={!!progress[`s${sem.number.replace('S', '')}_p${i + 1}`]}
                          onChange={() => toggleItem(sem.number.replace('S', ''), `p${i + 1}`)}
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

/* ─── Sub-components ─── */

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="glass p-5 sm:p-6 rounded-3xl flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[var(--secondary)]">{icon}</div>
      <div>
        <div className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-[var(--foreground)]">{value}</span>
          <span className="text-[11px] font-bold text-[var(--muted-foreground)]">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function CheckItem({
  checked,
  onChange,
  label,
  isProject,
  type,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  isProject?: boolean;
  type?: string;
}) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none',
        checked
          ? 'bg-[var(--ring)]/5 border-[var(--ring)]/30 text-[var(--foreground)]'
          : 'border-transparent hover:bg-[var(--secondary)] text-[var(--muted-foreground)]'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-[var(--ring)] rounded border-2 border-[var(--border)] transition-colors flex-shrink-0"
        aria-label={label}
      />
      <span
        className={cn(
          'text-xs leading-relaxed',
          checked ? 'font-semibold' : 'font-medium'
        )}
      >
        {label}
      </span>
      {isProject && type && (
        <span
          className={cn(
            'ml-auto text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase border flex-shrink-0',
            type === 'NAIU' ? 'border-[var(--color-naiu)] text-[var(--color-naiu)]' :
            type === 'II' ? 'border-[var(--color-ii)] text-[var(--color-ii)]' :
            type === 'AUTO' ? 'border-[var(--color-auto)] text-[var(--color-auto)]' :
            type === 'IA/DS' ? 'border-[var(--color-ia)] text-[var(--color-ia)]' :
            'border-[var(--color-extra)] text-[var(--color-extra)]'
          )}
          aria-label={`Tipo: ${type}`}
        >
          {type}
        </span>
      )}
    </label>
  );
}

function getSemProgress(sem: Semester, progress: Record<string, boolean>) {
  let count = 0;
  const sNum = sem.number.replace('S', '');
  sem.bloqueA.items.forEach((_: string, i: number) => {
    if (progress[`s${sNum}_a${i + 1}`]) count++;
  });
  sem.bloqueB.items.forEach((_: string, i: number) => {
    if (progress[`s${sNum}_b${i + 1}`]) count++;
  });
  sem.projects.forEach((_: unknown, i: number) => {
    if (progress[`s${sNum}_p${i + 1}`]) count++;
  });
  return count;
}
