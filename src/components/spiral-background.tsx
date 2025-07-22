"use client";
import React, { useEffect, useRef } from "react";

export function SpiralBackground() {
  const spiralRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // --- Spiral Animation (unchanged, as you already have it working) ---
  useEffect(() => {
    if (!spiralRef.current) return;
    const canvas = spiralRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let time = 0;
    let isMouseDown = false;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseDown = () => {
      isMouseDown = true;
    };
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation loop
    let animationFrame: number;
    const animateSpiral = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.052)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cursorDistX = (mouseX - centerX) / (canvas.width / 2);
      const cursorDistY = (mouseY - centerY) / (canvas.height / 2);
      const cursorDist = Math.sqrt(cursorDistX * cursorDistX + cursorDistY * cursorDistY);

      // Draw spiral
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
      for (let angle = 0; angle < Math.PI * 10; angle += 0.1) {
        const radius = (angle / (Math.PI * 10)) * maxRadius;
        const x = centerX + Math.cos(angle + time) * radius * (1 + cursorDist * 0.2);
        const y = centerY + Math.sin(angle + time) * radius * (1 + cursorDist * 0.2);
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Add cursor effect
      if (isMouseDown) {
        ctx.fillStyle = "#00a0d821";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      animationFrame = requestAnimationFrame(animateSpiral);
    };
    animateSpiral();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // --- Fixed Particles Animation ---
  useEffect(() => {
    if (!particlesRef.current) return;
    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    };
    const particles: Particle[] = [];
    const quantity = 600;

    for (let i = 0; i < quantity; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 0.1,
        color: `rgba(255,255,255,${Math.random() * 0.2 + 0.05})`,
      });
    }

    let animationFrame: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges
        if (p.x < 0) p.x += canvas.width;
        if (p.y < 0) p.y += canvas.height;
        if (p.x > canvas.width) p.x -= canvas.width;
        if (p.y > canvas.height) p.y -= canvas.height;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      animationFrame = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      {/* Spiral (background) */}
      <canvas
        ref={spiralRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: "brightness(0.27)",
        }}
      />
      {/* Particles (on top) */}
      <canvas
        ref={particlesRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}