'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });

  const createStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 3000), 350);
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      starsRef.current = createStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      time += 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const isDark = resolvedTheme === 'dark';

      starsRef.current.forEach((star) => {
        // Gentle upward drift
        star.y -= star.speed * star.z;
        if (star.y < -5) {
          star.y = h + 5;
          star.x = Math.random() * w;
        }

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = star.opacity * (0.6 + twinkle * 0.4);

        // Subtle parallax from mouse
        const mx = (mouseRef.current.x / w - 0.5) * star.z * 2;
        const my = (mouseRef.current.y / h - 0.5) * star.z * 1.2;
        const drawX = star.x + mx;
        const drawY = star.y + my;

        if (isDark) {
          // Dark mode: white/gold stars
          const isGold = star.size > 1.4;
          const color = isGold
            ? `rgba(212, 160, 23, ${currentOpacity})`
            : `rgba(230, 228, 240, ${currentOpacity * 0.8})`;

          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // Glow for larger stars
          if (star.size > 1.0) {
            ctx.beginPath();
            ctx.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2);
            const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, star.size * 3);
            grad.addColorStop(0, isGold
              ? `rgba(212, 160, 23, ${currentOpacity * 0.15})`
              : `rgba(200, 200, 240, ${currentOpacity * 0.08})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fill();
          }
        } else {
          // Light mode: subtle warm dust particles
          const color = `rgba(180, 155, 110, ${currentOpacity * 0.18})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resolvedTheme, createStars]);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}
