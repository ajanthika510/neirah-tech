"use client";

import { useEffect, useRef, memo } from "react";

interface FlowFieldProps {
  hoveredNodePos?: { x: number; y: number } | null;
  corePos?: { x: number; y: number } | null;
  activePulse?: boolean;
  prefersReducedMotion?: boolean | null;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  life: number;
  maxLife: number;
  speedMultiplier: number;
}

interface Sparkle {
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

const PALETTE = [
  "rgba(14, 165, 233, ",  // Sky 500
  "rgba(56, 189, 248, ",  // Sky 400
  "rgba(99, 102, 241, ",  // Indigo 500
  "rgba(139, 92, 246, ",  // Violet 500
  "rgba(6, 182, 212, ",   // Cyan 500
  "rgba(16, 185, 129, ",  // Emerald 500
];

const SPARK_COLORS = [
  "rgba(56, 189, 248, ",   // Sky
  "rgba(99, 102, 241, ",   // Indigo
  "rgba(167, 139, 250, ",  // Light Violet
  "rgba(255, 255, 255, ",  // Pure White
  "rgba(34, 211, 238, ",   // Bright Cyan
];

/* Fast 2D pseudo simplex/curl noise implementation */
function getFlowAngle(x: number, y: number, time: number): number {
  const scale1 = 0.0018;
  const scale2 = 0.0042;
  const n1 = Math.sin(x * scale1 + time * 0.28) * Math.cos(y * scale1 + time * 0.22);
  const n2 = Math.sin(x * scale2 - time * 0.18) * Math.sin(y * scale2 + time * 0.35);
  const n3 = Math.cos((x + y) * 0.0012 + time * 0.15);
  return (n1 + n2 * 0.5 + n3 * 0.3) * Math.PI * 2.5;
}

function HeroFlowFieldComponent({
  hoveredNodePos,
  corePos,
  activePulse,
  prefersReducedMotion,
  className = "",
}: FlowFieldProps) {
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
    let particles: Particle[] = [];
    let sparkles: Sparkle[] = [];
    let time = 0;

    // Interactive pointer state (mouse & touch)
    const pointer = {
      x: -999,
      y: -999,
      active: false,
      targetAlpha: 0,
      currentAlpha: 0,
      prevX: -999,
      prevY: -999,
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

      // Scale particle count based on screen width
      const particleCount = width < 640 ? 140 : width < 1024 ? 260 : 380;
      initParticles(particleCount);
    };

    const initParticles = (count: number) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const colorPrefix = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const baseAlpha = 0.2 + Math.random() * 0.45;
        const maxLife = 180 + Math.random() * 220;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: 1.0 + Math.random() * 1.8,
          color: colorPrefix,
          alpha: baseAlpha,
          baseAlpha,
          life: Math.random() * maxLife,
          maxLife,
          speedMultiplier: 0.65 + Math.random() * 0.7,
        });
      }
    };

    const spawnSparkle = (x: number, y: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        if (sparkles.length > 55) break;
        const colorPrefix = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.6;

        sparkles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.2 + Math.random() * 2.2,
          color: colorPrefix,
          life: 0,
          maxLife: 40 + Math.random() * 45,
          twinkleSpeed: 8 + Math.random() * 14,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Pointer Event Listeners for Cursor & Touch tracking
    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        pointer.prevX = pointer.x === -999 ? px : pointer.x;
        pointer.prevY = pointer.y === -999 ? py : pointer.y;
        pointer.x = px;
        pointer.y = py;
        pointer.active = true;
        pointer.targetAlpha = 1;

        // Spawn interactive sparkling blinks when moving
        const distMoved = Math.hypot(px - pointer.prevX, py - pointer.prevY);
        if (distMoved > 8) {
          spawnSparkle(px, py, Math.min(3, Math.floor(distMoved / 10)));
        }
      } else {
        pointer.active = false;
        pointer.targetAlpha = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
      spawnSparkle(pointer.x, pointer.y, 6);
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.targetAlpha = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        updatePointerPos(t.clientX, t.clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        updatePointerPos(t.clientX, t.clientY);
        spawnSparkle(pointer.x, pointer.y, 5);
      }
    };

    const onTouchEnd = () => {
      pointer.active = false;
      pointer.targetAlpha = 0;
    };

    const parentElem = canvas.parentElement || window;
    parentElem.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    parentElem.addEventListener("pointerdown", onPointerDown as EventListener, { passive: true });
    parentElem.addEventListener("pointerleave", onPointerLeave, { passive: true });
    parentElem.addEventListener("touchmove", onTouchMove as EventListener, { passive: true });
    parentElem.addEventListener("touchstart", onTouchStart as EventListener, { passive: true });
    parentElem.addEventListener("touchend", onTouchEnd, { passive: true });

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += dt * 0.8;

      // Soft trail clearing
      ctx.fillStyle = "rgba(248, 251, 255, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Smooth pointer halo alpha transition
      pointer.currentAlpha += (pointer.targetAlpha - pointer.currentAlpha) * 0.1;

      // ── 1. DRAW GLOWING CURSOR / TOUCH HALO ──
      if (pointer.currentAlpha > 0.01 && pointer.x !== -999) {
        const glowRadius = width < 640 ? 110 : 160;
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${(0.32 * pointer.currentAlpha).toFixed(3)})`);
        gradient.addColorStop(0.35, `rgba(99, 102, 241, ${(0.16 * pointer.currentAlpha).toFixed(3)})`);
        gradient.addColorStop(0.7, `rgba(139, 92, 246, ${(0.06 * pointer.currentAlpha).toFixed(3)})`);
        gradient.addColorStop(1, "rgba(248, 251, 255, 0)");

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // ── 2. DRAW & UPDATE BLINKING SPARKLES ──
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life += 1;
        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;

        // Twinkle blink calculation
        const lifeFraction = s.life / s.maxLife;
        const fadeCurve = Math.sin(lifeFraction * Math.PI);
        const blink = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.5 + 0.5;
        const sparkAlpha = Math.max(0, fadeCurve * (0.4 + blink * 0.6));

        // Draw cross-flare micro star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (0.8 + blink * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${sparkAlpha.toFixed(3)})`;
        ctx.fill();

        // Subtle horizontal / vertical spark gleam
        if (sparkAlpha > 0.4) {
          const gleamSize = s.size * 2.2;
          ctx.strokeStyle = `${s.color}${(sparkAlpha * 0.6).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(s.x - gleamSize, s.y);
          ctx.lineTo(s.x + gleamSize, s.y);
          ctx.moveTo(s.x, s.y - gleamSize);
          ctx.lineTo(s.x, s.y + gleamSize);
          ctx.stroke();
        }
      }

      const targetX = hoveredNodePos ? hoveredNodePos.x : corePos ? corePos.x : null;
      const targetY = hoveredNodePos ? hoveredNodePos.y : corePos ? corePos.y : null;

      // ── 3. UPDATE & DRAW FLOW-FIELD PARTICLES ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.maxLife || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
          p.x = Math.random() < 0.5 ? (Math.random() < 0.5 ? -5 : width + 5) : Math.random() * width;
          p.y = Math.random() < 0.5 ? (Math.random() < 0.5 ? -5 : height + 5) : Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
        }

        // Base vector flow field angle from curl noise
        const angle = getFlowAngle(p.x, p.y, time);
        const flowForceX = Math.cos(angle) * 0.9 * p.speedMultiplier;
        const flowForceY = Math.sin(angle) * 0.9 * p.speedMultiplier;

        p.vx = p.vx * 0.92 + flowForceX * 0.08;
        p.vy = p.vy * 0.92 + flowForceY * 0.08;

        // Attractor influence toward active target
        if (targetX !== null && targetY !== null) {
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist > 15 && dist < 320) {
            const pull = (1 - dist / 320) * (hoveredNodePos ? 0.35 : 0.18);
            const swirlX = -dy / dist;
            const swirlY = dx / dist;

            p.vx += (dx / dist) * pull * 0.6 + swirlX * pull * 0.4;
            p.vy += (dy / dist) * pull * 0.6 + swirlY * pull * 0.4;
          }
        }

        // Cursor / Touch Magnetic Wave & Brightness Boost
        let pointerBrightnessBoost = 0;
        if (pointer.active && pointer.x !== -999) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          const pointerRadius = width < 640 ? 120 : 180;

          if (dist < pointerRadius) {
            const factor = 1 - dist / pointerRadius;
            // Swirl velocity around pointer
            p.vx += (-dy / (dist || 1)) * factor * 0.45 + (dx / (dist || 1)) * factor * 0.15;
            p.vy += (dx / (dist || 1)) * factor * 0.45 + (dy / (dist || 1)) * factor * 0.15;
            pointerBrightnessBoost = factor * 0.65;
          }
        }

        // Shockwave pulse effect
        if (activePulse && corePos) {
          const dx = p.x - corePos.x;
          const dy = p.y - corePos.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 260) {
            const push = (1 - dist / 260) * 1.8;
            p.vx += (dx / (dist || 1)) * push;
            p.vy += (dy / (dist || 1)) * push;
          }
        }

        // Update position
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // Calculate opacity with blinking boost
        const lifeFraction = p.life / p.maxLife;
        const alphaCurve = Math.sin(lifeFraction * Math.PI);
        const currentAlpha = Math.min(1, p.baseAlpha * alphaCurve + pointerBrightnessBoost);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + pointerBrightnessBoost * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      parentElem.removeEventListener("pointermove", onPointerMove as EventListener);
      parentElem.removeEventListener("pointerdown", onPointerDown as EventListener);
      parentElem.removeEventListener("pointerleave", onPointerLeave);
      parentElem.removeEventListener("touchmove", onTouchMove as EventListener);
      parentElem.removeEventListener("touchstart", onTouchStart as EventListener);
      parentElem.removeEventListener("touchend", onTouchEnd);
    };
  }, [hoveredNodePos, corePos, activePulse, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}

export default memo(HeroFlowFieldComponent);

