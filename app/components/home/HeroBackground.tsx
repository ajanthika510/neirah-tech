"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GlowBall {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
}

interface BlinkSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

const GLOW_COLORS = [
  "rgba(14, 165, 233, ",  // Sky 500
  "rgba(56, 189, 248, ",  // Sky 400
  "rgba(99, 102, 241, ",  // Indigo 500
  "rgba(139, 92, 246, ",  // Violet 500
  "rgba(6, 182, 212, ",   // Cyan 500
  "rgba(255, 255, 255, ", // Pure White
];

const ambientParticles = [
  { x: "12%", y: "22%", size: 3, delay: 0 },
  { x: "24%", y: "68%", size: 2.5, delay: 1.2 },
  { x: "42%", y: "38%", size: 2, delay: 0.6 },
  { x: "58%", y: "78%", size: 3, delay: 1.8 },
  { x: "74%", y: "24%", size: 2.5, delay: 0.9 },
  { x: "86%", y: "58%", size: 2, delay: 2.1 },
  { x: "92%", y: "32%", size: 3, delay: 1.5 },
];

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const glowBalls: GlowBall[] = [];
    const sparkles: BlinkSparkle[] = [];
    const ripples: ClickRipple[] = [];

    const pointer = {
      x: -999,
      y: -999,
      prevX: -999,
      prevY: -999,
      active: false,
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Helper to spawn glow ball
    const spawnGlowBall = (x: number, y: number, speedMult = 1, sizeMult = 1) => {
      if (glowBalls.length > 20) return;
      const color = GLOW_COLORS[Math.floor(Math.random() * (GLOW_COLORS.length - 1))];
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.3 + Math.random() * 1.2) * speedMult;

      glowBalls.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2, // Subtle upward buoyancy
        radius: (8 + Math.random() * 14) * sizeMult,
        color,
        alpha: 0.35 + Math.random() * 0.35,
        maxLife: 45 + Math.random() * 35,
        life: 0,
      });
    };

    // Helper to spawn blinking sparkle
    const spawnSparkle = (x: number, y: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        if (sparkles.length > 25) return;
        const color = GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;

        sparkles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.2 + Math.random() * 2.2,
          color,
          life: 0,
          maxLife: 35 + Math.random() * 30,
          twinkleSpeed: 9 + Math.random() * 15,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Helper to spawn click ripple burst
    const spawnClickBurst = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 6,
        maxRadius: 75 + Math.random() * 30,
        color: "rgba(56, 189, 248, ",
        alpha: 0.7,
      });

      // Spawn burst of glow balls & sparkles
      for (let i = 0; i < 4; i++) {
        spawnGlowBall(x, y, 2.2, 1.3);
      }
      spawnSparkle(x, y, 7);
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        pointer.prevX = pointer.x === -999 ? px : pointer.x;
        pointer.prevY = pointer.y === -999 ? py : pointer.y;
        pointer.x = px;
        pointer.y = py;
        pointer.active = true;

        const dist = Math.hypot(px - pointer.prevX, py - pointer.prevY);
        if (dist > 10) {
          if (Math.random() < 0.45) {
            spawnGlowBall(px, py, 0.8, 1);
          }
          if (Math.random() < 0.65) {
            spawnSparkle(px, py, 1);
          }
        }
      } else {
        pointer.active = false;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        spawnClickBurst(px, py);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        updatePointer(t.clientX, t.clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const px = t.clientX - rect.left;
        const py = t.clientY - rect.top;
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          updatePointer(t.clientX, t.clientY);
          spawnClickBurst(px, py);
        }
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += dt;

      ctx.clearRect(0, 0, width, height);

      // ── 1. RENDER & UPDATE CLICK RIPPLES ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.12 + 1;
        r.alpha *= 0.92;

        if (r.alpha < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // ── 2. RENDER & UPDATE GLOW BALLS ──
      for (let i = glowBalls.length - 1; i >= 0; i--) {
        const b = glowBalls[i];
        b.life += 1;
        if (b.life >= b.maxLife) {
          glowBalls.splice(i, 1);
          continue;
        }

        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;

        const lifeFraction = b.life / b.maxLife;
        const fade = Math.sin(lifeFraction * Math.PI);
        const currentAlpha = b.alpha * fade;

        // Radial diffusion gradient for soft glowing ball
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `${b.color}${currentAlpha.toFixed(3)})`);
        grad.addColorStop(0.4, `${b.color}${(currentAlpha * 0.5).toFixed(3)})`);
        grad.addColorStop(1, `${b.color}0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 3. RENDER & UPDATE BLINKING SPARKLES ──
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life += 1;
        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.97;
        s.vy *= 0.97;

        s.twinklePhase += s.twinkleSpeed * dt;
        const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5;

        const lifeFraction = s.life / s.maxLife;
        const fade = Math.sin(lifeFraction * Math.PI);
        const alpha = fade * (0.2 + twinkle * 0.8);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Precision Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,165,233,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial Grid Mask - softens edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, #F8FBFF 100%)",
        }}
      />

      {/* Atmospheric Ambient Glow Blobs */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full bg-sky-300/20 blur-[100px] sm:blur-[130px]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -25, 0],
                y: [0, 35, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full bg-indigo-300/15 blur-[110px] sm:blur-[140px]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 20, 0],
                y: [0, -25, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-12 left-1/3 h-[380px] w-[380px] rounded-full bg-cyan-200/20 blur-[100px]"
      />

      {/* Interactive Cursor/Touch Glow Balls & Blinking Sparks Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-1"
      />

      {/* Floating Micro Particles */}
      {ambientParticles.map((p, i) => (
        <motion.div
          key={i}
          animate={
            prefersReducedMotion
              ? { opacity: 0.4 }
              : {
                  y: [0, -14, 0],
                  opacity: [0.25, 0.65, 0.25],
                }
          }
          transition={{
            duration: 4.5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.7)]"
        />
      ))}

      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}