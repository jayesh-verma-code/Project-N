"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouseRadius = 180; 

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      opacity: number;

      constructor() {
        if (!canvas) throw new Error("Canvas is not initialized");
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.density = Math.random() * 20 + 5; 
        this.color = "#ffffff";
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        // Calculate distance between particle and mouse
        const dx = mousePositionRef.current.x - this.x;
        const dy = mousePositionRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move particles away from mouse with smoother easing
        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          const directionX = forceDirectionX * force * this.density * -1;
          const directionY = forceDirectionY * force * this.density * -1;

          this.x += directionX * 0.35; 
          this.y += directionY * 0.35; 
        } else {
          // Return to original position with spring-like easing
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 20; 
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particles = [];
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 10000),
        200
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      const maxDistance = 200;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.52})`; // Slightly increased from 0.1
            ctx.lineWidth = 0.4; // Increased from 0.3 for slightly more visible connections
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Force set initial mouse position to center of screen to ensure movement is visible
    mousePositionRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
