import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Settings, RefreshCw, Activity, ShieldAlert, Cpu, Share2 } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function SystemConnectionBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Custom Settings for User Interaction
  const [particleCount, setParticleCount] = useState<number>(70);
  const [connectionDistance, setConnectionDistance] = useState<number>(120);
  const [particleSpeed, setParticleSpeed] = useState<number>(1.0);
  const [connectionColor, setConnectionColor] = useState<"cyan" | "emerald" | "purple">("cyan");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Mouse coordinates state (ref to avoid trigger re-renders in paint loops)
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null,
    y: null,
    radius: 180,
  });

  // Track settings in refs so the animation loop always has up-to-date values without recreating
  const settingsRef = useRef({
    count: particleCount,
    distance: connectionDistance,
    speed: particleSpeed,
    color: connectionColor,
  });

  useEffect(() => {
    settingsRef.current = {
      count: particleCount,
      distance: connectionDistance,
      speed: particleSpeed,
      color: connectionColor,
    };
  }, [particleCount, connectionDistance, particleSpeed, connectionColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // Retrieve corresponding glow colors
    const getThemeColors = (theme: "cyan" | "emerald" | "purple") => {
      switch (theme) {
        case "emerald":
          return {
            particle: "rgba(16, 185, 129, 0.8)",
            line: "rgba(16, 185, 129, ",
            glow: "rgba(16, 185, 129, 0.4)",
          };
        case "purple":
          return {
            particle: "rgba(168, 85, 247, 0.8)",
            line: "rgba(168, 85, 247, ",
            glow: "rgba(168, 85, 247, 0.4)",
          };
        case "cyan":
        default:
          return {
            particle: "rgba(34, 211, 238, 0.8)",
            line: "rgba(34, 211, 238, ",
            glow: "rgba(34, 211, 238, 0.4)",
          };
      }
    };

    // Initialize particles inside bounds
    const initParticles = (w: number, h: number) => {
      const activeColors = getThemeColors(settingsRef.current.color);
      const newParticles: Particle[] = [];
      const count = settingsRef.current.count;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2 * settingsRef.current.speed,
          vy: (Math.random() - 0.5) * 1.2 * settingsRef.current.speed,
          radius: Math.random() * 2 + 1.5,
          color: activeColors.particle,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particles = newParticles;
    };

    // Core Animation Painting Routine
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const activeTheme = getThemeColors(settingsRef.current.color);
      const currentDistance = settingsRef.current.distance;
      const currentSpeed = settingsRef.current.speed;

      // Adjust particle list length if user slides settings
      if (particles.length !== settingsRef.current.count) {
        if (particles.length < settingsRef.current.count) {
          const diff = settingsRef.current.count - particles.length;
          for (let i = 0; i < diff; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 1.2 * currentSpeed,
              vy: (Math.random() - 0.5) * 1.2 * currentSpeed,
              radius: Math.random() * 2 + 1.5,
              color: activeTheme.particle,
              pulseSpeed: 0.02 + Math.random() * 0.03,
              pulsePhase: Math.random() * Math.PI * 2,
            });
          }
        } else {
          particles = particles.slice(0, settingsRef.current.count);
        }
      }

      // 1. Move and update particles
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const speedScale = currentSpeed;
        
        // Dynamic drift movement
        p.x += p.vx * speedScale;
        p.y += p.vy * speedScale;

        // Bounce off boundary edges smoothly
        if (p.x < 0) {
          p.x = 0;
          p.vx = -p.vx;
        } else if (p.x > width) {
          p.x = width;
          p.vx = -p.vx;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = -p.vy;
        } else if (p.y > height) {
          p.y = height;
          p.vy = -p.vy;
        }

        // Mouse attraction/repulsion effect
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRef.current.radius) {
            // Apply a subtle gravitational pull towards cursor
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.x += (dx / dist) * force * 0.8;
            p.y += (dy / dist) * force * 0.8;
          }
        }

        // Draw particle node
        const sizePulse = p.radius + Math.sin(p.pulsePhase) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sizePulse, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.particle;
        ctx.shadowBlur = p.radius > 2.5 ? 8 : 0;
        ctx.shadowColor = activeTheme.particle;
        ctx.fill();
        ctx.shadowBlur = 0; // reset glow for line drawing performance
      });

      // 2. Draw connections/plexus mesh lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentDistance) {
            // High proximity yields higher transparency/strength
            const alpha = (1 - dist / currentDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${activeTheme.line}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect nodes to mouse cursor if near
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = p1.x - mx;
          const dy = p1.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentDistance * 1.3) {
            const alpha = (1 - dist / (currentDistance * 1.3)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `${activeTheme.line}${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // ResizeObserver handler matching environment instructions perfectly
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        
        // Avoid redundant resizes if bounds haven't shifted
        if (width === newWidth && height === newHeight) return;

        width = newWidth;
        height = newHeight;

        // Apply scale factors to handle retina or standard density displays cleanly
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Re-initialize particles to span the updated area seamlessly
        initParticles(newWidth, newHeight);
      }
    });

    resizeObserver.observe(container);

    // Initial draw loop kick-off
    draw();

    // Mouse Tracking Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
      }
    };

    // Attach listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleMouseLeave);

    // Cleanup Observer and Listeners safely
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden"
      id="system-motion-background-container"
    >
      {/* HTML5 Canvas Plexus Rendering Area */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-65 relative" 
      />

      {/* Floating System Connection Control Board */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-auto">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 rounded-xl bg-slate-950/80 border border-white/10 hover:border-cyan-400/30 text-xs text-slate-300 hover:text-white px-3.5 py-2.5 backdrop-blur-md transition-all shadow-lg shadow-black/40 cursor-pointer select-none active:scale-95"
          id="btn-network-customizer"
        >
          <Settings className={`h-4 w-4 text-cyan-400 ${showSettings ? 'animate-spin' : ''}`} />
          <span className="font-semibold uppercase tracking-wider font-mono">Personalizar Red</span>
        </button>

        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="w-72 bg-slate-950/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-lg space-y-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[11px] font-bold font-mono text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5" />
                Métricas de Conexión
              </span>
              <button 
                onClick={() => {
                  setParticleCount(70);
                  setConnectionDistance(120);
                  setParticleSpeed(1.0);
                  setConnectionColor("cyan");
                }}
                title="Reiniciar parámetros"
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>

            {/* Slider 1: Nodes */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Nodos del Sistema:</span>
                <span className="text-cyan-400 font-bold">{particleCount}</span>
              </div>
              <input 
                type="range" 
                min={20} 
                max={150} 
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded outline-none cursor-pointer"
              />
            </div>

            {/* Slider 2: Line Length */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Rango de Enlace:</span>
                <span className="text-cyan-400 font-bold">{connectionDistance}px</span>
              </div>
              <input 
                type="range" 
                min={60} 
                max={220} 
                value={connectionDistance}
                onChange={(e) => setConnectionDistance(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded outline-none cursor-pointer"
              />
            </div>

            {/* Slider 3: Speed */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Velocidad de Flujo:</span>
                <span className="text-cyan-400 font-bold">{particleSpeed}x</span>
              </div>
              <input 
                type="range" 
                min={0.1} 
                max={3.0} 
                step={0.1}
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded outline-none cursor-pointer"
              />
            </div>

            {/* Color Select */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-mono block">Canal de Datos (Esquema):</span>
              <div className="flex gap-2">
                {(["cyan", "emerald", "purple"] as const).map((col) => (
                  <button
                    key={col}
                    onClick={() => setConnectionColor(col)}
                    className={`flex-1 py-1.5 rounded-lg text-[9px] font-mono font-bold capitalize transition-all cursor-pointer ${
                      connectionColor === col
                        ? col === "cyan"
                          ? "bg-cyan-500/10 border border-cyan-400 text-cyan-400"
                          : col === "emerald"
                          ? "bg-emerald-500/10 border border-emerald-400 text-emerald-400"
                          : "bg-purple-500/10 border border-purple-400 text-purple-400"
                        : "bg-slate-900 border border-white/5 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Diagnostic Status */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
                Sincronizado
              </span>
              <span>100% Rendimiento</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
