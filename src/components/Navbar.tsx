'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart2, Flame } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Fases', href: '/#fases' },
    { name: 'Semestres', href: '/#semestres' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3',
        isScrolled ? 'glass mt-2 mx-4 rounded-2xl' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Plan Maestro Nivel Dios — Ir al inicio"
        >
          <div className="bg-[var(--ring)] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
            Plan Maestro{' '}
            <span className="text-[var(--ring)]">Nivel Dios</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-[var(--ring)]'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <BarChart2 className="w-4 h-4" aria-hidden="true" />
            Dashboard
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 glass mt-2 p-4 rounded-2xl mx-4 flex flex-col gap-3"
          role="menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium py-3 px-4 hover:bg-[var(--accent)] rounded-xl transition-colors text-[var(--foreground)]"
              role="menuitem"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] p-3 rounded-xl font-bold"
            role="menuitem"
          >
            <BarChart2 className="w-5 h-5" aria-hidden="true" />
            Dashboard de Avance
          </Link>
        </div>
      )}
    </nav>
  );
}
