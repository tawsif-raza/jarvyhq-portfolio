import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 160;
const CONNECT_DIST = 210;
const MOUSE_DIST = 220;

export default function ParticleNetwork() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width, height, particles, mouse = { x: -9999, y: -9999 };
    let rafId;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      // Set both the drawing-buffer resolution AND the CSS box size
      // explicitly -- a fixed-position canvas does not reliably stretch
      // via inset-0 alone (replaced elements keep their intrinsic size),
      // so this is set directly rather than relying on CSS to stretch it.
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.4 + Math.random() * 2.6, // depth-simulating size variation
        glow: 0.55 + Math.random() * 0.45,
      }));
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(214,164,102,${0.32 * (1 - d / CONNECT_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const dm = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
        if (dm < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(237,214,168,${0.6 * (1 - dm / MOUSE_DIST)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      for (const p of particles) {
        // Soft halo behind the core dot for a glowing-ember feel
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        halo.addColorStop(0, `rgba(214,158,90,${0.28 * p.glow})`);
        halo.addColorStop(1, "rgba(214,158,90,0)");
        ctx.beginPath();
        ctx.fillStyle = halo;
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,214,168,${0.85 * p.glow})`;
        ctx.fill();
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      drawFrame();
      rafId = requestAnimationFrame(step);
    }

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    init();
    drawFrame(); // paint an initial frame immediately, don't wait on rAF
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseout", handleLeave);
      rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -2,
        pointerEvents: "none",
      }}
    />
  );
}
