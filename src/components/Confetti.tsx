import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "line";
  size: number;
  duration: number;
  delay: number;
  angle: number;
  distance: number;
}

const CONFETTI_COLORS = [
  "#38bdf8", // sky-400
  "#3b82f6", // blue-500
  "#34d399", // emerald-400
  "#f43f5e", // rose-500
  "#fbbf24", // amber-400
  "#a78bfa", // purple-400
];

const SHAPES: ("circle" | "square" | "triangle" | "line")[] = [
  "circle",
  "square",
  "triangle",
  "line",
];

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate random particles
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2; // Random direction
      const distance = 80 + Math.random() * 220; // Explosion radius
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const size = 6 + Math.random() * 8; // Size between 6px and 14px
      const duration = 1.8 + Math.random() * 1.5; // Physics simulation speed
      const delay = Math.random() * 0.15; // Stagger effect

      return {
        id: i,
        x: 0,
        y: 0,
        color,
        shape,
        size,
        duration,
        delay,
        angle,
        distance,
      };
    });

    setParticles(newParticles);
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      {particles.map((p) => {
        // Calculate the trajectory path using trigonometric conversion
        const targetX = Math.cos(p.angle) * p.distance;
        const targetY = Math.sin(p.angle) * p.distance + 80; // Gravity offset downwards

        return (
          <motion.div
            key={p.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              // Elegant curve animation simulation
              x: [0, targetX * 0.7, targetX],
              y: [0, targetY * 0.4 - 60, targetY], // arc upwards then fall
              scale: [0, 1.2, 1, 0.7, 0],
              rotate: [0, Math.random() * 360, Math.random() * 720],
              opacity: [1, 1, 1, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              ease: [0.12, 0.82, 0.23, 1], // Custom overshoot spring-like transition
              delay: p.delay,
            }}
            className="absolute left-1/2 top-1/2 -ml-2 -mt-2"
            style={{
              width: p.size,
              height: p.size,
              background: p.shape === "triangle" ? "transparent" : p.color,
              boxShadow: `0 2px 8px ${p.color}44`,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "line" ? "1px" : "4px",
              borderLeft: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
              borderRight: p.shape === "triangle" ? `${p.size / 2}px solid transparent` : undefined,
              borderBottom: p.shape === "triangle" ? `${p.size}px solid ${p.color}` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
